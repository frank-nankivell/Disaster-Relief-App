var mongoose = require('mongoose');
var lh = mongoose.model('reportTool');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var getAuthor = function(req, res, callback) {
  console.log("Finding author with email " + req.payload.email);
  if (req.payload.email) {
    User
      .findOne({ email : req.payload.email })
      .exec(function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "User not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(user);
        callback(req, res, user.name);
      });

  } else {
    sendJSONresponse(res, 404, {
      "message": "User not found"
    });
    return;
  }
};

module.exports.getReport = function(req, res) {
console.log("Find me a Report... Entry", req.params);
  if(req.params && req.params.reportID) {
    lh
      .findById(req.params.reportID)
      .exec(function(err, reportTool) {
        if (!reportID) {
          sendJSONresponse(res, 404, {
            "message": "No record with ID FOUND"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(reportTool);
        sendJSONresponse(res, 200, reportTool);
      });
  } else {
    console.log('No ID Given');
    sendJSONresponse(res, 404, {
      "message": "No ID in request"
    });
  };
};

module.exports.newReport = function(req, res) {
    getAuthor(req, res, function(req, res, username)  {
      console.log(req.body);
      lh.create({
        reportName: req.body.reportName,
        disasterType: req.body.disasterType,
        coords: req.body.coords,
        reporterNeeds: req.body.reporterNeeds,
        noPeopleAffected: req.body.noPeopleAffected,
        onGoing: req.body.onGoing,
        dateStart: req.body.dateStart,
        author: req.body.author,
        createdOn: ''
        hubtext: req.body.hubtext,
        },
        function(err, learninghub) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
          } else {
            console.log(learninghub);
            sendJSONresponse(res, 201, learninghub);
          }
      });
    });
  
  };
  
module.exports.newReportComment = function(req, res) {};
module.exports.reportCommentUpdate = function(req, res) {};
module.exports.reportCommentDeleteOne = function(req, res) {};
module.exports.learninghubDeleteOne = function(req, res) {};
module.exports.reportUpdate = function(req, res) {};
module.exports.reportDeleteOne = function(req, res) {};
module.exports.getReport = function(req, res) {};