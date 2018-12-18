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
        function(err, reporttool) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
          } else {
            console.log(reporttool);
            sendJSONresponse(res, 201, reporttool);
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
module.exports.reportUpdate = function(req, res) {
    if (!req.params.reportID) {
      sendJSONresponse(res, 404, {
        "message": "Not found, ReportID is required matey"
      });
      return;
    }
    rT
      .findById(req.params.reportID)
      .select('-reportToolComments -reportToolResponse')
      .exec(
        function(err, reporttool) {
          if (!reporttool) {
            sendJSONresponse(res, 404, {
              "message": "report tool ID not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }
          reporttool.reportName = req.body.reportName;
          reporttool.img = req.body.img;
          reporttool.disasterType = req.body.disasterType;
          reporttool.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)],
          reporttool.reporterNeeds = req.body.reporterNeeds,
          reporttool.noPeopleAffected = req.body.noPeopleAffected,
          reporttool.onGoing = req.body.onGoing,
          reporttool.dateStart = req.body.dateStart,
          reporttool.author = req.body.author,
          reporttool.save(function(err, reporttool) {

            if (err) {
              sendJSONresponse(res, 404, err);
            } else {
              console.log("Updated Records", reporttool)
              sendJSONresponse(res, 200, reporttool);
            }
          });
        }
    );
  };

module.exports.newReportComment = function(req, res) {
  console.log(req.body,"1 check");
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
      Reporttool.reportToolComments.push({
        commentText: req.body.commentText,
        author: req.body.author
      });
      Reporttool.save(function(err, Reporttool) {
        var thisComment;
        if (err) {
          sendJSONresponse(res, 400, err);
        } else {
          thisComment = Reporttool.reportToolComments[Reporttool.reportToolComments.length - 1];
          sendJSONresponse(res, 201, thisComment);
        }
      });
    }
  };

module.exports.reportCommentUpdate = function(req, res) {
  if (!req.params.reportID || !req.params.repcommentID) {
    sendJSONresponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
    return;
  }
  rT
    .findById(req.params.reportID)
    .select('reportToolComments')
    .exec(
      function(err, reporttool) {
        var thisComment;
        if (!reporttool) {
          sendJSONresponse(res, 404, {
            "message": "Report ID not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (reporttool.reportToolComments && reporttool.reportToolComments.length > 0) {
          thisComment = location.reviews.id(req.params.reviewid);
          if (!thisComment) {
            sendJSONresponse(res, 404, {
              "message": "reviewid not found"
            });
          } else {
            thisComment.author = req.body.author;
            thisComment.rating = req.body.rating;
            thisReview.reviewText = req.body.reviewText;
            thisComment.save(function(err, location) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                updateAverageRating(location._id);
                sendJSONresponse(res, 200, thisReview);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No comment to update"
          });
        }
      }
  );
};

module.exports.reportCommentDeleteOne = function(req, res) {};

module.exports.reportDeleteOne = function(req, res) {};