const express =require('express');
const Track = require('../models/Track');
const Album = require("../models/Album");
const router = express.Router();

router.get('/', async( req, res) => {

    if(req.query.album) {
        const tracks = await Track
            .find({album: req.query.album})
            .sort({number: 1})
            .populate('album', 'title');

       return res.send(tracks);
    } else if ( req.query.artist) {
        const albums  = await Album.find({artist: req.query.artist}, "_id title");
        const tracks = await Track.find({album: {$in: albums}}).populate('album', 'title');

       return  res.send(tracks);
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

router.post('/',  async (req, res) => {
   const { title, album, duration, number, url } = req.body;

   // if ( !title || !album || !duration || !number) {
   //     return res.status(404).send({error: 'Data not valid'});
   // }

   const trackData = {
       title,
       album ,
       duration,
       number,
       url: url || null,
   };

   try {
    const track = new Track(trackData);
    await track.save();

    res.send(track);
   }catch (e) {
       res.status(400).send({errors: e.errors});
   }
});

module.exports = router;
