var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

var uglifyJs = require("uglifyjs");
var fs = require('fs');

var appClientFiles = [
    'app_client/app.js',
    'app_client/home/home.controller.js',
    'app_client/common/services/ReadData.service.js',
    'app_client/common/filters/formatDate.filter.js',
    'app_client/common/directive/ratingStars/ratingStars.directive.js',
    'app_client/common/directive/footer/footer.js',
    'app_client/common/directive/navigation/navigation.js',
    'app_client/about/about.controller.js',
    'app_client/books/books.controller.js',
    'app_client/bookDetail/bookDetail.controller.js',
    'app_client/bookModal/bookModal.controller.js'
];

var uglified = uglifyJs.minify(appClientFiles, { compress : false });

fs.writeFile('public/angular/readApp.min.js', uglified.code, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('脚本生产并保存成功: readApp.min.js');
    }
});


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

//app.use('/', routes);
app.use('/api', routesApi);
app.use(function (req, res) {
    res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

 

module.exports = app;
