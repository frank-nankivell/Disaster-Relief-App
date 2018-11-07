var mongoose = require('mongoose');
var lh = mongoose.model('Learninghub');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
// Search by Date - Provides list of all values ordered by date

module.exports.learninghubByCreatedDate = function(req, res) {
  console.log('Finding all learninghub entries Ordered by date')
  lh
    .find().sort({ createdOn: -1})
    .exec(function(err, learninghublist)
    {
      if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(learninghublist);
      sendJSONresponse(res, 201, learninghublist);
  }
})
};

var buildLearninghubList = function(req, res, learninghublist) {
  var lhEntries = [];
  learninghublist.forEach(function(doc) {
    lhEntries.push({
      hName: doc.obj.hubentryName,
      hdisasterType: doc.obj.disasterType,
      harticleType: doc.obj.articleType,
      hcreateDate: doc.obj.createOn,
      hhubtext: doc.obj.hubtext,
      _id: doc.obj._id,
      hcontinent: doc.obj.relatedContinent
    });
  });
  return lhEntries;
  console.log('this works')
  console.log(lhEntries)
};

// Search by Disaster - Provides list of all values ordered by Disaster
module.exports.learninghubByDisasterAll = function(req, res){
  console.log('Finding all learninghub entries Ordered by Disaster')
  lh
    .find().sort({ disasterType: -1})
    .exec(function(err, learninghublist) {
      if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(learninghublist);
      sendJSONresponse(res, 201, learninghublist);
  }
})
};
module.exports.learninghubByDisasterType = function(req, res){
console.log('Finding articles by Disaster Type', req.params);
if (req.params && req.params.searchid) {
  lh
    .find(( { articleType: { $in: [req.params.searchid] } } ).sort({ disasterType: -1}))
    .exec(function(err, learninghub) {
      if (!learninghub) {
        sendJSONresponse(res, 404, {
          "message": "Search ID is not found"
        });
        return;
      } else if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      console.log(learninghub);
      sendJSONresponse(res, 200, learninghub);
    });
} else {
  console.log('No Searchid specified');
  sendJSONresponse(res, 404, {
    "message": "No search ID in request"
  });
}
};


// Search by Article - Provides list of all values ordered by articleType
module.exports.learninghubByType = function(req, res) {
  console.log('Finding all learninghub entries Ordered by date')
  lh
    .find().sort({ articleType: -1})
    .exec(function(err, learninghublist) {
      if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(learninghublist);
      sendJSONresponse(res, 201, learninghublist);
  }
})
};

module.exports.learninghubSearchVar = function(req, res) {
};

module.exports.learninghubReadOne = function(req, res) {
  console.log('Finding Learninghub details', req.params);
  if (req.params && req.params.learninghubid) {
    lh
      .findById(req.params.learninghubid)
      .exec(function(err, learninghub) {
        if (!learninghub) {
          sendJSONresponse(res, 404, {
            "message": "learninghubid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(learninghub);
        sendJSONresponse(res, 200, learninghub);
      });
  } else {
    console.log('No learninghubid specified');
    sendJSONresponse(res, 404, {
      "message": "No learninghubid in request"
    });
  }
};

module.exports.learninghubByContinent = function(req, res) {
  console.log('Finding Learninghub details', req.params);
  if (req.params && req.params.continent) {
    lh
      .findById(req.params.continent)
      .exec(function(err, learninghub) {
        if (!learninghub) {
          sendJSONresponse(res, 404, {
            "message": "learninghubid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(learninghub);
        sendJSONresponse(res, 200, learninghub);
      });
  } else {
    console.log('No learninghubid specified');
    sendJSONresponse(res, 404, {
      "message": "No learninghubid in request"
    });
  }
};






//to create a record within mongoDB
module.exports.learninghubCreate = function (req, res) {
    console.log(req.body);
    lh.create({
      hubentryName: req.body.hubentryName,
      articleType: req.body.articleType,
      disasterType: req.body.disasterType,
      hubtext: req.body.hubtext,
      },
      function(err, learninghub) {
        if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
        } else {
          console.log(learninghub);
          sendJSONresponse(res, 201, learninghub);
        }
    });
  }

module.exports.learninghubReadbyCD = function (req, res){
};

// to be able to read a record


module.exports.learninghubUpdateOne = function (req, res){};
module.exports.learninghubDeleteOne = function (req, res){};
