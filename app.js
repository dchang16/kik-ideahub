var path = require('path'),
    express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    logfmt = require('logfmt'),
    LocalStrategy = require('passport-local').Strategy;

var app = express();

app.use(logfmt.requestLogger());
var port = Number(process.env.PORT || 5000);

// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.cookieParser('your secret here'));
    app.use(express.session());

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/public', express.static(__dirname + '/public'));

});

// Configure passport
var Account = require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Connect mongoose
mongoose.connect('mongodb://d26chang:hackathon@troup.mongohq.com:10033/ideahub');

// Setup routes
require('./routes')(app);

var server = http.createServer(app);
server.listen(port, function() {
    console.log("Listening on " + port);
});

