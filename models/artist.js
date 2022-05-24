const   mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: String,
    description: String,
    profileImage: String,
    bannerImage: String
});

module.exports = mongoose.model('Artist', artistSchema);
