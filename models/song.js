const   mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    content: String,
    title: String,
    track: Number,
    view: Number,
    lyrics: String,
    image: String,
    genre:  { type: Array, "default":[]  },
    album: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Album'
        },
        name: String
    },
    artist: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        },
        name: String
    }
});


module.exports = mongoose.model('Song', songSchema);