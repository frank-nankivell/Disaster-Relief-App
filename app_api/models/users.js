var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  country: {
    type: String, 
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  
  this.salt = crypto.randomBytes(16).toString('hex');
  var x = this.salt;
  var pw = password;
  this.hash = crypto.pbkdf2Sync(pw, x, 100000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  console.log(password)
  var hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    country: this.country,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.FRANKS_JWT_Key); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);