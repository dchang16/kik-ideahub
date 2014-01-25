/*Data Model for ideas*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Idea = new Schema({
    title: String,
    pitch: String,
    positions: [String],
    website: String,
    uploadDate: {type: Date, default: Date.now},
    industry: String,
    img: { data: Buffer, contentType: String }
});

module.exports.schema = Idea;
module.exports = mongoose.model('Idea', Idea);
