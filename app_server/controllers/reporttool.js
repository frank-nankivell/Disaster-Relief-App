var request =  require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "";
}

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Cannot find page";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "Issue with server";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('ERRROR', {
    title : title,
    content : content
  });
};


// home for the report tool
module.exports.home = function(req, res) {
  var mapKey = process.env.FRANKS_MAP_API_KEY;
  res.render('reporttool/reporttool', 
  {title: 'Report A Disaster Here', 
  info: "If you have been affected by a disaster please enter information below. Your response will be captured immediately.",
  a: mapKey
  });
};

module.exports.info = function(req, res) {
  res.render('reporttool/reporttoolinfo', {title: 'Find Information about a disaster here'});
};

module.exports.select = function(req, res) {
  getReportool(req, res, output)
  res.rendeer
};


var getReporttool = function (req, res, callback) {
   var requestOptions, path;
  path = "/api/reporttool" + req;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      if (response.statusCode === 200) {
        callback(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

module.exports.new = function(req, res) {
  console.log(req.body.latlng)
  console.log("Posting Report to API")
    var requestOptions, path, postdata;
    path = "/api/reporttool/new";
    postdata = {
      reportName: req.body.reportName,
      img: req.body.img,
      latlng : req.body.latlng,
      disasterType: req.body.disasterType,
      reporterNeeds: req.body.reporterNeeds,
      noPeopleAffected: req.body.noPeopleAffected,
      instantDanger: req.body.instantDanger,
      dateStart: req.body.dateStart,
      author: req.body.author
    };
    requestOptions = {
      // need to amend below for production
      url : apiOptions.server + path,
      method : "POST",
      json : postdata
    };
    if (!postdata.reportName || !postdata.disasterType || !postdata.reporterNeeds) {
        res.redirect('/reporttool/?err=val');
    } else {
      request(
        requestOptions,
        function(err, response, body) {
          if (err) {
            console.log(err)
          }
          // need to add exception handlong for when DB is offline
          if (response.statusCode === 201) {
            val = body._id;
            getReporttool(val, res, function(req, res, data) {
            renderThanksForm(req, res, data);
           });
            console.log("posted succesfully")
          } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
            res.redirect('/reporttool/?err=val');
            console.log(response.statusCode);
          } else {
            console.log(body);
            _showError(req, res, response.statusCode);
          }
        }
      );
    };
  };
  var renderThanksForm = function(req, res, detail) {
    res.render('reporttool/thanks', {
      title: 'Thankyou for submitting your entry ',
      data: detail
     // error: req.query.err
    });
  };