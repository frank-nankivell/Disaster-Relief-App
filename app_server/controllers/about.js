var tbc = 'Page coming soon...';

module.exports.about = function(req, res) {
  res.render('about', {
    title: 'About',
    tbc
  });
};

module.exports.privacy = function(req, res) {
  res.render('privacy', {
    title: 'Privacy Statement',
    tbc});
};

module.exports.team = function(req, res) {
  res.render('team', {
    title: 'A one person team',
    tbc});
};
