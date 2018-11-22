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
module.exports.learninghubByCreatedDate = function(req, res) {
  console.log('Finding all learninghub entries Ordered by date')
    list = buildLearninghubList(req, res)
    console.log()
    sendJSONresponse(res, 201, list);
};

// This needs to be amended to only search for using
var buildLearninghubList = function(req, res) {
  var lhEntries = [];
    lh.find(-
    {
    lhEntries.push({
      Name: doc.hubentryName,
      disasterType: doc.disasterType,
      articleType: doc.articleType,
      createdDate: doc.createdOn,
      hubtext: doc.hubtext,
      _id: doc._id,
      continent: doc.relatedContinent
    });
  });
  return lhEntries;
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

module.exports.learninghubReadbyCD = function (req, res){
};
module.exports.learninghubUpdateOne = function (req, res){};
module.exports.learninghubDeleteOne = function (req, res){};
