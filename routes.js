var passport = require('passport'),
    Account = require('./models/account'),
    Idea = require('./models/idea'),
	fs = require("fs"),
	formidable = require("formidable");

module.exports = function (app) {
    
    app.get('/upload', function(req,res){
        //Idea.findOne({ '_id' : '52e3442a23ce910d78000001'}, '_id img', function(err, idea){
            //if (err) throw err;
            //console.log("%s", idea.img);
            //res.writeHead(200, {'Content-Type': 'text/html'});
            //res.write('<html><body><img src="data:image/png;base64,')
            //res.write(new Buffer(idea.img.data).toString('base64'));
            //res.end(' "</body></html>');
            //return;
        //});
        res.render('upload',{user : req.user });
    });

    app.post('/upload', function(req, res, next){ 
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err);}
            var imgPath = req.files.ideaImage.path;
            var idea = new Idea;
            idea.title = req.body.title;
            idea.pitch = req.body.pitch;
            idea.positions = [req.body.positions];
            idea.website = req.body.website;
            idea.industry = req.body.industry;
            idea.img.data = fs.readFileSync(imgPath);
            idea.img.contentType = req.files.ideaImage.type;
            idea.save(function(err, idea){
                if(err) { console.log("err: " + err); return next(err); }
                else{
                    //console.log(req.user);
                    req.user.ideas.push(idea);
                    req.user.save(function(err, req) {
                         if(err) { console.log("err: " + err); return next(err); }
                         else{
                            //console.log(req.user); 
                         }
                    });
                    res.render('main', {user : req.user });
                }
            });
        })(req, res, next);
    });

    app.get('/', function (req, res) {
        res.render('home', { user : req.user });
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

    app.get('/search', function(req, res) {
        res.render('search', { user : req.user });
    });

    app.get('/idea', function(req, res) {
        res.render('idea', { user : req.user });
    });
};
