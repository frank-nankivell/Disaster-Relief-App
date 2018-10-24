
// home for the report tool
module.exports.home = function(req, res) {
  res.render('reporttool', {title: 'Report A Disaster Here'});
};

module.exports.info = function(req, res) {
  res.render('reporttoolinfo', {title: 'Find Information about a disaster here'});

};
