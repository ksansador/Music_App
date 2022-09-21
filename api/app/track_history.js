const express = require('express');
const User = require('../models/User');
const TrackHistory = require("../models/TrackHistory");
const Track = require("../models/Track");
const router = express.Router();

router.post('/', async (req, res) => {
   const token = req.get('Authorization');
   const { track } = req.body;

   if(!token) {
       return res.status(401).send({error: 'No token present!'});
   }

    if(!track) {
        return res.status(400).send({error: 'Data not valid'});
    }

   const user = await User.findOne({token});

    if(!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }

    const trackHistoryData = {
        user: user.id,
        datetime: new Date().toISOString(),
        track
    };

    try{
        const check = await Track.findById(track);

        if(!check) {
            return res.status(404).send({error: 'Not found'});
        }

        const trackHistory = new TrackHistory(trackHistoryData);
        await trackHistory.save();
         res.send(trackHistory);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;
