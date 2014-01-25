var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    Idea = require('./idea');

var Account = new Schema({
    university: String,
    phone: String,
    email: String,
    ideas: [Idea.schema]
});

function findUserByID(id, callback) {
	module.exports.findById(id, 
		function(err, collection) {
			var instance = ({
				_id : collection._id,
				university : collection.university,
				phone : collection.phone,
				email : collection.email,
				ideas : collection.ideas,
			})
			callback(null, instance);
    });
}

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
module.exports.findUserByID = findUserByID;
