var request =  require('request');
var nodemailer = require('nodemailer');
var mapKey = process.env.FRANKS_MAP_API_KEY;
var gmailPass = process.env.GMAIL_PASS;
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
  var y, theIcons;
  theIcons = {
  'Drought': '/images/icons/drought_icon1.png',
  'Earthquake' : '/images/icons/earthquake_icon1.png',
  'Flood' : '/images/icons/flood_icon1.png',
  'Forest Fire' : '/images/icons/forestFire_icon1.png',
  'Landslide' : '/images/icons/landslide_icon1.png',
  'Other' : '/images/icons/other_icon1.png',
  'Storm' : '/images/icons/typhoon_icon1.png',
  'Volcanic Eruption' : '/images/icons/volcano_icon1.png',
  'Lightning' : ''
  };
  if (theIcons.hasOwnProperty(input)) {
  y = theIcons[input];
  console.log(y);
  } else {
    console.log("wrong value")
    _showError(req, res, y);
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
  res.render('reporttool/reporttoolinfo', {title: 'Find Information about a disaster here'});
};

module.exports.select = function(req, res) {};


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
        renderList(req, res, data)
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

// function to render list view 
var renderList = function(req, res, detail) {
  var mapcoords = detail.map(function(elem) {
    return {
      coords: elem.coords
    }
  }); 
  // test data 
  var testcoords = { coords: [ 148.717556, -20.272325 ] };
  var b = JSON.stringify(mapcoords)
  console.log(mapcoords, "coords")
  getUsersCoords(req, res) // Method to get user coords to centre map
  res.render('reporttool/reporttool-list', {
    title: 'Thankyou for submitting your entry ',
    userLat: '39.826168', // Test data for now
    userLng: '21.422510', // Test data for now
    a: mapKey, // Map key for google MAPS API
    data: b, // Data pushed to front as String
   error: req.query.err
  });
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
        callback(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

// Function to create random coded name string for provenance
// Rather than have users manually enter
var createName = function(req, res, callback) {
  var dis, date, mm, today, name, ran;
  today = new Date;
  ran = Math.floor((Math.random() * 100) + 1);
  mm = today.toLocaleString('en-us', { month: 'long' });; // Takes current month
  dis = (req.body.disasterType).substring(0,3); // Takes first three letters of disaster type
  date = (req.body.dateStart).substring(0,8); // Takes month and year of date start
  name = ((dis.concat(date)).concat(mm)).concat(ran);
    console.log("below")
    console.log(name)
    return name;
};

// Function to post new report to API
module.exports.new = function(req, res, callback) {
  var today = new Date;
  var name = createName(req, res);
  console.log(name, "name")
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
      country: 'Belarus', // test data for now
      createdOn: today,
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
            // Need some exceptions here
            renderThanksForm(req, res, data);
            const country = data.country;
            validateOnUsers(country, res, callback);
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
          bigmailFunction();
         };
         callback(req, res, data); {
          _showError(req, res, response.statusCode);
      }
    }
  );
};


// Function to render thanks form
  var renderThanksForm = function(req, res, detail) {
    var repStatus, x, y;
    if(detail.Open== true)
    {
      repStatus = 'Open'
    }
    x = detail.disasterType; 
    y = getDisasterIcon(x);
    res.render('reporttool/thanks', {
      title: 'Your report case is now open',
      info:  'You can close the case once the community has supported you and your needs',
      status: repStatus,
      icon: y,
      a: mapKey,
      data: detail,
     // error: req.query.err,
    });
  };


var bigmailFunction = function(req, res, data){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rescueappinternational@gmail.com',
      pass: gmailPass
    }
  });

  var mailOptions = {
    from: 'rescueappinternational@gmail.com',
    to: 'franknankivell@gmail.com',
    subject: 'RescueApp report',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    });
};