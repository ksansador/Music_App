const express = require('express');
const multer = require('multer');
const path = require("path");
const {nanoid} = require('nanoid');

const config = require('../config');
const Album = require('../models/Album');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    if(req.query.artist) {
        const filter = {artist: req.query.artist}
        const sort = { year: +1};

        try {

            const albums = await Album
                .find(filter)
                .sort(sort);

            const result = await Album
                .find(filter)
                .count({});

            res.send({albums, result});
        } catch (e) {
            res.sendStatus(500);
        }
    }

    try{
        const albums = await Album
            .find()
            .populate('artist', 'title');

        res.send(albums);
    }  catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const album = await Album
            .findById(req.params.id)
            .populate('artist', 'title description image');

        if(!album) {
            res.status(404).send({message: 'Album not found!'});
        }

        res.send(album);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', upload.single('image'), async (req,res) => {
   const { title, artist, year } = req.body;

    if (!title || !artist || !year) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const albumData = {
        title,
        artist,
        year,
        image: null
    };

    if (req.file) {
        albumData.image = req.file.filename;
    }

    try{
        const album = new Album(albumData);
        await album.save();

        res.send(album);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }

});

module.exports = router;