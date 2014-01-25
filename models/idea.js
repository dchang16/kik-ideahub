/*Data Model for ideas*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Idea = new Schema({
    title: String,
    pitch: String,
    uid: String,
    university: String,
    website: String,
    uploadDate: {type: Date, default: Date.now},
    industry: String,
   	score: { type: Number, default: 0 },
    img: { data: Buffer, contentType: String }
});

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
                    uid : collection[i].uid,
                    university : collection[i].university,
                    title : collection[i].title,
                    pitch : collection[i].pitch,
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

function findPopularIdeas(callback) {
    module.exports.find(
        null,
        null,
        {
            sort: 
            {
                score: -1
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
                uid : collection.uid,
                university : collection.university,
				title : collection.title,
				pitch : collection.pitch,
				uploadDate : collection.uploadDate,
				img :  {data: collection.img.data, contentType: collection.img.contentType},
				industry : collection.industry,
				score : collection.score
			})
			callback(null, instance);
		})
}

function updateScore( id, score, callback ) {
	module.exports.findByIdAndUpdate(
	id, {
		score: score
	}, function(err, ins){
		if (err) {
			callback(err)
		}
		else {
			console.log(ins);
			var instance = ({
				_id : ins._id,
                uid : ins.uid,
                university : ins.university,
				title : ins.title,
				pitch : ins.pitch,
				uploadDate : ins.uploadDate,
				img : {data: ins.img.data, contentType: ins.img.contentType},
				industry : ins.industry,
			})
			callback(null, instance);
		}
	});	
}

function filterResults(keywords, university, industry, callback){
    var boolU = ( university == "none");
    var boolI = ( industry == "none");
    var obj = {};
    obj.$and = [];
    if (!boolI){
        obj.$and.push({industry: industry}); 
    }
    if (!boolU){
        obj.$and.push({university: university}); 
    }
    if (!(keywords == "")){
        var _or = [];
        _or.push({ title: {$regex : '.*' + keywords + '.*', $options: 'i'} });
        _or.push({ pitch: {$regex : '.*' + keywords + '.*', $options: 'i'} });
        obj.$and.push({$or: _or});
        //obj.$and.push({ title: {$regex : '.*' + keywords + '.*', $options: 'i'} }); 
        //obj.$and.push({ pitch: {$regex : '.*' + keywords + '.*', $options: 'i'} }); 
    }

    if (boolI && boolU && keywords == ""){
        obj = {}; 
    }

    console.log(obj);
    module.exports.find(
        obj,
        function(err, collection){
            var i=0;
            var instanceArray = new Array();
            for(;i < collection.length; i++){
                var instance = ({
                    _id : collection[i]._id,
                    title : collection[i].title,
                    pitch : collection[i].pitch,
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

// Idea.updateScore( collection[0]._id, collection[0].score + 3 , 
//      function ( err ) {
//          if(err) throw(err);
//      });


module.exports.findRecentIdeas = findRecentIdeas;
module.exports.findIdeaByID = findIdeaByID;
module.exports.updateScore = updateScore;
module.exports.findPopularIdeas = findPopularIdeas;
module.exports.filterResults = filterResults;
