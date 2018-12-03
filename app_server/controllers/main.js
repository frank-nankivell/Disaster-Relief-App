/* home page */
module.exports.main = function(req, res) {
  res.render('home', {
    title: 'home',
    info: 'RescApp is a Global online community of people helping you or wanting to help others in need',
    community: 'To access your local community please login or, in an emergency you can report a disaster now'
});
};

module.exports.loginRegister = function(req, res) {
  res.render('login-register', {});
};