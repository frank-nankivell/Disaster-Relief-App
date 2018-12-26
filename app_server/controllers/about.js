module.exports.about = function(req, res) {
  res.render('about/about', {
    title: 'About'});
};

module.exports.privacy = function(req, res) {
  res.render('about/privacy', {
    title: 'Privacy Statement'});
};

module.exports.team = function(req, res) {

  res.render('about/team', {
    title: 'A one person team'});
};
