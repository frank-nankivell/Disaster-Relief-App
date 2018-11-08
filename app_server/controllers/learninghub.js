var request =  require('request');
var localserver = "http:///localhost:3000"
var tbc = 'Page coming soon...'
var testdata = require('./testData/dump.json');
//if (process.env.NODE_ENV === 'production') {
//  apiOptions.server = "http://inserturl"
//};


// Variable of the render learninghub list //
var renderLearninghublist = function(req, res, responseBody) {
  var obj = JSON.parse(responseBody)
  res.render('learninghubList', {
    title: 'List of Learning hub entries thus far',
    info: 'Below you find a list of entries that have been entered this far',
    data: obj
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


// comment page for the learning hub
module.exports.comment = function(req, res) {
  res.render('learninghub', {title: 'Comments',tbc});
};
//  page for the learning hub
module.exports.new = function(req, res) {
  res.render('learninghubNew', {title: 'Upload a new Hub Entry',tbc});
};

var renderlearninghome = function(req, res, samplebody)  {
  var a =
  //var cont = samplebody.getElementById('relatedContient')
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
    continent: "Europe",
    api_KEY: 'AIzaSyDeZhtVpwaxLEb0AMw-tHtQvNgVvy9HWbU'

  });
};



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

module.exports.home = function(req, res) {
  var requestOptions;
  requestOptions = {
    url : 'http://localhost:3000/api/learninghub/get/123',
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
