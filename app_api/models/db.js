var mongoose = require( 'mongoose' );
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
const dbURI = "mongodb://localhost:27017/drap";
const mongo = mongoose.connect(dbURI, {useNewUrlParser: true });
mongo.then(() => {
console.log('connected');
}).catch((err) => {
console.log('err', err);
});

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to' + dbURI);
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

require('./lhdata');
//require('./companies');
