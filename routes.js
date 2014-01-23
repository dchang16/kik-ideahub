var passport = require('passport'),
    Account = require('./models/account');
module.exports = function (app) {
    
    app.post('/register', function(req, res) {
        Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
            if (err) {
                console.log('failed');
            }
            res.redirect('/');
        });
    });


    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });
    
};