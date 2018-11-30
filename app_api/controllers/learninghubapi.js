var mongoose = require('mongoose');
var lh = mongoose.model('Learninghub');
//var testdata = require('./testData/dump.json');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.learninghubGet = function(req, res) {
  console.log("Find me a Learninghub... Entry", req.params);
  if(req.params && req.params.learninghubid) {
    lh
      .findById(req.params.learninghubid)
      .exec(function(err, learninghub) {
        if (!learninghub) {
          sendJSONresponse(res, 404, {
            "message": "No record with ID FOUND"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(learninghub);
        sendJSONresponse(res, 200, learninghub);
      });
  } else {
    console.log('No ID Given');
    sendJSONresponse(res, 404, {
      "message": "No ID in request"
    });
  }
};

// Search by Date - Provides list of all values ordered by date
// This needs to be amended to only search for using .Find()
module.exports.learninghubByCreatedDate = function(req, res) {
    lh.find().sort([['createdOn', 1]]).exec(function(err, learninghub) {
        if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
        } else {
          console.log(learninghub);
          sendJSONresponse(res, 201, learninghub);
        }
      }
    );
};

//to create a record within mongoDB
module.exports.learninghubCreate = function (req, res) {
    console.log(req.body);
    lh.create({
      hubentryName: req.body.hubentryName,
      articleType: req.body.articleType,
      disasterType: req.body.disasterType,
      relatedContient: req.body.relatedContient,
      createdOn: '',
      author: req.body.author,
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
  }

  module.exports.learninghubComment = function (req, res) {
    var x = req.params.learninghubid
    console.log(x +"check")
    if(req.params.learninghubid) {
      console.log()
      lh
        .findById(req.params.learninghubid)
        .select('comment')
        .exec(function(err, learninghub) {
            if (err) {
              sendJSONresponse(res, 400, err);
            } else {
              console.log(learninghub)
              doAddComment(req, res, learninghub);
            }
          }
      );
    } else {
        sendJSONresponse(res, 404, {
          "message": "Not happenin, LH ID required"
        });
      }
    };


    var doAddComment = function(req, res, learninghub) {
      if (!learninghub) {
        sendJSONresponse(res, 404, "LH ID aint about" + learninghub);
      } else {
        learninghub.comment.push({
          commentText: req.body.commentText,
          author: req.body.author
        });
        learninghub.save(function(err, learninghub) {
          var thisComment;
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            thisComment = learninghub.comment[learninghub.comment.length - 1];
            sendJSONresponse(res, 201, thisComment);
          }
        });
      }
    };
    module.exports.learninghubCreate = function (req, res) {
      console.log(req.body);
      lh.create({
        hubentryName: req.body.hubentryName,
        articleType: req.body.articleType,
        disasterType: req.body.disasterType,
        relatedContient: req.body.relatedContient,
        createdOn: '',
        author: req.body.author,
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
    };

module.exports.learninghubReadbyCD = function (req, res){
};
module.exports.learninghubUpdateOne = function (req, res){};
module.exports.learninghubDeleteOne = function (req, res){};
