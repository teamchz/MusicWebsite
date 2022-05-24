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

router.get("/", function(req, res){
    // console.log(res.locals.currentUser);
    Song.find({}).sort('-image').limit(5).exec(function(err, allSongs) {
        if (err) {
            console(err)
        } else {
            Artist.find({}).sort('-image').limit(5).exec(function(err, allArtist) {
                if (err) {
                    console.log(err)
                } else {
                    Album.find({}).sort('-image').limit(5).exec(function(err, allAlbum) {
                        if (err) {
                            console.log(err)
                        } else {
                            res.render("landing.ejs", {songs: allSongs, artist: allArtist, album: allAlbum})
                        }
                    })
                }
            })
        }
    })
});

router.get('/register', function(req,res){
    res.render('register.ejs');
});

router.post('/register', upload.single('profileImage'), function(req, res){
    // req.body.profileImage = '/upload/'+req.file.filename;
    req.body.profileImage = '/images/profile.jpg';
    let newUser = new User({username: req.body.username,
                            displayName: req.body.username,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            profileImage: req.body.profileImage
    });
    if(req.body.adminCode === 'topsecret'){
        newUser.isAdmin = true;
    }  
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function(){
            req.flash('success', user.username +', Welcome to GracePrint');
            res.redirect('/');;
            });
            Playlist.create({name: "Favourite", fav: true, 
            image: '/images/fav-default.png', 
            author:{id: user._id, name: user.displayName}},
            function(err, playlistAdded) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Fav Created!');
                }
            })
        }
    });
});

router.get('/login', function(req,res){
    res.render('login.ejs');
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Successfully login',
        failureFlash: 'Invalid username or password'
    }), function(req,res){
});

router.get('/logout', function(req,res){
    req.logout();
    req.flash('success', 'Log you out successfully');
    res.redirect('/');
});

router.get('/user/:id', function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash('error', 'There is something wrong!');
            return res.redirect('/');
        } else {
            console.log(req.params.id);
            res.render('user/show.ejs', {user: foundUser});
        }
    });
});

router.get('/browse/:title', function(req, res) {
    Song.find({"title": {$regex: '.*' + req.params.title + '.*', '$options': 'i'}}, function(err, foundSong) {
        if (err) {
            console.log(err);
        } else {
            Artist.find({"name": {$regex: '.*' + req.params.title + '.*', '$options': 'i'}}, function(err, foundArtist) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('browse/show.ejs', {song: foundSong, artist: foundArtist})
                }
            })
        }
    })
})


module.exports = router;