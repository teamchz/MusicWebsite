const { exec } = require('child_process');

const   express     = require('express'),
        router      = express.Router(),
        Album       = require('../models/album'),
        Artist      = require('../models/artist'),
        Playlist    = require('../models/playlist'),
        Song        = require('../models/song'),
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


router.get('/', function(req, res) {
    Album.find({}, function(err, foundAlbum) {
        if (err) {
            console.log(err)
        } else {
            res.render('album/index.ejs', {album: foundAlbum})
        }
    })
})

router.get('/new', function(req, res) {
    Song.find({}, function(err, foundSong) {
        if (err) {
            console.log(err);
        } else {
            Artist.find({}).sort('name').exec(function(err, foundArtist) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('album/new.ejs', {song: foundSong, artist: foundArtist})
                }
            })
        }
    })
})

router.get('/:id', function(req, res) {
    Album.findById(req.params.id).exec(function(err, foundAlbum) {
        if (err) {
            console.log(err);
        } else {
            Song.find({_id: foundAlbum.song}).sort('track').exec(function(err, foundSong) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('album/show.ejs', {album: foundAlbum, song: foundSong})
                }
            })
        }
    })
})

router.post('/', upload.single('image'), function(req, res) {
    req.body.album.image = '/upload/' + req.file.filename
    Album.create(req.body.album, function(err, albumAdded) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/album')
        }
    })
})

module.exports = router;