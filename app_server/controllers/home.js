var request = require('request');

var bookservice = require('../services/homeService.js');

var apiOptions = {
    server : "http://localhost:3000"
};
//if (process.env.NODE_ENV === 'production') {
//    apiOptions.server = "https://stoneniqiu-mean.herokuapp.com/ ";
//}


module.exports.index = function (req, res) {
    var requestOptions, path;
    path = "/api/topics";
    requestOptions= {
        url: apiOptions.server + path,
        method: "GET",
        json:{},
    }
    request(requestOptions, function (err, response, body) {
        if (response.statusCode == 200) {
            res.render('index', { title: 'Index', topics: body });
        } else {
            res.render('error', { message: err.message, error: err });
        }
    });
};

module.exports.books = function (req, res) {
    var requestOptions, path;
    path = "/api/books";
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
    }
    request(requestOptions, function (err, response, body) {
        if (response.statusCode == 200) {
            res.render('books', { title: 'Books', books: body });
        } else {
            res.render('error', { message: err.message, error: err });
        }
    });
};



module.exports.detail = function (req, res) {
    var requestOptions, path;
    path = "/api/book/" + req.params.id;
    requestOptions = {
        url: apiOptions.server+path ,
        method: "GET",
        json: {},
    }
    request(requestOptions, function (err, response, body) {
        if (response.statusCode == 200) {
            res.render('detail', { title: body.title, book: body });
        } else {
            res.render('info', err);
        }
    });
   
   };

module.exports.about = function (req, res) {
    res.render('about', { title: 'About' });
};



 




