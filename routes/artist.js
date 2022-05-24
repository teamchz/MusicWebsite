const middlewareObj = require('../middleware');

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

 
router.get('/new', function(req,res){
    res.render('artist/new.ejs');
});

router.post('/', upload.fields([{
    name: 'profileImage', maxCount: 1
}, {
    name: 'bannerImage', maxCount: 1
}]), function(req, res) {
    req.body.artist.profileImage = '/upload/' + req.files['profileImage'][0].filename
    req.body.artist.bannerImage = '/upload/' + req.files['bannerImage'][0].filename
    Artist.create(req.body.artist , function(err, newlyAdded) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/")
        }
    })
});

router.get('/', function(req,res){
    Artist.find({}, function(err, allArtist) {
        if (err) {
            console.log(err)
        } else {
            res.render('artist/index.ejs', {artist: allArtist});
        }
    })
});

router.get('/:id', function(req, res) {
    Artist.findById(req.params.id).exec(function(err, foundArtist) {
        if (err) {
            console.log(err)
        } else {
            Song.find().where('artist.id').equals(foundArtist._id).exec(function(err, foundSong){
                if (err) {
                    console.log(err)
                } else {
                    Album.find().where('artist.id').equals(foundArtist._id).exec(function(err, foundAlbum) {
                        if (err) {
                            console.log(err)
                        } else {
                            res.render('artist/show.ejs', {artist: foundArtist, song: foundSong, album: foundAlbum})
                        }
                    })
                }
            }) 
        }
    })
})

router.get('/:id/edit', function(req, res) {
    Artist.findById(req.params.id).exec(function(err, foundArtist) {
        if (err) {
            console.log(err)
        } else {
            res.render("artist/edit", {artist: foundArtist})
        }
    })
})

router.put('/:id', upload.fields([{
    name: 'profileImage', maxCount: 1
}, {
    name: 'bannerImage', maxCount: 1
}]), function(req, res) {
    
    if (req.files) {
        req.body.artist.profileImage = '/upload/' + req.files['profileImage'][0].filename
        req.body.artist.bannerImage = '/upload/' + req.files['bannerImage'][0].filename
    }
    Artist.findByIdAndUpdate(req.params.id, req.body.artist, function(err, updatedArtist) {
        if (err) {
            console.log(err);
            res.redirect('/artist/');
        } else {
            res.redirect('/artist/' + req.params.id)
        }
    })
})

router.delete('/:id', function(req, res) {
    Artist.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/artist")
        }
    })
})

module.exports = router;