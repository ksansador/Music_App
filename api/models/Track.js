const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const idValidator = require('mongoose-id-validator');

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    }
});

TrackSchema.plugin(idValidator, { message : 'Bad ID value for {PATH}' });
const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;
