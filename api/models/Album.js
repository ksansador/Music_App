const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const idValidator = require('mongoose-id-validator');

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'ArtistItem',
        required: true,
    },
    year: {
        type: Number,
        max: 2022,
        required: true,
    },
    image: String,
    publish: {
        type: Boolean,
        default: false,
    }
});

AlbumSchema.plugin(idValidator, { message : 'Bad ID value for {PATH}' });
const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
