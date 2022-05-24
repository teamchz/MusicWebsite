const   express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require('mongoose'),
        passport    = require('passport'),
        LocalStrategy = require('passport-local'),
        flash       = require('connect-flash'),
        methodOverride = require('method-override'),
        Album       = require('./models/album'),
        Artist      = require('./models/artist'),
        Song        = require('./models/song'),
        Playlist    = require('./models/playlist'),
        User        = require('./models/user'),
        seedDB      = require('./seeds.js');

const   indexRoutes = require('./routes/index'),
        songRoutes  = require('./routes/songs'),
        artistRoutes= require('./routes/artist'),
        chartRoutes = require('./routes/chart'),
        genreRoutes = require('./routes/genre'),
        playlistRoutes = require('./routes/playlist'),
        albumRoutes = require('./routes/album');

mongoose.connect('mongodb://localhost/Project');
app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB();

app.use(require('express-session')({
    secret: 'secret word',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRoutes);
app.use('/song', songRoutes);
app.use('/artist', artistRoutes);
app.use('/chart', chartRoutes);
app.use('/genre', genreRoutes);
app.use('/playlist', playlistRoutes);
app.use('/album', albumRoutes);

app.listen(3000, function(){
    console.log("Activated");
});