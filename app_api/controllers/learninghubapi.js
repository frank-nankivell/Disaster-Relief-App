var mongoose = require('mongoose');
var lh = mongoose.model('Learninghub');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.learninghubByCreatedDate = function (req, res){};

module.exports.learninghubCreate = function (req, res) {
    console.log(req.body);
    lh.create({
      hubentryName: req.body.hubentryName,
      articleType: req.body.articleType,
      disasterType: req.body.disasterType,
      hubtext: req.body.hubtext
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

module.exports.learninghubReadAll = function (req, res){
};

module.exports.learninghubReadOne = function(req, res) {
  console.log('Finding Learninghub details', req.params);
  if (req.params && req.params.learninghubid) {
    lh
      .findById(req.params.learninghubid)
      .exec(function(err, learninghub) {
        if (!learninghub) {
          sendJSONresponse(res, 404, {
            "message": "learninghubid not found"
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
    console.log('No learninghubid specified');
    sendJSONresponse(res, 404, {
      "message": "No learninghubid in request"
    });
  }
};

module.exports.learninghubUpdateOne = function (req, res){};
module.exports.learninghubDeleteOne = function (req, res){};
