var mongoose = require('mongoose');

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
     }
    });

mongoose.model('Learninghub', learninghubSchema);
