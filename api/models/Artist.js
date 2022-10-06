const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ArtistSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: String,
    image: String,
    publish: {
        type: Boolean,
        default: false,
    }
});

ArtistSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.'});
const Artist = mongoose.model('ArtistItem', ArtistSchema);

module.exports = Artist;