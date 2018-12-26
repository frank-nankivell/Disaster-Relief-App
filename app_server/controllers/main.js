var request =  require('request');
var localserver = 'http://localhost:3000';

/* home page */
module.exports.main = function(req, res) {
  renderMain(req, res)
};

var renderMain = function(req, res, status) {
  x = getImage;
  res.render('main/home', {
    title: 'home',
    info: 'RescApp is a Global online community of people helping you or wanting to help others in need',
    community: 'To access your local community please login or, in an emergency you can report a disaster now',
    urlReg: 'login-register/reg',
    urlLog: 'login-register/log',
    Status: status,
    val: x
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
  res.render('login-register', {});
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
      url : localserver + path,
      method : "POST",
      json : postdata
    };
    if(!req.body.email || !req.body.password || req.body.name || req.body.country) {
      res.redirect('/login-register/new?err=val');
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
          res.redirect('/');
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/login-register/new?err=val');
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
  var a = req.name && console.log(a);
  var requestOptions, path, postdata;
    path = "/api/register";
    postdata = {
      name: req.body.name, 
      email: req.body.email,
      password: req.body.password,
      country: req.body.country
    };
    requestOptions = {
      url : localserver + path,
      method : "POST",
      json : postdata
    };
    if(!req.body.email || !req.body.password || !req.body.name || !req.body.country) {
      res.redirect('/login-register/new?err=val');
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
          var x = "Registered";
          renderMain(req, res, x);
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/login-register/new?err=val');
          console.log(response.statusCode);
        } else {
          console.log(body);
          _showError(req, res, response.statusCode);
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



