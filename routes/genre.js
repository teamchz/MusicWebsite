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


router.get('/', function(req,res){
    res.render('genre/index.ejs');
});

router.get('/folk', function(req,res){
    Song.find({ genre: 'Folk' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/folk.ejs', {song: foundSong});
        }
    })
});

router.get('/world', function(req,res){
    Song.find({ genre: 'World' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/world.ejs', {song: foundSong});
        }
    })
});

router.get('/latin', function(req,res){
    Song.find({ genre: 'Latin' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/latin.ejs', {song: foundSong});
        }
    })
});

router.get('/pop', function(req,res){
    Song.find({ genre: 'Pop' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/pop.ejs', {song: foundSong});
        }
    })
});

router.get('/classical', function(req,res){
    Song.find({ genre: 'Classical' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/classical.ejs', {song: foundSong});
        }
    })
});

router.get('/rock', function(req,res){
    Song.find({ genre: 'Rock' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/rock.ejs', {song: foundSong});
        }
    })
});

router.get('/vocal', function(req,res){
    Song.find({ genre: 'Vocal' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/vocal.ejs', {song: foundSong});
        }
    })
});

router.get('/jazz', function(req,res){
    Song.find({ genre: 'Jazz' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/jazz.ejs', {song: foundSong});
        }
    })
});

router.get('/hiphop', function(req,res){
    Song.find({ genre: 'Hip-Hop' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/hiphop.ejs', {song: foundSong});
        }
    })
});

router.get('/newage', function(req,res){
    Song.find({ genre: 'New-Age' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/newage.ejs', {song: foundSong});
        }
    })
});

router.get('/blues', function(req,res){
    Song.find({ genre: 'Blues' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/blues.ejs', {song: foundSong});
        }
    })
});

router.get('/rb', function(req,res){
    Song.find({ genre: 'R&B' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/rb.ejs', {song: foundSong});
        }
    })
});

router.get('/edm', function(req,res){
    Song.find({ genre: 'EDM' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/edm.ejs', {song: foundSong});
        }
    })
});

router.get('/country', function(req,res){
    Song.find({ genre: 'Country' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/country.ejs', {song: foundSong});
        }
    })
});

router.get('/metal', function(req,res){
    Song.find({ genre: 'Metal' }, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            res.render('genre/metal.ejs', {song: foundSong});
        }
    })
});

module.exports = router;