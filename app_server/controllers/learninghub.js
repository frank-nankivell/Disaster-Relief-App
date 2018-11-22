var request =  require('request');
var localserver = "http:///localhost:3000";
var tbc = 'Page coming soon...';

// Variable of the render learninghub list //
var renderLearninghublist = function(req, res, responseBody) {
  var obj = responseBody;
 // var obj = JSON.parse(responseBody)
  res.render('learninghubList', {
    title: 'List of Learning hub entries thus far',
    info: 'Below you find a list of entries that have been entered this far',
    thoughts: 'What do you think of what has been written so far?',
    inputidea: '...Why dont you create youre own today',
    header1: "The Article Type is ",
    header2: "The Disaster Type ",
    header3: "Related Continent  ",
    date: " Created Date",
    data: obj
  });
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
  res.render('generic-text', {
    title : title,
    content : content
  });
};

// list page for the learning hub //
module.exports.list = function(req, res ) {
  var requestOptions;
  requestOptions = {
    url : 'http://localhost:3000/api/learninghub/list/date',
    method :'GET',
    json : '',
    qs: ''
  };
  request (
    requestOptions,
    function (err, response, body) {
      renderLearninghublist(req, res, body)
    }
  );
};

// home page and info
var renderlearninghome = function(req, res, samplebody)  {
 // var obj = JSON.parse(samplebody)
    var obj = samplebody;
  res.render('learninghub', {
    title: 'The Learning Hub',
    Qinfo: 'What is the learning hub for, why am I here?',
    info: 'The Learning Hub is a space for users to post, search and find ways to save yourself from a future disaster!',
    sampleinfo: 'Check out an example entry below...',
    listinfo:'...However if you want to view all current entires then you can also do that',
    inputinfo: 'or more importantly... its  a space for you to contribute to the community and make articles, and ask questions of your own',
    name: 'Sample Entry on Forrest Fires',
    artType: 'Sample Entry',
    disType: "Forrest Fire",
    text: "Don't get burnt in a fire",
    date: "2018-05-10",
    continent: "Europe",
    api_KEY: 'AIzaSyDeZhtVpwaxLEb0AMw-tHtQvNgVvy9HWbU',
    data: obj

  });
};

// for getting a single learninghub by ID
var getLearninghub = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/learninghub/" + req.params.locationid;
  requestOptions = {
    url : localserver + path,
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


var getRecentLearninghub = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/learninghub/" + req.params.locationid;
  requestOptions = {
    url : localserver + path,
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


// Work in progress
var renderImageLocation = function(req, res, continent) {
  var latitude, longitude;
  if (continent == '')
  {
    return ''
  }
  else{
    if(continent == 'Europe') {
      latitude = '49.368876'
      longitude = '11.768920'
    }
    else latitude = '', longitude = '';
  }
  return latitude, longitude;
  console.log('print this'+ latitude, longitude)
}

// comment page for the learning hub
module.exports.comment = function(req, res) {
  res.render('learninghub', {title: 'Comments',tbc});
};



module.exports.home = function(req, res) {
  var requestOptions;
  requestOptions = {
    url : 'http://localhost:3000/api/learninghub/list/date',
    method :'GET',
    json : '',
    qs: ''
  };
  request (
    requestOptions,
    function (err, response, body) {
      renderlearninghome(req, res, body)
    }
  );
};

var renderCreate = function(req, res) {
  res.render('learninghubNew',{
    title: 'Upload a new Hub Entry',
    error: req.query.err,
    url: req.originalUrl
  });
}

module.exports.new = function(req, res) {
  renderCreate(req,res)
};

module.exports.newAdd = function(req, res) {
  console.log('Posting add to DB')
  var requestOptions, path, postdata;
  locationid = req.params.locationid;
  // path = "/api/learninghub/new" + lhid;
  postdata = {
    hubentryName: req.body.hubentryName,
    articleType: req.body.articleType,
    disasterType: req.body.disasterType,
    relatedContinent: req.body.relatedContinent,
    author: req.body.author,
    hubtext: req.body.hubtext
  };
  requestOptions = {
    // need to amend below for production
    url : 'localhost:3000/api/learninghub/new',
    method : "POST",
    json : postdata
  };
  console.log(postdata),
    request(
      requestOptions,
        function(err, response, body) {
        });
      };

// This would ideally be rendered from the create 
module.exports.thanks = function(req, res, x) {
  var input, obj;
  input = x;
  getLearninghub(input, res, data)
  res.render('learninghubthanks', {
    title: 'Thankyou for submitting your entry',
    info: 'further functionality not in place for prototype',
    data: obj
    }
    );
};