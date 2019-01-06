var request =  require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://secret-sands-46525.herokuapp.com/";
}

/* home page */
module.exports.main = function(req, res,) {
  renderMain(req, res)
};


var renderMain = function(req, res) {
  if (req.status == undefined)
  {
    req.status = "";
  }
  console.log(req.status, 'test test test')
  res.render('main/home', {
    title: 'home',
    info: 'RescApp is a Global online community of people helping others in need.',
    community: 'You can pledge support to local community members by registering now, or report a disaster if you are in need.',
    urlReg: 'signup',
    urlLog: 'signup',
    number: '5',
    status: req.status,
  });
};

// To load home page image
var getImage = function(req, res) {
  return "images/logo-rescapp.001.jpeg";
}

// to provide status back on registere
var getRegStatus = function(req) {
  return 'Registered';
}
// login/Registration page 
module.exports.loginRegister = function(req, res) {
  if (req.status == undefined)
  {
    req.status = "Not registered";
  }
  res.render('signup', {
    status: req.status,
    error: req.query.err,
    complete: req.query.com,
  });
};

module.exports.login = function(req, res) {
  var a = req.name && console.log(a);
  var requestOptions, path, postdata;
    path = "/api/login";
    postdata = {
      email: req.body.email,
      password: req.body.password
    };
    requestOptions = {
      url : apiOptions.server + path,
      method : "POST",
      json : postdata
    };
    if(!req.body.email || !req.body.password || req.body.name || req.body.country) {
      res.redirect('/signup/?err=val');
      (err) && console.log(err);
    }
    else {
    request(
      requestOptions,
      function(err, response, body) {
        if (err) {
          console.log(err)
        } if (response.statusCode === 200) {
          console.log(body, "request success")
          res.redirect('/signup/complete=val');
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/signup/?err=val');
          console.log(response.statusCode);
        } else {
          console.log(body);
          _showError(req, res, response.statusCode);
        }
        }
       );
    };
  };

module.exports.registerNew = function(req, res) {
  console.log(req.body)
  var requestOptions, path, postdata;
    path = "/api/register";
    postdata = {
      name: req.body.fullname, 
      email: req.body.email,
      password: req.body.password,
      country: req.body.country,
      skills: req.body.skills,
      otherSkill: req.body.otherSkill,
      accessToTransport: req.body.accessToTransport,
      willingToTravel: req.body.willingToTravel,
    };
    requestOptions = {
      url : apiOptions.server + path,
      method : "POST",
      json : postdata
    };

    if(!req.body.email || !req.body.password || !req.body.fullname || !req.body.country || !req.body.skills || !req.body.accessToTransport ) {
      res.redirect('/signup/?err=val');
      (err) && console.log(err);
      return;
    }
    else {
    request(
      requestOptions,
      function(err, response, body) {
        if (err) {
          console.log(err)
        } if (response.statusCode === 200) {
          console.log(body, "request success")
          res.redirect('/signup/?com=val')
          
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/signup/?err=val');
          console.log('ERROR 2')
          console.log(response.statusCode);
          
        } else if (response.statusCode === 404 && body.name === 'MongoError') {
          res.redirect('/signup/?err=dup');
          console.log('ERROR 3')
          return;

        } else {
        
        console.log(body);
        _showError(req, res, response.statusCode);
        console.log('ERROR 3')
        } 
        }
       );
    };
};

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

module.exports.registerAbout = function(req, res) {
  res.render('signup-about');

};
