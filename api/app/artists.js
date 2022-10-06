const express =require('express');
const multer = require('multer');
const path = require("path");
const {nanoid} = require('nanoid');

const config = require('../config');
const Artist = require('../models/Artist');
const auth = require("../middleware/auth");
const router = express.Router();
const permit = require("../middleware/permit");

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


    if(req.query.user) {
        query.user = req.query.user;
    }

    try{
        const artists = await Artist.find(query);

        res.send(artists);
    }  catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
   try {
       const artist = await Artist.findById(req.params.id);

       if(!artist) {
          return  res.status(404).send({message: 'Artist not found!'});
       }

       res.send(artist);
   } catch (e) {
       res.sendStatus(500);
   }
});

router.post('/', auth, upload.single('image'), async (req,res) => {
    const { title, description } = req.body;
    const user = req.user;

    const artistData = {
        title,
        user: user._id,
        description: description || null,
        image: null,
    };

    if (req.file) {
        artistData.image = 'uploads/' + req.file.filename;
    }

    try {
        const artist = new Artist(artistData);
        await artist.save();

        res.send(artist);
    } catch (e) {
        res.status(400).send({errors: e.errors});
    }
});

router.put('/:id/publish', auth, permit('admin'), async (req, res) => {
    const artistId =  req.params.id;

    try {
        const artist = await Artist.findById(artistId);

        if(!artist) {
            return res.status(404).send({errors: 'There are no artist'});
        }

        await Artist.findByIdAndUpdate(artistId, {publish: true});

        return  res.send({message: 'Publish success'});
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    const artistId = req.params.id;

    try {
        const response =  await Artist.deleteOne({_id: artistId});

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