var mongoose = require('mongoose');

var reporttoolSchema = new mongoose.Schema({
    reportName: {
      type:String,
      required: true
    },
    img: String, // Needs to be re-implemented as per mongo docs
    disasterType: String, // Should this be it's own table in Postgres?
    reportLocation: {
        latitude: Number, // needs to be geo number
        longitude: Number,  // needs to be geo number
    }
    reporterNeeds: String, 
    noPeopleAffected: Number,
    timeStart: TimeRanges,
    dateStart: Date,
    author: userID,
    createdOn: {
        type: Date,
       "default": Date.now
     },
     author: userID,
    reporttoolResponse: { // nesting this schema but unsure if it should be seperately
        authorResponse: userID,
        responseTitle: {type:String, required: true}
        canRespond: Boolean,
        responseType: String,
        createdOn: {
            type: Date,
           "default": Date.now
         },
    }
    reporttoolComment: {
        authorComment: userID,
        comment: {type:String, required: true}
        createdOn: {
            type: Date,
           "default": Date.now
         },
    }
    
    }

mongoose.model('reporttool', reporttoolSchema);
