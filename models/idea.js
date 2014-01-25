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
   	score: { type: Number, default: 0 },
    img: { data: Buffer, contentType: String }
});

module.exports.schema = Idea;
module.exports = mongoose.model('Idea', Idea);


function findRecentIdeas(callback) {
    module.exports.find(
        null,
        null,
        {
            sort: 
            {
            	uploadDate: -1
            },

            limit: 10
        },
        function (err, collection){
            var i=0;
            var instanceArray = new Array();
            for(;i < collection.length; i++){
                var instance = ({
                    _id : collection[i]._id,
                    title : collection[i].title,
                    pitch : collection[i].pitch,
                    positions: collection[i].positions,
                    uploadDate : collection[i].uploadDate,
                    img : {data: collection[i].img.data, contentType: collection[i].img.contentType},
                    industry : collection[i].industry,
                    score : collection[i].score
                    
                })
                instanceArray.push(instance);
            }
            callback(null, instanceArray);
    	}   
    );
}

function findIdeaByID(id, callback) {
	module.exports.findById(id, 
		function(err, collection) {
			var instance = ({
				_id : collection._id,
				title : collection.title,
				pitch : collection.pitch,
				positions : collection.positions,
				uploadDate : collection.uploadDate,
				img :  {data: collection.img.data, contentType: collection.img.contentType},
				industry : collection.industry,
				score : collection.score
			})
			callback(null, instance);
		})
}

module.exports.findRecentIdeas = findRecentIdeas;
module.exports.findIdeaByID = findIdeaByID;