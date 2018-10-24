module.exports.about = function(req, req) {
  res.render('about', {title: 'About'});
};

module.exports.privacy = function(req, req) {
  res.render('privacy', {title: 'Privacy Statement'});
};

module.exports.team = function(req, req) {
  res.render('team', {title: 'A one person team'});
};
