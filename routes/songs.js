const middlewareObj = require('../middleware');

const   express = require('express'),
        router  = express.Router(),
        Album       = require('../models/album'),
        Artist      = require('../models/artist'),
        Playlist    = require('../models/playlist'),
        Song        = require('../models/song'),
        User        = require('../models/user'),
        multer  = require('multer'),
        path    = require('path'),
        storage = multer.diskStorage({
                    destination: function(req, file, callback){
                        callback(null,'./public/upload/');
                    },
                    filename: function(req, file, callback){
                        callback(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
                    }
        }),
        imageFilter = function(req, file, callback){
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif|mp3)$/i)){
                return callback(new Error('Only jpg, jpeg, png gif and mp3.'), false);
            }
            callback(null, true);
        },
        upload = multer({storage: storage, fileFilter: imageFilter}),
        passport= require('passport');


router.get('/new', function(req,res){
    Artist.find({}).sort('name').exec(function(err, allArtist) {
        if (err) {
            console.log(err)
        } else {
            res.render('song/new.ejs', {artist: allArtist});
        }
    })
});

router.post('/', upload.fields([{
    name: 'image', maxCount: 1
}, {
    name: 'audio', maxCount: 1
}]), function(req, res) {
    req.body.song.image = '/upload/' + req.files['image'][0].filename
    req.body.song.content = '/upload/' + req.files['audio'][0].filename
    Song.create(req.body.song , function(err, newlyAdded) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/")
        }
    })
});


router.get('/:id', middlewareObj.isLoggedIn, function(req,res){
    Song.findById(req.params.id, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            User.findOne({_id: req.user._id}, function(err, foundUser) {
                if (err) {
                    console.log(err);
                } else {
                    Playlist.find().where('author.id').equals(foundUser._id).exec(function(err, foundPlaylist) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('song/show.ejs', {user: foundUser, playlist: foundPlaylist, song: foundSong})
                        }
                    })
                }
            })
        }
    })
});

router.get('/:id/edit', function(req, res) {
    Song.findById(req.params.id).exec(function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            Artist.find({}, function(err, foundArtist) {
                if (err) {
                    console.log(err)
                } else {
                    res.render("song/edit.ejs", {song: foundSong, artist: foundArtist})
                }
            })
        }
    })
})


router.put('/:id', upload.fields([{
    name: 'image', maxCount: 1
}, {
    name: 'audio', maxCount: 1
}]), function(req, res) {
    if (req.files) {
        req.body.song.image = '/upload/' + req.files['image'][0].filename
        req.body.song.content = '/upload/' + req.files['audio'][0].filename
    }
    Song.findByIdAndUpdate(req.params.id, req.body.song, function(err, updatedSong) {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            res.redirect('/song/' + req.params.id)
        }
    })
})

router.put('/:id/playlist/:playlist_id', function(req, res) {
    Song.findById(req.params.id, function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            Playlist.findByIdAndUpdate({_id: req.params.playlist_id}, {$push: {song: {id: foundSong._id, title: foundSong.title}}}, function(err, addedSong) {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect('/song/' + req.params.id)
                }
            }) 
        }
    })
})

// router.put('/:id/playlist', function(req, res) {
    
//     Song.findById(req.params.id, function(err, foundSong) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(req.b)
//         }
//     })
//     Playlist.findByIdAndUpdate({_id: req.params.id}, {$push: {song: req.body.playlist}}, function(err, songAddedPlaylist) {
//         if (err) {
//             console.log(err)
//         } else {
//             res.redirect('/song/' + req.params.id)
//         }
//     })
// })

router.delete('/:id', function(req, res) {
    Song.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/")
        }
    })
})


module.exports = router;