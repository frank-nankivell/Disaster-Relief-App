var mongoose = require('mongoose');
var User = mongoose.model('User');
var rT = mongoose.model('reporttool');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };


  var userReportCheck = function(req, res, report, callback) {
    var repCountry = report.country;
    console.log("pulling all Users who have the same entry as new report")
    if(!user) {
      console.log(err)
    } else {
    User
      .find({'country':repCountry})
      .exec(function(err, reporttool) {
        if (err) {
          console.log(err, "no values found");
        } else {
          console.log(reporttool);
        }
      }
    );
  };
};
