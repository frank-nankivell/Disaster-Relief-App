var request =  require('request');

var localserver = "http:///localhost:3000"
var tbc = 'Page coming soon...'
//if (process.env.NODE_ENV === 'production') {
//  apiOptions.server = "http://inserturl"
//};

// Variable of the render learninghub list //
var renderLearninghublist = function(req, res, responseBody) {
  res.render('learninghubList', {
    title: 'List of Learning hub entries thus far',
    info: 'Below you find a list of entries that have been entered this far',
    data: responseBody

  });
};

// list page for the learning hub //
module.exports.list = function(req, res ) {
  var requestOptions;
  requestOptions = {
    url : 'http://localhost:3000/api/learninghub/list',
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


// comment page for the learning hub
module.exports.comment = function(req, res) {
  res.render('learninghub', {title: 'Comments',tbc});
};
//  page for the learning hub
module.exports.new = function(req, res) {
  res.render('learninghubNew', {title: 'Upload a new Hub Entry',tbc});
};

var renderlearninghome = function(req, res, samplebody)  {
  console.log(samplebody) // this - parses JSON in the console no problem
  var n = (samplebody.hubentryName) // this does not work
  console.log(n) // =
  res.render('learninghub', {
    title: 'The Learning Hub',
    Qinfo: 'What is the learning hub for, why am I here?',
    info: 'The Learning Hub is a space for users to post, search and find ways to save yourself from a future disaster!',
    sampleinfo: 'Check out an example entry below...',
    listinfo:'...However if you want to view all current entires then you can also do that',
    inputinfo: 'Its also a space for you to contribute to the community and make articles, and ask questions of your own',
    name: "How to not get burnt in a fire",
    artType: "How-to Guide",
    disType: "Forrest Fire",
    text: "Don't get burnt in a fire",
    date: "2018-05-10",
    continent: "Europe"

  });
};


module.exports.home = function(req, res) {
  var requestOptions;
  requestOptions = {
    url : 'http://localhost:3000/api/learninghub/get/5bd580d1b76608678ff1102e',
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
