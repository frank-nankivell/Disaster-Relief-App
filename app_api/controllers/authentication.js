var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var rT = mongoose.model('reportTool');
var global = require('./global.js');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

module.exports.register = function(req, res) {
    if(!req.body.name || !req.body.email || !req.body.password) {
      sendJSONresponse(res, 400, {
        "message": "All fields required"
      });
      return;
    }
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.country = req.body.country;
    user.setPassword(req.body.password);
    user.save(function(err) {
      var token;
      if (err) {
        sendJSONresponse(res, 404, err);
      } else {
        token = user.generateJwt();
        sendJSONresponse(res, 200, {
          "token" : token
        });
      }
    });
  };
  
  module.exports.login = function(req, res) {
    if(!req.body.email || !req.body.password) {
      sendJSONresponse(res, 400, {
        "message": "All fields required"
      });
      return;
    }
    passport.authenticate('local', function(err, user, info){
      var token;
      if (err) {
        sendJSONresponse(res, 404, err);
        return;
      }
  
      if(user){
      // checkCountryReport(req, res, user) Removed to the API call for logging in
        token = user.generateJwt();
        sendJSONresponse(res, 200, {
          "token" : token
        });
      } else {
        sendJSONresponse(res, 401, info);

      }
    })(req, res);
  
  };

  // Query that checks and returns a report
  // 1) Report is currently still active
  // 2) The country matches that of the user logging In
module.exports.checkUserOnCountry = function(req, res) {
    if(!req.body) {
    console.log(err)
      sendJSONresponse(res, 400, err)
    } else {
  var userCountry = req.body.country;
  console.log("Finding all Open reports that match user countr")
  rT
    .find({'Open':true,'country':userCountry})
    .sort([['createdOn', 1]])
  //  .countDocuments()
    .exec(function(err, reporttool) {
      if (err) {
        console.log(err, "no values found");
      } else {
        console.log(reporttool);
        sendJSONresponse(res, 200, reporttool)
      }
    }
  );
};
};

// Function to find all Users 
module.exports.checkCountryOnUser = function(req, res) {
  if(!req.params.countryID){
    console.log( "no country ID to check given")
    sendJSONresponse(res, 400, req)
  } else {
  var checkCountry = req.params.countryID;
  console.log("Finding all users that match country submitted")
  User
    .find({'country':checkCountry})
    .exec(function(err, userOuput) {
      if (err) {
        console.log(err, "no values found");
      } else {
        console.log(userOuput);
        sendJSONresponse(res, 200, userOuput)
      }
    }
  );
};
};


module.exports.login = function(req, res) { };
