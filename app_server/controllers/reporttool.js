var tbc = 'Page Coming Soon...';
// home for the report tool
module.exports.home = function(req, res) {
  res.render('reporttool', {title: 'Report A Disaster Here', tbc});
};

module.exports.info = function(req, res) {
  res.render('reporttoolinfo', {title: 'Find Information about a disaster here', tbc});

};
// Brain dump for ideas:
// to add lots of api from google and to then collate on them together
// hotspot where disasters occur in your local area
