/* home page */
module.exports.main = function(req, res) {
  var x = getImage();
  console.log('check' +x);
  res.render('home', {
    title: 'home',
    info: 'RescApp is a Global online community of people helping you or wanting to help others in need',
    community: 'To access your local community please login or, in an emergency you can report a disaster now',
    val: x
});
};
var getImage = function(req, res) {
  return "images/logo-rescapp.001.jpeg";
}
module.exports.loginRegister = function(req, res) {
  res.render('login-register', {});
};