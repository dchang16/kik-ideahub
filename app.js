var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    logfmt = require('logfmt');
    LocalStrategy = require('passport-local').Strategy;

var app = express();

var errorHandler = require('express-error-handler'),
  handler = errorHandler({
    static: {
      '404': 'uploads/404.html',
	  '500': 'uploads/500.html'
    }
  });
// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.cookieParser('dsadadsa'));
    app.use(express.session());

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/public', express.static(__dirname + '/public'));

});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Configure passport
 var Account = require('./models/account');

 passport.use(new LocalStrategy(Account.authenticate()));

 passport.serializeUser(Account.serializeUser());
 passport.deserializeUser(Account.deserializeUser());

// Connect mongoose
mongoose.connect("mongodb://d26chang:hackathon@troup.mongohq.com:10033/ideahub");

// Setup routes
require('./routes')(app);

var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log("Listening on " + port);
})
