var passport = require('passport'),
    Account = require('./models/account'),
    Idea = require('./models/idea'),
    fs = require("fs");

module.exports = function (app) {
    
    app.get('/upload', function(req,res){
        res.render('upload',{user : req.user });
    });

    app.post('/upload', function(req, res, next){ 
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err);}
            var imgPath = req.files.ideaImage.path;
            var idea = new Idea;
            idea.title = req.body.title;
            idea.pitch = req.body.pitch;
            idea.website = req.body.website;
            idea.industry = req.body.industry;
            idea.img.data = fs.readFileSync(imgPath);
            console.log('idea.img.data is ' + idea.img.data);
            idea.img.contentType = req.files.ideaImage.type;
            idea.uid = req.user._id;
            idea.university = req.user.university;
            idea.save(function(err, idea){
                if(err) { console.log("err: " + err); return next(err); 
                }else{
                    req.user.ideas.push(idea);
                    req.user.save(function(err, req) {
                        if(err) { console.log("err: " + err); return next(err); 
                        }else{
                            Idea.findRecentIdeas(function (err, collection){
                                if(err){
                                    res.send({found: false, error: "No ideas found" });
                                }else{
                                    res.render('main', { user : req.user, collection : collection } );
                                }
                            });
                        }
                    });
                }
            });
        })(req, res, next);
    });

    app.get('/', function (req, res) {
        res.redirect('/main');
    });

    app.post('/register', function(req, res) {
        Account.register(
            new Account(
                { username : req.body.username,
                  university : req.body.university,
                  phone : req.body.phone,
                  email : req.body.email,
                  ideas : []
                }
            ),
            req.body.password,
            function(err, account) {
            
			if (err) {
                return res.render('home', { account : account });
            }
            else {
          	  res.redirect('/home');
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
        Idea.findRecentIdeas(function (err, collection){
            if(err){
                res.send({found: false, error: "No ideas found" });
            }else{
                console.log("BEGIN------------GET IDEAS BY ID----------------------BEGIN");
                console.log(collection);
                console.log("END--------------GET IDEAS BY ID------------------------END");
                res.render('main', { user : req.user, collection : collection } );
            }
        });

	    })(req, res, next);
	});

    app.get('/mainpopular', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        Idea.findPopularIdeas(function (err, collection){
            if(err){
                res.send({found: false, error: "No ideas found" });
            }else{
                console.log("BEGIN------------GET IDEAS BY ID----------------------BEGIN");
                console.log(collection);
                console.log("END--------------GET IDEAS BY ID------------------------END");
                res.render('main', { user : req.user, collection : collection } );
            }
        });

        })(req, res, next);
    });

    app.get('/search', function(req, res) {
        res.render('search', { user : req.user });
    });

    app.post('/search', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            Idea.filterResults(
                req.body.title,
                req.body.university,
                req.body.industry,
                function (err, collection){
                    if(err){
                        res.send({found: false, error: "No ideas found" });
                    }else{
                        console.log("BEGIN------------GET IDEAS BY ID----------------------BEGIN");
                        console.log(collection);
                        console.log("END--------------GET IDEAS BY ID------------------------END");
                        res.render('main', { user : req.user, collection : collection } );
                    }
                }
            );
        })(req, res, next);
    });


    app.get('/idea:id', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            var id = req.params.id.substring(1);
            Idea.findIdeaByID(id, function(err, collection) {
                if(err) {
                    console.log('Could not find ID')
                }
                else {
                    res.render('idea', {user : req.user, collection : collection});
                }
            });
        })(req, res, next);
    });

    app.get('/like:id', function(req,res) {
        var id = req.params.id.substring(1);
        var score;
        Idea.findIdeaByID(id, function(err, collection) {
            if(err) {
                console.log('Failed');
            }
            else {
                score = collection.score;
                Idea.updateScore(id, score + 1, function(err, instance) {
                    if(err) {
                        console.log('Could not update score')
                    }
                    else {
                        res.render('idea', {collection : instance})
                        console.log('Voted');
                    }
                })
            }
        })
        
    })
};
