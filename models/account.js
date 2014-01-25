var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    Idea = require('./idea');

var Account = new Schema({
    university: String,
    phone: String,
    email: String,
    ideas: [Idea]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
