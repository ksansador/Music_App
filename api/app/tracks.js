const express =require('express');
const Track = require('../models/Track');
const Album = require("../models/Album");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const router = express.Router();

router.get('/', auth, async( req, res) => {
    const query = {};
    const sort = {};

    if(req.query.album) {
        query.album = req.query.album;
        sort.number = 1;
    }

    if ( req.query.artist) {
        query.artist = req.query.artist;
        sort.number = 1;
        const albums  = await Album.find(query, "_id title");
        const tracks = await Track.find({album: {$in: albums}}).populate('album', 'title');

       return  res.send(tracks);
    }

    if(req.query.user) {
        query.user = req.query.user;
    }

    try {
        const tracks  =  await Track
            .find(query)
            .populate('album', 'title artist year');

        res.send(tracks);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.post('/', auth, permit('user', 'admin'), async (req, res) => {
   const { title, album, duration, number, url } = req.body;
   const user = req.user;

   const trackData = {
       title,
       album ,
       duration,
       number,
       user: user._id,
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

router.put('/:id/publish', auth, permit('admin'), async (req, res) => {
    const trackId =  req.params.id;

    try {
        const track = await Track.findById(trackId);

        if(!track) {
            return res.status(404).send({errors: 'There are no track'});
        }

        await Track.findByIdAndUpdate(trackId, {publish: true});

        return  res.send({message: 'Publish success'});
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    const trackId = req.params.id;

    try {
        const response =  await Track.deleteOne({_id: trackId});

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
