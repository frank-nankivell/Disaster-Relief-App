var mongoose = require('mongoose');
var lh = mongoose.model('Learninghub');
var User = mongoose.model('User');
//var testdata = require('./testData/dump.json');

var getAuthor = function(req, res, callback) {
  console.log("Finding author with email " + req.payload.email);
  if (req.payload.email) {
    User
      .findOne({ email : req.payload.email })
      .exec(function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "User not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(user);
        callback(req, res, user.name);
      });

  } else {
    sendJSONresponse(res, 404, {
      "message": "User not found"
    });
    return;
  }
};


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.learninghubGet = function(req, res) {
  console.log("Find me a Learninghub... Entry", + req.params);
  if(req.params && req.params.learninghubid) {
    lh
      .findById(req.params.learninghubid)
      .exec(function(err, learninghub) {
        if (!learninghub) {
          sendJSONresponse(res, 404, {
            "message": "No record with ID FOUND"
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
    console.log('No ID Given');
    sendJSONresponse(res, 404, {
      "message": "No ID in request"
    });
  }
};

// Search by Date - Provides list of all values ordered by date
// This needs to be amended to only search for using .Find()
module.exports.learninghubByCreatedDate = function(req, res) {
    lh
      .find()
      .sort([['createdOn', 1]])
      .exec(function(err, learninghub) {
        if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
        } else {
          console.log(learninghub);
          sendJSONresponse(res, 201, learninghub);
        }
      }
    );
};

module.exports.learninghubSearch = function(req, res) {
  if(!req.params.disTypeID || !req.params.searchID) {
    console.log(err);
    sendJSONresponse(res, 400, {
      "message": "Incorrect params given"
    });
  };
  console.log(req.params.disTypeID, 'dis,',req.params.searchID)
  lh
    .find({$and:[{"hubentryName":{$regex: req.params.searchID, $options: 'i'}},{'disasterType':{$regex: req.params.disTypeID, $options: 'i'}}]})
    .sort([['createdOn', 1]])
    .exec(function(err, learninghub) {
      if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
        return;
      } if (learninghub === undefined || learninghub.length == 0) {
        console.log('no values found')
        sendJSONresponse(res, 400, {
          "message": "no values found in search"
        });
        return;
      }
       else 
       console.log(learninghub);
        sendJSONresponse(res, 201, learninghub);
      }
    );
  };


module.exports.countryVisualisation = function(req, res) {
  lh
    .find({}, {'_id':0,'country':1})
   // .select('country')
    .sort([['country', 0]])
    .exec(function(err, learninghub) {
      if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
      } else {
        console.log(learninghub);
        sendJSONresponse(res, 201, learninghub);
      }
    }
  );
};


var addRating = function(username) {
  console.log("adding User Rating for", username);
  User
      .findOneAndUpdate({ name : username  }),
      { $inc: { rating: 1 } }
      .exec(
        function(err, user) {
          if (err)
          { console.log(err);
          } else {
            console.log("User rating is now ", user.rating)
          }
        });
  };



//to create a record within mongoDB
module.exports.learninghubCreate = function (req, res) {
  getAuthor(req, res, function(req, res, username)  {
    console.log(req.body);
    lh.create({
      hubentryName: req.body.hubentryName,
      articleType: req.body.articleType,
      disasterType: req.body.disasterType,
      country: req.body.country,
      createdOn: '',
      author: req.body.author,
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
  });

};

  module.exports.learninghubComment = function (req, res) {
    console.log(req.body.username, "testing")
    getAuthor(req, res, function(req, res, username) {
    var x = req.params.learninghubid
    console.log(x + "check")
    if(req.params.learninghubid) {
      console.log()
      lh
        .findById(req.params.learninghubid)
        .select('comment')
        .exec(function(err, learninghub) {
            if (err) {
              sendJSONresponse(res, 400, err);
            } else {
              console.log(learninghub)
              console.log ('username' + username)
              doAddComment(req, res, learninghub, username);
              addRating(username);
            }
          }
      );
    } else {
        sendJSONresponse(res, 404, {
          "message": "Not happenin, LH ID required"
        });
      }
    });
  };


    var doAddComment = function(req, res, learninghub, author) {
      if (!learninghub) {
        sendJSONresponse(res, 404, "LH ID aint about" + learninghub);
      } else {
        learninghub.comment.push({
          commentText: req.body.commentText,
          author: author,
        });
        learninghub.save(function(err, learninghub) {
          var thisComment;
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            thisComment = learninghub.comment[learninghub.comment.length - 1];
            sendJSONresponse(res, 201, thisComment);
          }
        });
      }
    };
    module.exports.learninghubCreate = function (req, res) {
      console.log(req.body);
      lh.create({
        hubentryName: req.body.hubentryName,
        articleType: req.body.articleType,
        disasterType: req.body.disasterType,
        country: req.body.country,
        createdOn: '',
        author: req.body.author,
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
    };



module.exports.learninghubReadbyCD = function (req, res){
};
module.exports.learninghubUpdateOne = function (req, res){};
module.exports.learninghubDeleteOne = function (req, res){};
