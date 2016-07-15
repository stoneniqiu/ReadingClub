var mongoose = require('mongoose');
require('../models/db.js');
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
};

module.exports.bookCreate = function (req, res) {
    console.log("imgurl:", req.body.img);
    BookModel.create({
        title: req.body.title,
        info: req.body.info,
        img: req.body.img,
        tags: req.body.tags,
        brief: req.body.brief,
        ISBN: req.body.ISBN,
        rating: req.body.rating,
    }, function (err, book) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log("新增书籍:", book);
            sendJSONresponse(res, 201, book);
        }
    });
};

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

};

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


};

module.exports.bookDeleteOne = function(req, res) {
    var bookid = req.params.bookid;
    if (bookid) {
        BookModel.findByIdAndRemove(bookid)
            .exec(function(err) {
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
};


var fs = require('fs');
var formidable = require('formidable');
module.exports.uploadImg = function (req, res) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = './../public/upload/temp/';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 3 * 1024 * 1024;   //文件大小
    
    form.parse(req, function (err, fields, files) {
        console.log(files);
        if (err) {
            sendJSONresponse(res, 404, 0);
        }
        for (var key in files) {
            console.log(files[key].path);
            var extName = ''; //后缀名
            switch (key.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                case 'image/x-png':
                default:
                    extName = 'png';
                    break;
            }
            var avatarName = (new Date()).getTime() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            
            fs.renameSync(files[key].path, newPath); //重命名
            
            sendJSONresponse(res, 200, "/upload/temp/" + avatarName);

        }
    });
 
};
