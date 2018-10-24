var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: Number,
    firstName: String,
    secondName: String,
    email: String,
    role: ['Admin','Standard User'].
});

var learninghubSchema = new mongoose.Schema({
    id: Number,
    hubentryName: String,
    articleType: ['How-to Guide', 'Idea','Question','Other'],
    disasterType: ['Forrest Fire','Earthquake','Storm','Drought'],
    hubtext: String,
    createdOn: {
        type: Date,
        "default": Date.now
      }
    author: [userSchema],

});

mongoose.model('lhdata', lhdataschema);
