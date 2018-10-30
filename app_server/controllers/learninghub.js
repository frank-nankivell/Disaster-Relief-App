var request =  require('request');

var localserver = "http:///localhost:3000"
var tbc = 'Page coming soon...'
//if (process.env.NODE_ENV === 'production') {
//  apiOptions.server = "http://inserturl"
//};
// Variable of the render learninghub list
var renderLearninghublist = function(req, res, responseBody) {
  res.render('learninghubList', {
    title: 'List of Learning hub entries thus far',
    lhEntries: responseBody
  });
};
// list page for the learning hub
module.exports.list = function(req, res) {
  var requestOptions, path;
  path = 'api/learninghub/list';
  requestOptions = {
    url : localserver + path,
    method : "GET",
    json : {}
  };
  request (
    requestOptions,
    function (err, response, body) {
      renderLearninghublist(req, res, body)
    }
  );
};


// comment page for the learning hub
module.exports.comment = function(req, res) {
  res.render('learninghub', {title: 'Comments',tbc});
};
//  page for the learning hub
module.exports.new = function(req, res) {
  res.render('learninghubNew', {title: 'Upload a new Hub Entry',tbc});
};

module.exports.home = function(req, res) {
  res.render('learninghub', {
    title: 'The Learning Hub',
    Qinfo: 'What is the learning hub for, why am I here?',
    info: 'The Learning Hub is a space for users to post, search and find ways to save themselves from future disasters',
    inputinfo: 'Its also a space for you to contribute to the community and make articles, and ask questions of your own'
  });
};
