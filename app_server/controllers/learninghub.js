var request =  require('request');
var mapkey = process.env.FRANKS_MAP_API_KEY;
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "";
}

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
    (err)
    console.log("wrong value"+ err)
  }
  return y;
};



// function of the render learninghub list //
var renderLearninghublist = function(req, res, responseBody) {
  var obj = JSON.stringify(responseBody);
  var key = JSON.stringify(mapkey);
  res.render('learninghub/learninghubList', {
    title: 'List of Learning hub entries thus far',
    info: 'Below you find a list of entries that have been entered this far',
    thoughts: 'What do you think of what has been written so far?',
    inputidea: '...Why dont you create youre own today',
    header1: "The Article Type is ",
    header2: "The Disaster Type ",
    header3: "Related Continent  ",
    date: " Created Date",
    a: key,
    data: obj
  });
};


// list page for the learning hub //
module.exports.list = function(req, res ) {
  var requestOptions, path;
  path = '/api/learninghub/list/date'
  requestOptions = {
    url : apiOptions.server + path,
    method :'GET',
    json : '',
    qs: ''
  };
  request (
    requestOptions,
    function (err, response, body) {
     // console.log(body)
      renderLearninghublist(req, res, body)
    }
  );
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

// home page and info
var renderLearninghome = function(req, res, samplebody)  {
  var key = JSON.stringify(mapkey);
  console.log(key)
  var obj = JSON.stringify(samplebody[1]);
  console.log(obj)
  //console.log(obj + "check")    //console.log('countries' + obj)
      res.render('learninghub/learninghub', {
        title: 'The Learning Hub',
        Qinfo: 'What is the learning hub for, why am I here?',
        info: 'The Learning Hub is a space for users to post, search and find ways to save yourself from a future disaster!',
        MapInfo: samplebody,
        a: key
      });
    };

var testData = {
   "_id": '5c063aa2842487b3f7c9ee08', "relatedCountry": 'Australia',
   "_id": '5c063aa2842487b3f7c9ee09', "relatedCountry": 'Bahamas',
   "_id": '5c063aa2842487b3f7c9ee10', "relatedCountry": 'Belarus',
   "_id": '5c063aa2842487b3f7c9ee11', "relatedCountry": 'Russia',
};

module.exports.home = function(req, res) {
  var requestOptions, path;
  path = '/api/learninghub/visAll';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
};
request(
  requestOptions,
  function(err, response, body) {
    if (err) {
      console.log(err)
    }
    if (response.statusCode === 201) {
      var arr = []
      for(var a in body) {
       // console.log(body[a].relatedCountry);
        arr = body[a].relatedCountry;
      }
      console.log(arr[0],'dfdgrtsfd');
      console.log(response.statusCode)
      renderLearninghome(req, res, arr)
    } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
      console.log(response.statusCode);
    } else {
      console.log(body);
      _showError(req, res, response.statusCode);
    }
  }
);
};



// for getting a single learninghub by ID
var getLearninghub = function (req, res, callback) {
  console.log("checking check" + req.check) 
  console.log("checking ID" + req.learninghubid)
  var requestOptions, thankpath, commentpath;
  thankPath = "/api/learninghub" + req;
  //commentpath = "/api/learninghub" + req.params.learninghubid;
  thankpath = "/api/learninghub" + req;
  requestOptions = {
    url : apiOptions.server + thankpath,
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
  path = "/api/learninghub" + req;
  requestOptions = {
    url : 'http://localhost:3000' + path,
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


var renderCommentForm = function (req, res, obj) {
//  console.log("here's the request" + obj.hubentryName)
  res.render('learninghub/learninghubComment', {
    title: 'Comments' + obj.hubentryName,
    error: req.query.err,
    url: req.originalUrl,
    data: obj
  });
    
};
// comment page for the learning hub
module.exports.comment = function(req, res) {
  val = req.params.learninghubid;
  console.log(val + " thats the ID")
  getLearninghub(val, res, function(req, res, cb) {
    renderCommentForm(req, res, cb);
  });
};


var renderCreate = function(req, res) {
  res.render('learninghub/learninghubNew',{
    title: 'Upload a new Hub Entry',
    error: req.query.err,
    url: req.originalUrl
  });
}

module.exports.new = function(req, res) {
  renderCreate(req,res)
};

// Amended so comments only possible to be made if user logged in
module.exports.commentAdd = function(req, res) { 
  console.log('Posting comment to DB')
  var requestOptions, path, lhid, postdata;
  lhid = req.params.learninghubid;
  path = '/api/learninghub/new/' + lhid + '/comment';
  postdata = {
    commentText: req.body.commentText
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
};
if (!postdata.commentText || !lhid) {
  res.redirect('/learninghub/new?err=val');
} else {
request(
  requestOptions,
  function(err, response, body) {
    if (err) {
      console.log(err)
    }
    // need to add exception handlong for when DB is offline
    if (response.statusCode === 201) {
      console.log(response.statusCode)
      res.redirect('/learninghub/' + lhid + '/comment')
    } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
      res.redirect('/learninghub/comment?err=val');
      console.log(response.statusCode);
    } else {
      console.log(body);
      _showError(req, res, response.statusCode);
    }
  }
);
};
};

module.exports.newAdd = function(req, res) {
  console.log('Posting add to DB')
  var requestOptions, path, postdata;
  path = "/api/learninghub/new";
  postdata = {
    hubentryName: req.body.hubentryName,
    articleType: req.body.articleType,
    disasterType: req.body.disasterType,
    relatedCountry: req.body.relatedCountry,
    author: req.body.author,
    hubtext: req.body.hubtext
  };
  //console.log('test values are' + JSON.stringify(test))
 // console.log('correct values are ' + JSON.stringify(requestOptions))
  requestOptions = {
    // need to amend below for production
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.hubentryName || !postdata.author || !postdata.hubtext) {
      res.redirect('/learninghub/new?err=val');
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
   //      console.log(x)
         getLearninghub(val, res, function(req, res, data) {
    //       a = data.hubentryName
        //   console.log("test test test " + a)
           renderThanksForm(req, res, data);
       //    console.log("test test test test data " + data)
         });
          console.log()
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/learninghub/new?err=val');
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
  var a, y;
  a = detail.disasterType; 
  y = getDisasterIcon(a);
  res.render('learninghub/learninghubthanks', {
    title: 'Thankyou for submitting your entry ',
    data: detail,
    val: y
   // error: req.query.err
  });
};

module.exports.thanks = function(req, res) {}
