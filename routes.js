var passport = require('passport'),
    Account = require('./models/account');
module.exports = function (app) {
    
    app.get('/', function (req, res) {
        res.render('home', { user : req.user });
    });

    app.post('/register', function(req, res) {
        Account.register(
            new Account(
                { username : req.body.username,
                  university : req.body.university,
                  phone : req.body.phone,
                  email : req.body.email
                }
            ),
            req.body.password,
            function(err, account) {
            
			if (err) {
                return res.render('home', { account : account });
            }
            else {
          	  res.redirect('/main');
            }
        });
    });

    app.get('/home', function(req, res) {
        res.render('home', { user : req.user });
    });

    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/main');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
	
	app.get('/main', function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		res.render('main', { user : req.user });
		console.log(req.user);
	    })(req, res, next);
	});

    app.get('/search', function(req, res) {
        res.render('search', { user : req.user });
    });



};
