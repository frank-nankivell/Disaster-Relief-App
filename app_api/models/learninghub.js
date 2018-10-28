var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: Number,
    firstName: String,
    secondName: String,
    email: String,
    role: ['Admin','Standard User']
  });

var learninghubSchema = new mongoose.Schema({
//    id: Number,
    hubentryName: String,
    articleType: [], // How to guide etc
    disasterType: [], // Forrest Fire','Earthquake','Storm','Drought'
    hubtext: String,
//    author: [userSchema],
    createdOn: {
        type: Date,
       "default": Date.now
     }
    });

mongoose.model('Learninghub', learninghubSchema);
