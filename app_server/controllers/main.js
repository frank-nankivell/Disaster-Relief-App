/* home page */
module.exports.main = function(req, res) {
  res.render('home', {
    title: 'home',
    info: 'your rescApp is... "an online community, supporting each other when disasters strike internationally',
    prototype: 'This is an app in prototype stage. Please navigate to the Learninghub section to see current prototyped functionality.'
});
};
