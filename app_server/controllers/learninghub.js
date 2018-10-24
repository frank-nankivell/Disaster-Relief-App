
// home page for the learning hub
// mainly just home and nav for the learninhub - and search functionality later
module.exports.home = function(req, res) {
  res.render('learninghub', {title: 'The Learning Hub'});
};

// list page for the learning hub
module.exports.list = function(req, res) {
  res.render('learninghubList', {
    title: 'List of Hub Entries',
    infopage: 'A list of current available learning hub Entries',
    hubentry: [{
      entryName: 'Sample Idea',
      articleType: ['How-to Guide'],
      disasterType: ['Earthquake'],
      text: 'blah blah 123',
    },{
      entryName: 'Sample Idea2',
      articleType: ['New-Idea'],
      disasterType: ['Storm'],
      text: 'blah blah  check the idea',
    },{
      entryName: 'Sample Idea3',
      articleType: ['Question'],
      disasterType: ['Forrest Fire'],
      text: 'blah blah think ive got a question',
    }]
  });
};
// comment page for the learning hub

module.exports.comment = function(req, res) {
  res.render('learninghub', {title: 'Comments'});
};
//  page for the learning hub
module.exports.new = function(req, res) {
  res.render('learninghub', {title: 'Upload a new Hub Entry'});
};
