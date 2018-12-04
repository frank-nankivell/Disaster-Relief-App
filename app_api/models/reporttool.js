var mongoose = require('mongoose');

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
    reporttoolResponse: { // nesting this schema but unsure if it should be seperately
        authorResponse: String,
        responseTitle: {
            type:String, 
            required: true},
        canRespond: Boolean,
        responseType: String,
        createdOn: {
            type: Date,
           "default": Date.now
         },
    },
    reporttoolComment: {
        authorComment: String,
        comment: {type:String, required: true},
        createdOn: {
            type: Date,
           "default": Date.now
         },
    }
});
mongoose.model('reportTool', reportToolSchema);
