const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ArtistSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    image: String
});

ArtistSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.'});
const Artist = mongoose.model('ArtistItem', ArtistSchema);

module.exports = Artist;