const album = require('../models/album');

const   express     = require('express'),
        router      = express.Router(),
        Album       = require('../models/album'),
        Artist      = require('../models/artist'),
        Song        = require('../models/song'),
        Playlist    = require('../models/playlist'),
        User        = require('../models/user'),
        multer      = require('multer'),
        path        = require('path'),
        storage     = multer.diskStorage({
                    destination: function(req, file, callback){
                        callback(null,'./public/upload/');
                    },
                    filename: function(req, file, callback){
                        callback(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
                    }
        }),
        imageFilter = function(req, file, callback){
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
                return callback(new Error('Only jpg, jpeg, png and gif.'), false);
            }
            callback(null, true);
        },
        upload = multer({storage: storage, fileFilter: imageFilter}),
        passport= require('passport');


router.get('/', function(req,res){
    User.findOne({_id: req.user._id}, function(err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            Playlist.find().where('author.id').equals(foundUser._id).exec(function(err, foundPlaylist) {
                if (err) {
                    console.log(err)
                } else {
                    res.render('playlist/index.ejs', {user: foundUser, playlist: foundPlaylist});
                }
            })
        }
    })
});

router.post('/', function(req, res) {
    req.body.playlist.image = '/images/playlist-default.png'

    Playlist.create(req.body.playlist, function(err, playlistAdded) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/playlist')
        }
    })
})

router.get('/:id', function(req, res) {
    Playlist.findById(req.params.id.trim(), function(err, foundPlaylist) {
        if (err) {
            console.log(err)
        } else {
            Song.find({_id: foundPlaylist.song.id}, function(err, foundSong) {
                if (err) {
                    console.log(err)
                } else {
                    res.render('playlist/show.ejs', {playlist: foundPlaylist, song: foundSong})
                }
            })
        }
    })
})

module.exports = router;