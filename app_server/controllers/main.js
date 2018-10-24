/* home page */
module.exports.main = function(req, res) {
  res.render('index', {title: 'Home'});
};
