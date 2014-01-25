/*Data Model for positions*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Position = new Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Position', Position);
