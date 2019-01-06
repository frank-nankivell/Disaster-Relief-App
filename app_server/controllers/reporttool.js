var request =  require('request');
var nodemailer = require('nodemailer');
var mapKey = process.env.FRANKS_MAP_API_KEY;
var gmailPass = process.env.GMAIL_PASS;
var async = require('async')
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

// function to get url for disaster icons
var getDisasterIcon = function(input) {
  if(!input)
  {
    _showError(input, "error", 404)
    console.log("no input provided")
  };
  console.log('input check', input)
  theIcons = {
  'Drought': '/images/icons/drought_icon1.png',
  'Earthquake' : '/images/icons/earthquake_icon1.png',
  'Flood' : '/images/icons/flood_icon1.png',
  'Forest Fire' : '/images/icons/forestFire_icon1.png',
  'Landslide' : '/images/icons/landslide_icon1.png',
  'Other' : '/images/icons/other_icon1.png',
  'Storm' : '/images/icons/typhoon_icon1.png',
  'Volcanic Eruption' : '/images/icons/volcano_icon1.png',
  'Lightning' : '',
  'N/A': 'images/icons/other_icon1.png'
  };
  if (theIcons.hasOwnProperty(input)) {
  y = theIcons[input];
  console.log(y, 'icon path');
  } else {
    console.log("Wrong value passed to function")
   raise(error);
  }
  return y;
};

// function for the report tool
module.exports.home = function(req, res) {
  res.render('reporttool/reporttool', 
  {title: 'Report A Disaster Here', 
  info: "If you have been affected by a disaster please enter information below. Your response will be captured immediately.",
  a: mapKey,
  error: req.query.err,
  url: req.originalUrl
  });
};

module.exports.info = function(req, res) {
  renderInfo(req, res)
};

var renderInfo = function(req, res, data) {
  data = 'val';
  if (data== undefined) {
    data='';
  };
  res.render('reporttool/reporttoolinfo', 
  {
    title: 'Search for an existing report here',
    input: data,
    error: req.query.err,
    url: req.originalUrl
  });
};

module.exports.select = function(req, res) {};

var authenticateUser = function(req, res, callback) {

  var requestOptions, path, postdata;
  postdata = {
    email: req.body.email,
    password:req.body.password,
  };
  path = "/api/login";
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata,
  };
  request(
    requestOptions,
    function(err, response, body) {
      if (response.statusCode === 200 || response.statusCode === 201) {
        console.log(response.statusCode,'code') // To manage two response codes
        callback(req, res, body)
        return;

      };
        console.log(err,'Error, User Not validated')
        console.log(response.statusCode,'code')
        res.redirect('/reporttool/info?err=auth');
        return;
      });
    };


var authRedirect = function(req, res) {
  res.render('/reporttool/info?err=val');
};
// Search for a specific entry 
module.exports.search = function(req, res) {
  // Validation to ensure search entry provided
  if(!req.body.search || !req.body.email  ||!req.body.password)  {
    res.redirect('/reporttool/info?err=val');
    console.log('Incorrect values entered')
  } else {
  authenticateUser(req, res, function(req, res, body) {

    reportSearch(req, res, body, function(req, res, body) {

      renderList(req, res, body, function(req, res, body) {
        console.log('values rendered', body)

        });
        return;

      });
      return;

    });
    return;
  };
  return;
};


var reportSearch = function(req, res, body, callback) {
  if(body.token) {
    var requestOptions, path;
    path = "/api/reporttool/search" + req;
    requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {}
    };
    request(
      requestOptions,
      function(err, response, body) {
        var data = body;
        if (response.statusCode === 200 || response.statusCode === 201) { // To manage two response codes
          callback(req, res, body)
          return;

          } else {
          console.log(err, 'Error')
          callback(req, res, body);
          return;
        };
      }
    );
  };
};

// render API call for list view 
module.exports.list = function(req, res) {
  var requestOptions, path;
  path = "/api/reporttool/date";
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      if (response.statusCode === 200 || response.statusCode === 201) { // To manage two response codes
     //   renderList(req, res, data)
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

// function to render list view 
var renderList = function(req, res, detail) {
  var string = JSON.stringify(detail)
  res.render('reporttool/reporttoolList', {
    title: 'Selected entries are below ',
    info: 'Please review the item you were searching for',
    a: mapKey, // Map key for google MAPS API
    data: detail, 
   error: req.query.err
  });
  return;
};

// Method to check if logged in user and get coords to centre the map on 
var getUsersCoords = function(req, res, coords) {};

// Method to parse through data and only return data 
var getUsersValues = function(req, res, coords) {};


var getAllreports = function(req, res, callback) {
  var requestOptions, path;
  path = "/api/reporttool/date";
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      if (response.statusCode === 200 || response.statusCode === 201) {
        callback(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

// function to get single report tool back
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
        body.coords = {
          lng : data.coords[0],
          lat : data.coords[1]
        };
        callback(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};


// Function to create random coded name string for provenance
// Rather than have users manually enter
// Function to post new report to API
module.exports.new = function(req, res, callback) {
  if (!req.body.lat || !req.body.lng  || !req.body.disasterType || !req.body.author || !req.body.noPeopleAffected ||!req.body.dateStart ||!req.body.contactDetails) {
    res.redirect('/reporttool/?err=val');
  } else {
  getReportNumber(req, res, function(req, res, data) {

    postNew(req, res, data, function(req, res, body) {
      var id = body._id
      console.log('testing id', id);

      getReporttool(id, res, function(req, res, data2) {

        renderThanksForm(data2, res, function(req, res, country) {
          console.log(country);

          validateOnUsers(country, res, function(req, res, users) {

            sendMailFunction(body, res, users, function(req, res, number) {
              console.log('number of users informed has been', number)

            });
            return;

          });
          return;
        });
        return;
      });
      return;
    });
    return;
  });
  return;
};

};


// Validation post to ensure that the record is as it should be 
module.exports.val = function(req, res, callback) {};
  // function to get single report tool back
var getReportNumber = function (req, res, callback) {
  var requestOptions, path;
 path = "/api/reporttool/num";
 requestOptions = {
   url : apiOptions.server + path,
   method : "GET",
   json : {}
 };
 request(
   requestOptions,
   function(err, response, body) {
     if (response.statusCode === 200 || response.statusCode === 201) {
       var code, oo;
       oo = 'REP.v1000'; // Version 1 of code creator
       code = oo + body; 
       callback(req, res, code);
       return;
     } else {
       _showError(req, res, response.statusCode);
       return;
     }
   }
 );
 return;
};

var postNew = function(req, res, name, callback) {
  console.log(name, "check")
  var today = new Date;
  console.log("Posting Report to API")
    var requestOptions, path, postdata;
    path = "/api/reporttool/new";
    postdata = {
      reportName: name,
      img: req.body.img,
      lat : req.body.lat,
      lng: req.body.lng,
      disasterType: req.body.disasterType,
      reporterNeeds: req.body.reporterNeeds,
      noPeopleAffected: req.body.noPeopleAffected,
      instantDanger: req.body.instantDanger,
      dateStart: req.body.dateStart,
      author: req.body.author,
      country: req.body.country, 
      createdOn: today,
      contactDetails: req.body.contactDetails,
      address: req.body.address,
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

          if (response.statusCode === 201) {
            console.log("posted succesfully")
            callback(req, res, body);
          } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
            res.redirect('/reporttool/?err=val');
            console.log(response.statusCode);
          } else {
            console.log(body);
            _showError(req, res, response.statusCode);
            return;
          }
        }
      );
    };
  };

// Function to render thanks form
var renderThanksForm = function(req, res, callback) {

  if(!req.disasterType || !req.reportName) {
    console.log(req.disasterType);
    _showError(req, res, res.statusCode);
    console.log(res.statusCode, 'Error with rendering thanks form');
    return;
  };

  var disType, icon, country;
  country = req.country;
  disType = req.disasterType;
  icon = getDisasterIcon(disType);

  console.log('Rendering thanks form with icon link:', icon)

  res.render('reporttool/thanks', {
    title: 'The report case is now open',
    info:  'You can close the case once the community has supported you and your needs',
    code: 'Report Code: ',
    icon: icon,
    countrySend: JSON.stringify(req.country),
    a: mapKey,
    data: req,
  });

  callback(req, res, country)
  return;
};

module.exports.commentNew = function(req, res) {
  if(!req.body.commentText || !req.params.reportID || !req.body.author) {
    res.redirect('.reporttool/')
    console.log('No Values Entered for comment');
  };
  var requestOptions, path;
    path = "/api/reporttool" + req.params.reportID + '/comment';
     requestOptions = {
       url : apiOptions.server + path,
       method : "GET",
       json : {}
     };
     request(
       requestOptions,
       function(err, response, body) {
         var data = body;
         if(response.statusCode === 200) {
          console.log(body);
          renderList(req, res, body); 
          return;
         };
        _showError(req, res, response.statusCode);
        return;
    });
  };



/* Gets list of User who have the same country as the request that has just been made */
  var validateOnUsers = function(req, res, callback) {
    var requestOptions, path;
    path = "/api/user/country" + req;
     requestOptions = {
       url : apiOptions.server + path,
       method : "GET",
       json : {}
     };
     request(
       requestOptions,
       function(err, response, body) {
         var data = body;
         if(response.statusCode === 200) {
          console.log(body);
          callback(req, res, body); 
          return;
         };
        _showError(req, res, response.statusCode);
        return;
    });
  };



var sendMailFunction = function(req, res, users, callback) {
  if(!users.email)
    { console.log('error'); };

// Loop through list of users to send emails 
  var totalEmails = 0;
  for (var a in users) {

    console.log(users[a].email, 'email of user who is  being emailed about report');

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rescueappinternational@gmail.com',
          pass: gmailPass
        }
      });

      var mailOptions = {
        from: 'rescueappinternational@gmail.com',
        to: users[a].email,
        subject: 'Report has been created:'+ req.reportName,
        text: 'A new report has been created in the area of: '+ req.country +' to get to this report please go to',
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {

          console.log(error);
        } else {

          console.log('Email sent: ' + info.response + users[a].email);
          totalEmails+1;

          }
        });
      };
 
      callback(req,res, totalEmails)
      return;

  };





