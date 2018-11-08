//var mongoose = require('mongoose');
//var lh = mongoose.model('Learninghub');
var testdata = require('./testData/dump.json');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};



// Search by Date - Provides list of all values ordered by date
module.exports.learninghubByCreatedDate = function(req, res) {
  console.log('Finding all learninghub entries Ordered by date')
    var data = testdata;
    list = buildLearninghubList(req, res, data)
    console.log()
    sendJSONresponse(res, 201, list);
};

var buildLearninghubList = function(req, res, x) {
  var lhEntries = [];
    x.forEach(function(doc)
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

// If using a DB would just use .findBy() rather than this longer approach
module.exports.learninghubReadOne = function(req, res) {
}

var buildLearingHubOutput = function(req, res) {
    var output;
      x.forEach(function(doc)
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
    testdata.create({
      hubentryName: req.body.hubentryName,
      articleType: req.body.articleType,
      disasterType: req.body.disasterType,
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
