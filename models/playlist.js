const   mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: String,
    image: String,
    fav: {type: Boolean, default: false},
    song: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        },
        title: String
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String
    }
});

module.exports = mongoose.model('Playlist', playlistSchema);
