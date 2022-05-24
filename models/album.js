const   mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumTitle: String,
    image: String,
    song: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song',
        }
    ],
    artist: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        },
        name: String
    }
});

module.exports = mongoose.model('Album', albumSchema);
