var request =  require('request');
var localserver = 'http://localhost:3000';
var tbc = 'Page coming soon...';

// Variable of the render learninghub list //
var renderLearninghublist = function(req, res, responseBody) {
 // var obj = responseBody;
  var obj = JSON.parse(responseBody)
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


// list page for the learning hub //
module.exports.list = function(req, res ) {
  var requestOptions, path;
  path = '/api/learninghub/list/date'
  requestOptions = {
    url : localserver + path,
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
      var obj = JSON.stringify(samplebody); 
      obj.replace(/(&quot\;)/g,"\"");
      console.log(obj + "check")    //console.log('countries' + obj)
      res.render('learninghub', {
        title: 'The Learning Hub',
        Qinfo: 'What is the learning hub for, why am I here?',
        info: 'The Learning Hub is a space for users to post, search and find ways to save yourself from a future disaster!',
        MapInfo: obj
      });
    };

module.exports.home = function(req, res) {
  var requestOptions, path;
  path = '/api/learninghub/visAll';
  requestOptions = {
    url : localserver + path,
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
      console.log(response.statusCode)
      renderLearninghome(req, res, body)
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
    url : localserver + thankpath,
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
  res.render('learninghubComment', {
    title: 'Comments' + obj.hubentryName,
    data: obj
  });
  //  error: req.query.err,
  //  url: req.originalUrl
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
  res.render('learninghubNew',{
    title: 'Upload a new Hub Entry',
    error: req.query.err,
    url: req.originalUrl
  });
}

module.exports.new = function(req, res) {
  renderCreate(req,res)
};

module.exports.commentAdd = function(req, res) { 
  console.log('Posting comment to DB')
  var requestOptions, path, lhid, postdata;
  lhid = req.params.learninghubid;
  path = '/api/learninghub/new/' + lhid + '/comment';
  postdata = {
    commentText: req.body.commentText,
    author: req.body.author
  };
  requestOptions = {
    url : localserver + path,
    method : "POST",
    json : postdata
};
if (!postdata.commentText || !postdata.author || !lhid) {
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
    url : localserver + path,
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
  res.render('learninghubthanks', {
    title: 'Thankyou for submitting your entry ',
    data: detail
   // error: req.query.err
  });
};

module.exports.thanks = function(req, res) {}
