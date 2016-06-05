
var mongoose = require('mongoose');

//var dbURI = 'mongodb://localhost/RClub';
var dbURI = 'mongodb://reader:loveReading@ds021343.mlab.com:21343/readingdb';
mongoose.connect(dbURI);

//var dbURIlog = 'mongodb://localhost/RClublog';
//var logDB = mongoose.createConnection(dbURIlog);
//logDB.on('connected', function () {
//    console.log('Mongoose connected to ' + dbURIlog);
//});
//logDB.close(function () {
//    console.log('Mongoose log disconnected');
//});


// 连接事件
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

// 当应用重启或终止的时候 关闭连接
gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// nodemon 重启 貌似没用
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// 应用终止
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});



require('./books.js');