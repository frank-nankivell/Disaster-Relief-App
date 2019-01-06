var mongoose = require( 'mongoose' );
mongoose.set('useCreateIndex', true);
var gracefulShutdown;
var readLine = require ("readline");
if (process.platform === "win32"){
    var rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on ("SIGINT", function (){
        process.emit ("SIGINT");
    });
}
var dbURI = "mongodb://localhost:27017/DRAP";
if (process.env.NODE_ENV === 'production') {
  dbURI = 'mongodb://admin:admin01@ds149894.mlab.com:49894/rescapp-01';
}
const mongo = mongoose.connect(dbURI, {useNewUrlParser: true });
mongo.then(() => {
console.log('connected');
}).catch((err) => {
console.log('err', err);
});

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connected error ' + dbURI);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

var gracefulShutdown = function(msg, cb) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through' + msg);
    cb();
  });
};

process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function() {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});

process.once('SIGTERM', function() {
  gracefulShutdown('Heroku App shutdown', function () {
    process.exit(0);

  });
});

require('./learninghub');
require('./reportTool');
require('./users');
