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
  console.log("you fucker")
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
    .exec(function(err, reportTool) {
      if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
      } else {
        console.log(reportTool);
        sendJSONresponse(res, 201, reportTool);
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
        .exec(function(err, reportool) {
            if (err) {
              sendJSONresponse(res, 400, err);
            } else {
              console.log(reportool)
              doAddComment(req, res, reportool, username);
            }
          }
      );
    } else {
        sendJSONresponse(res, 404, {
          "message": "Not happenin, LH ID required"
        });
      }
    };

  var doAddComment = function(req, res, reportool, author) {
    if (!reportool) {
      sendJSONresponse(res, 404, "RT ID aint about" + reportool);
    } else {
      reportool.comment.push({
        commentText: req.body.commentText,
        author: req.body.author
      });
      reportool.save(function(err, reportool) {
        var thisComment;
        if (err) {
          sendJSONresponse(res, 400, err);
        } else {
          thisComment = reportool.comment[reportool.comment.length - 1];
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
module.exports.getReport = function(req, res) {};