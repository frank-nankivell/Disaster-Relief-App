var mongoose = require('mongoose');
var rT = mongoose.model('reportTool');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var userLocal = function(req, res, name, user, callback) {
  // method to insert 1) request with country info, 2) user, = return filtered values based on author
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
        callback(req, res, user.name, user);
      });

  } else {
    sendJSONresponse(res, 404, {
      "message": "User not found"
    });
    return;
  }
};

module.exports.getReport = function(req, res) { 
  console.log("Finding record with ID " + req.params.reportID);
  if (req.params.reportID) {
    rT
      .findById(req.params.reportID)
      .exec(function(err, reporttool) {
        if (!reporttool) {
          sendJSONresponse(res, 404, {
            "message": "Report not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log("getReport" + reporttool);
        sendJSONresponse(res, 200, reporttool);
      });

  } else {
    console.log("No ID given)")
    sendJSONresponse(res, 404, {
      "message": "No ID given"
    });
    return;
  }
};
module.exports.newReport = function(req, res) {
      console.log(req.body);
      rT.create({
        reportName: req.body.reportName,
        img: req.body.img,
        disasterType: req.body.disasterType,
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        reporterNeeds: req.body.reporterNeeds,
        noPeopleAffected: req.body.noPeopleAffected,
        onGoing: req.body.onGoing,
        dateStart: req.body.dateStart,
        author: req.body.author,
        createdOn: ''
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
    };

module.exports.reportCreatedDate = function(req, res) {
  console.log("Finding all reports by Date")
  rT
    .find()
    .sort([['createdOn', 1]])
    .exec(function(err, reporttool) {
      if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
      } else {
        console.log(reporttool);
        sendJSONresponse(res, 201, reporttool);
      }
  }
);
};

module.exports.newReportComment = function(req, res) {
    var x = req.params.reportID
    console.log(x + "check")
    if(req.params.reportID) {
      console.log()
      rT
        .findById(req.params.reportID)
        .select('reportToolComments')
        .exec(function(err, reporttool) {
            if (err) {
              sendJSONresponse(res, 400, err);
            } else {
              console.log(reporttool)
              doAddComment(req, res, reporttool);
            }
          }
      );
    } else {
        sendJSONresponse(res, 404, {
          "message": "Not happenin, LH ID required"
        });
      }
    };

  var doAddComment = function(req, res, Reporttool, author) {
    if (!Reporttool) {
      sendJSONresponse(res, 404, "RT ID aint about" + Reporttool);
    } else {
      Reporttool.comment.push({
        commentText: req.body.commentText,
        author: req.body.author
      });
      reportool.save(function(err, Reporttool) {
        var thisComment;
        if (err) {
          sendJSONresponse(res, 400, err);
        } else {
          thisComment = Reporttool.comment[Reporttool.comment.length - 1];
          sendJSONresponse(res, 201, thisComment);
        }
      });
    }
  };

module.exports.reportCommentUpdate = function(req, res) {
};
module.exports.reportCommentDeleteOne = function(req, res) {};
module.exports.learninghubDeleteOne = function(req, res) {};
module.exports.reportUpdate = function(req, res) {};
module.exports.reportDeleteOne = function(req, res) {};