const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const idValidator = require('mongoose-id-validator');
const uniqueValidator = require('mongoose-unique-validator');

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'ArtistItem',
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    image: String,
});

AlbumSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.'});
AlbumSchema.plugin(idValidator, { message : 'Bad ID value for {PATH}' });
const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
