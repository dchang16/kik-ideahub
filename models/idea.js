/*Data Model for ideas*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Position = require('./position');

var Idea = new Schema({
    title: String,
    pitch: String,
    positions: [Position],
    website: String,
    uploadDate: {type: Date, default: Date.now},
    industry: String,
    img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Idea', Idea);
