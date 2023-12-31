const express = require('express');
const multer = require('multer');
const path = require("path");
const {nanoid} = require('nanoid');

const config = require('../config');
const Album = require('../models/Album');
const Track = require("../models/Track");
const router = express.Router();
const permit = require("../middleware/permit");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', auth, async (req, res) => {
   const query = {};
   let sort = {year: +1}

    if(req.query.artist) {
        query.artist =  req.query.artist
    }

    if(req.query.user) {
        query.user = req.query.user;
    }

    try {
        const albums = await Album
            .find(query)
            .sort(sort);

        const result = await Promise.all(albums.map (async album => {
            const tracks = await Track.find({album: album._id });

            return {...album['_doc'], count: tracks.length};
        }));

      return  res.send(result);

    } catch (e) {
        res.sendStatus(500);
    }

});

router.get('/:id', async (req, res) => {
    try{
        const album = await Album
            .findById(req.params.id)
            .populate('artist', 'title description image');

        if(!album) {
            return res.status(404).send({message: 'Album not found!'});
        }

        res.send(album);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', auth, upload.single('image'), async (req,res) => {
   const { title, artist, year } = req.body;
    const user = req.user;

    const albumData = {
        title,
        artist,
        year,
        user: user._id,
        image: null
    };

    if (req.file) {
        albumData.image =  'uploads/' + req.file.filename;
    }

    try{
        const album = new Album(albumData);
        await album.save();

        res.send(album);
    } catch (e) {
        res.status(400).send({errors: e.errors});
    }

});

router.put('/:id/publish', auth, permit('admin'), async (req, res) => {
    const albumId =  req.params.id;

    try {
        const album = await Album.findById(albumId);

        if(!album) {
            return res.status(404).send({errors: 'There are no album'});
        }

        await Album.findByIdAndUpdate(albumId, {publish: true});

        return  res.send({message: 'Publish success'});
    } catch (e) {
        res.sendStatus(500);
    }
});


router.delete('/:id', auth, permit('admin'), async (req, res) => {
    const albumId = req.params.id;

    try {
        const response =  await Album.deleteOne({_id: albumId});

        if( response['deletedCount']) {
            res.send('Success');
        } else {
            res.status(403).send({error: 'Deleted failed'});
        }

    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;