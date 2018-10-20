
// home page for the learning hub
module.exports.home = function(req, res) {
  res.render('index', {title: 'The Learning Hub'});
};

// list page for the learning hub
module.exports.list = function(req, res) {
  res.render('index', {title: 'List of Hub Entries'});
};
// comment page for the learning hub

module.exports.comment = function(req, res) {
  res.render('index', {title: 'Comments'});
};
//  page for the learning hub
module.exports.new = function(req, res) {
  res.render('index', {title: 'Upload a new Hub Entry'});
};
