var mongoose = require('mongoose');

var reportToolComment = new mongoose.Schema({
        author: String,
        commentText: {type:String, required: true},
        createdOn: {
            type: Date,
           "default": Date.now
         }
});

var reportToolResponse = new mongoose.Schema({
        author: String,
        responseTitle: {
            type:String, 
            required: true},
        canRespond: Boolean,
        responseType: String,
        createdOn: {
            type: Date,
           "default": Date.now
         }
    });

var reportToolSchema = new mongoose.Schema({
    reportName: {
      type:String,
      required: true
    },
    img: String, // Needs to be re-implemented as per mongo docs
    disasterType: String, // Should this be it's own table in Postgres?
    coords: {
        type: [Number],
        index: '2dsphere'  // needs to be geo number
        },
    reporterNeeds: String, 
    noPeopleAffected: Number,
    onGoing: Boolean,
    dateStart: {
        type: Date,
    },
    author: String,
    createdOn: {
        type: Date,
       "default": Date.now
     },
    reportToolResponses: [reportToolResponse],
    reportToolComments: [reportToolComment]
});
mongoose.model('reportTool', reportToolSchema);
