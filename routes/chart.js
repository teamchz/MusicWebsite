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
    Song.find({}).sort('-view').exec(function(err, foundSong) {
        if (err) {
            console.log(err)
        } else {
            Artist.find({}, function(err, foundArtist) {
                if (err) {
                    console.log(err)
                } else {
                    res.render('chart/index.ejs', {song: foundSong, artist: foundArtist});
                }
            })
        }
    })
});     


module.exports = router;