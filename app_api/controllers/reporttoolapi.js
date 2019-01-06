var mongoose = require('mongoose');
var rT = mongoose.model('reporttool');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.search = function(req, res ) {
  if (!req.params.searchid) {
      console.log("No Search params given")
      sendJSONresponse(res, 404, {
        "message": "No search params Given"
    });
  };
  console.log("Finding record from chars " + req.params.searchid);
    rT
      .find({ "reportName": { "$regex": req.params.searchid, "$options": "i" }})
      .sort([['reportName', 1]])
      .exec(function(err, reporttool) {
        if (!reporttool)  {
          sendJSONresponse(res, 404, {
            "message": "No report not found"
          });
          return;

        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        else if (reporttool.length >=1) {
        console.log("Reports found" + reporttool);
        sendJSONresponse(res, 200, reporttool);
        return;

        };
        console.log("Error" + reporttool);
        sendJSONresponse(res, 404, {
          "message": "Error in request"
      });
    });
  };

// function to get single users
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

module.exports.reportCount = function(req, res) {
  console.log("Finding a count of all the reports so far")
  rT
    .find()
    .countDocuments()
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
        createdOn: req.body.createdOn,
        contactDetails: req.body.contactDetails,
        Open: false,
        country: req.body.country,
        address: req.body.address,
        },
        function(err, reporttool) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
          } else {
            console.log(reporttool);
            sendJSONresponse(res, 201, reporttool);
            return;
            
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
          reporttool.country = req.body.country,
          reporttool.Open = req.body.open,
          reporttool.address = req.body.address,
          reporttool.contactDetails = req.body.contactDetails,
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

// not quite working 
module.exports.reportCommentUpdate = function(req, res) {
  if (!req.params.reportID || !req.params.repcommentID) 
    sendJSONresponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
    else {
    var r = req.params.reportID;
    var c = req.params.repcommentID;
  }
  rT
    .findOneAndUpdate(
    {
        '_id': r,
        'reportToolComments': {
          '$elemMatch': { // <------- use $elemMatch
            '_id': c,
          }
        }
    },
    {
        '$set': {
            'reportToolComments.author': req.body.author,
            'reportToolComments.commentText': req.body.commentText,
        }
    },
    {
        'upsert': false,
        'new': false
    },
    function (err, res) {
      if(err)
      {
        console.log(err)
      }
      else 
      console.log(res)
    });
  }


module.exports.newResponse = function(req, res) {
  if(req.params.reportID) {
    console.log()
    rT
      .findById(req.params.reportID)
      .select('reportToolResponses')
      .exec(function(err, reporttool) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            console.log(reporttool)
            doAddResponse(req, res, reporttool);
          }
        }
    );
  } else {
      sendJSONresponse(res, 404, {
        "message": "Not happenin, LH ID required"
      });
    }
  };

var doAddResponse = function(req, res, Reporttool, author) {
  if (!Reporttool) {
    sendJSONresponse(res, 404, "RT ID aint about" + Reporttool);
  } else {
    Reporttool.reportToolResponse.push({
      responseSent: req.body.responseSent,
      userEmails: req.body.userEmails,
    });
    Reporttool.markModified('Reporttool');
    Reporttool.save(function(err, Reporttool) {
      var thisResponse;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        thisResponse = Reporttool.reportToolResponse[Reporttool.reportToolResponse.length - 1];
        sendJSONresponse(res, 201, thisResponse);
      }
    });
  }
};




module.exports.reportCommentDeleteOne = function(req, res) {};

module.exports.reportDeleteOne = function(req, res) {};