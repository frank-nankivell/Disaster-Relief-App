var mongoose = require('mongoose');
var Loc = mongoose.model('lhdata');


module.exports.learninghubByCreatedDate = function (req, res){};

module.exports.learninghubCreate = function (req, res) {
  res.status(200);
  res.json({"status" : "great"});
//  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.learninghubReadAll = function (req, res){

};
module.exports.learninghubReadOne = function (req, res){};
module.exports.learninghubUpdateOne = function (req, res){};
module.exports.learninghubDeleteOne = function (req, res){};

var sendJsonResponse = function(req, status, content) {
  res.status(status);
  res.json(content);
};
