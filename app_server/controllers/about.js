module.exports.about = function(req, res) {
  res.render('about', {title: 'About'});
};

module.exports.privacy = function(req, res) {
  res.render('privacy', {title: 'Privacy Statement'});
};

module.exports.team = function(req, res) {
  res.render('team', {title: 'A one person team'});
};
