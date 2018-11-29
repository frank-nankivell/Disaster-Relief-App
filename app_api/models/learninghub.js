var mongoose = require('mongoose');


var learninghubComment = new mongoose.Schema({
  author: {type: String, required: true},
  commentText: {type: String, required: true},
  createdOn: {
      type: Date,
      "default": Date.now
  }
});

var learninghubSchema = new mongoose.Schema({
    hubentryName: {
      type:String,
      required: true
    },
    articleType: [], // How to guide etc
    disasterType: [], // Forrest Fire','Earthquake','Storm','Drought'
    hubtext: {
      type: String,
      required: true
    },
    relatedContinent: [],
    createdOn: {
        type: Date,
       "default": Date.now
     },
     author: {
       type: String,
       required: true
     },
     comment: [learninghubComment]
    });

mongoose.model('Learninghub', learninghubSchema);
