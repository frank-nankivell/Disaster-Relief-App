var request =  require('request');
var mapkey = process.env.FRANKS_MAP_API_KEY;
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://www.rescueappinternational.com";
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
  var blah = JSON.parse(obj);
  var key = JSON.stringify(mapkey);
  res.render('learninghub/learninghubList', {
    title: 'List of Learning hub entries thus far',
    info: 'Below you find a list of entries that match your search criteria',
    thoughts: 'What do you think of what has been written so far?',
    inputidea: '...Why dont you create youre own today',
    k: key,
    data: blah
  });
};

module.exports.homeSearch = function(req, res) {
  var disTypes = ['Volcanic Eruption', 'N/A','Landslide','Volcanic Eruption','Lightning','Forest Fire','Storm','Drought','Flood','Earthquake','Other'];
  if (!req.body.search || !req.body.disasterType) {
  res.redirect('/learninghub?err=val') 
  console.log('break1')
  };
    if (disTypes.includes(req.body.disasterType)) {
      console.log('check', req.body.search, req.body.disasterType)
      searchFunction(req, res);
      return;
  };
  res.redirect('/learninghub?err=val')
  console.log('break2')
  return;
  };

var searchFunction = function(req, res) {
  var requestOptions, path;
  path = '/api/learninghub/' + req.body.search + '/' + req.body.disasterType; 
  requestOptions = {
    url : apiOptions.server + path,
    method :'GET',
    json : '',
    qs: ''
  };
  request (
    requestOptions,
    function (err, response, body) {
      if (response.statusCode === 200 || response.statusCode === 201) {
        renderLearninghublist(req, res, body)
        return;
      } if (response.statusCode === 400) {
        res.redirect('/learninghub?err=empty')
        console.log('break 3')
      }
      else 
      console.log(err)
      console.log(res.message,'message is')
      _showError(req, res, response.statusCode);
      console.log('break4')
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
      if (response.statusCode === 200) {
      renderLearninghublist(req, res, body)
    } else 
    console.log(err)
    _showError(req, res, response.statusCode);
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
  res.render('ERRROR', {
    title : title,
    content : content
  });
};

// home page and info
var renderLearninghome = function(req, res)  {
  var key = JSON.stringify(mapkey);
      res.render('learninghub/learninghub', {
        title: 'The Learning Hub',
        Qinfo: 'What is the learning hub for, why am I here?',
        info: 'The Learning Hub is a space for users to post, search and find ways to save yourself from a future disaster!',
        a: key,
        error: req.query.err,
        url: req.originalUrl,
      //  empty: req.query.err
      });
    };

module.exports.home = function(req, res) {
  renderLearninghome(req,res) 
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
    country: req.body.country,
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
          console.log(response.statusCode)
          val = body._id;
         getLearninghub(val, res, function(req, res, data) {
           renderThanksForm(req, res, data);
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
  var dis, icon, country, keys;

  keys = JSON.stringify(mapkey);
  country = JSON.stringify(detail.country);
  dis = detail.disasterType; 
  icon = getDisasterIcon(dis);

  res.render('learninghub/learninghubthanks', {
    title: 'Thankyou for submitting your entry ',
    key: keys,
    nation: country,
    data: detail,
    val: icon
   // error: req.query.err
  });
};

module.exports.thanks = function(req, res) {}
