
var bookservice = require('../services/homeService.js');
 
module.exports.index = function (req, res) {
    bookservice.allTopics(function (result) {
        var obj = result.content;
        console.log(obj.status);
        if (result.status == 200) {
            res.render('index', { title: 'Index', topics: obj });
        }
        res.render('info', obj);
    });  
};

module.exports.books = function (req, res) {
    bookservice.allBooks(function(result) {
        var obj = result.content;
        console.log(obj.status);
        if (result.status == 200) {
            res.render('books', { title: 'Books', books: obj });
        }
        res.render('info', obj);
    });  
};



module.exports.detail = function (req, res) {
    bookservice.bookReadOne(req.params.id, function (result) {
        var obj = result.content;
        if (result.status == 200) {
            res.render('detail', { title: obj.title, book: obj });
        } 
        res.render('info', obj);
    });
   };

module.exports.about = function (req, res) {
    res.render('about', { title: 'About' });
};



 




