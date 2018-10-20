
// home page for the learning hub
module.exports.home = function(req, res) {
  res.render('learninghub', {title: 'The Learning Hub'});
};

// list page for the learning hub
module.exports.list = function(req, res) {
  res.render('learninghub', {title: 'List of Hub Entries'});
};
// comment page for the learning hub

module.exports.comment = function(req, res) {
  res.render('learninghub', {title: 'Comments'});
};
//  page for the learning hub
module.exports.new = function(req, res) {
  res.render('learninghub', {title: 'Upload a new Hub Entry'});
};
