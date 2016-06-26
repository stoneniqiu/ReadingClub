require('../models/db.js');
var mongoose = require('mongoose');
var BookModel = mongoose.model('Book');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
 

module.exports.books = function (req, res) {
    BookModel.find().exec(function (err, books) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
            return;
        }
        sendJSONresponse(res, 200, books);
    });
}

module.exports.bookCreate = function (req, res) {
    BookModel.create({
        title: req.body.title,
        info: req.body.info,
        img: req.body.img,
        tags: req.body.tags,
        brief: req.body.brief,
        rating: req.body.rating,
        ISBN: req.body.ISBN
    }, function(err, book) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log(book);
            sendJSONresponse(res, 201, book);
        }
    });
}

module.exports.bookReadOne = function (req, res) {
    var bookid = req.params.bookid;
    if (!bookid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, bookid is required"
        });
        return;
    }
    BookModel.findById(bookid).exec(function (err, book) {
        if (!book) {
            sendJSONresponse(res, 404, {
                "message": "bookid not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        console.log(book);
        sendJSONresponse(res, 200, book);

    });
}

module.exports.bookUpdateOne = function (req, res) {
    var bookid = req.params.bookid;
    if (!bookid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, bookid is required"
        });
        return;
    }
    BookModel.findById(bookid).exec(function (err, book) {
        if (!book) {
            sendJSONresponse(res, 404, {
                "message": "bookid not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        book.title = req.body.title;
        book.rating = req.body.rating;
        book.info = req.body.info;
        book.img = req.body.img;
        book.tags = req.body.tags;
        book.brief = req.body.brief;
        book.ISBN = req.body.ISBN;
        book.save(function (err, book) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, book);
            }
        });
    });


}

module.exports.bookDeleteOne = function (req, res) {
    var bookid = req.params.bookid;
    console.log("bookid", bookid);
    if (bookid) {
        BookModel.findByIdAndRemove(bookid)
            .exec(function (err) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            console.log("book id :" + bookid + "deleted");
            sendJSONresponse(res, 204, null);
        });
    } else {
        sendJSONresponse(res, 404, { message: "No bookid" });
    }
}

