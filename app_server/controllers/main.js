/* home page */
module.exports.main = function(req, res) {
  res.render('home', {
    title: 'Home',
    info: 'DRAPP is... "an online community, supporting each other when disasters strike internationally"'

});
};
