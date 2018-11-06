

// Task 3 a) A schema for data related to the prototype

var learninghubSchema = new mongoose.Schema({
    hubentryName: {
      type:String,
      required: true
    },
    articleType: [],
    disasterType: [],
    hubtext: {
      type: String,
      required: true
    },
    relatedContinent: [],
    createdOn: {
        type: Date,
       "default": Date.now
     },
     author: {
       type: String,
       required: true
     }
});
