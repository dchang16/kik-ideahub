var passport = require('passport'),
    Account = require('./models/account');
module.exports = function (app) {
    
    app.get('/', function (req, res) {
        res.render('home', { user : req.user });
    });

    app.get('/register', function(req, res) {
		res.render('register', { });		
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
                return res.render('register', { account : account });
            }

            res.redirect('/');
        });
    });

    app.get('/login', function(req, res) {
        res.render('login', { user : req.user });
    });

    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
	
	app.get('/home', function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) { return res.redirect('/login'); }
		  res.render('home', { user : req.user });
	    })(req, res, next);
	});

	
	app.get('/login', function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) { return res.redirect('/login'); }
		req.logIn(user, function(err) {
		if (err) { return next(err); }
		  return res.redirect('/users/' + user.username);
		});
	  })(req, res, next);
	});
	


};
