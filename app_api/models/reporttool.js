var mongoose = require('mongoose');

var usersContacted = new mongoose.Schema({
    userName: String, 
    email: String,
});

var reportToolComment = new mongoose.Schema({
        author: String,
        commentText: {type:String, required: true},
        createdOn: {
            type: Date,
           "default": Date.now
         }
});

var reportToolResponse = new mongoose.Schema({
        responseSent: Boolean,
        userEmails: String,
    });

var reportToolSchema = new mongoose.Schema({
    reportName: {
      type:String,
      required: true
    },
    country: String,
    Open: Boolean,
    img: String, // Needs to be re-implemented as per mongo docs
    disasterType: String, // Should this be it's own table in Postgres?
    coords: {
        type: [Number],
        index: '2dsphere'  // needs to be geo number
        },
    reporterNeeds: String, 
    noPeopleAffected: Number,
    dateStart: {
        type: Date,
    },
    author: String,
    contactDetails: String,
    createdOn: {
        type: Date,
       "default": Date.now
     },
    contactDetails: String,
    repCode: String,
    reportToolResponses: [reportToolResponse],
    reportToolComments: [reportToolComment]
});
mongoose.model('reportTool', reportToolSchema);
