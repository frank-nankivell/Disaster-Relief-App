var request =  require('request');
var apiOptions = {
  server: "http:///localhost:3000"
};
//if (process.env.NODE_ENV === 'production') {
//  apiOptions.server = "http://inserturl"
//};
// home page for the learning hub
// mainly just home and nav for the learninhub - and search functionality later
module.exports.home = function(req, res) {
  res.render('learninghub', {
    title: 'The Learning Hub',
    Qinfo: 'What is the learning hub for, why am I here?',
    info: 'The Learning Hub is a space for users to post, search and find ways to save themselves from future disasters',
    inputinfo: 'Its also a space for you to contribute to the community and make articles, and ask questions of your own'
  });
};

// list page for the learning hub
module.exports.list = function(req, res) {
  var requestOptions, path;
  path = 'api/learninghub/list';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {
      hubentryName: "",
      articleType: "",
      disasterType: "",
      hubtext: "",
    }
  };
  request (
    requestOptions,
    function (err, response, body) {
      renderLearninghublist(req, res)
    }
  );
};

// comment page for the learning hub

module.exports.comment = function(req, res) {
  res.render('learninghub', {title: 'Comments'});
};
//  page for the learning hub
module.exports.new = function(req, res) {
  res.render('learninghubNew', {title: 'Upload a new Hub Entry'});
};
