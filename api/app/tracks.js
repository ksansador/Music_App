const express =require('express');
const Track = require('../models/Track');
const Album = require("../models/Album");
const router = express.Router();

router.get('/', async( req, res) => {
    if(req.query.album) {
        const tracks = await Track.find({album: req.query.album});

        res.send(tracks);
    } else if ( req.query.artist) {
        const albums  = await Album.find({artist: req.query.artist}, "_id title");
        const tracks = await Track.find({album: {$in: albums}}).populate('album', 'title');

        res.send(tracks);
    }

    try {
        const tracks  =  await Track
            .find()
            .populate('album', 'title artist year');

        res.send(tracks);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.post('/', async (req, res) => {
   const { title, album, duration } = req.body;

   if ( !title || !album || !duration ) {
       return res.status(400).send({error: 'Data not valid'});
   }

   const trackData = { title, album , duration };

   try {
    const track = new Track (trackData);
    await track.save();

    res.send(track);
   }catch (e) {
       res.status(400).send({error: e.errors});
   }
});

module.exports = router;
