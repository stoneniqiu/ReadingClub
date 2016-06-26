var request = require('request');


var apiOptions = {
    server : "http://localhost:3000"
};
//if (process.env.NODE_ENV === 'production') {
//    apiOptions.server = "https://stoneniqiu-mean.herokuapp.com/ ";
//}


function info (res, status) {
    var title, content;
    if (status === 404) {
        title = "404, 页面没有找到";
        content = "亲，页面飞走了...";
    } else if (status === 500) {
        title = "500, 内部错误";
        content = "尴尬...，发生错误";
    } else {
        title = status + ", 有什么不对劲";
        content = "某些地方可能有些错误";
    }
    res.status(status);
    res.render('info', {
        title : title,
        content : content,
        status: status,
    });
};



module.exports.index = function (req, res) {
    var requestOptions, path;
    path = "/api/topics";
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
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
    };
    request(requestOptions, function (err, response, body) {
        if (response.statusCode == 200) {
            res.render('books', { title: 'Books', books: body });
        } else {
            res.render('error', { message: err.message, error: err });
        }
    });
};

module.exports.bookcreateview = function (req, res) {
    res.render('bookCreate', { title: '新增推荐图书' });
};
module.exports.doBookCreate = function (req, res) {
    var requestOptions, path, postdata;
    path = "/api/book";
    postdata = {
        title: req.body.title,
        info: req.body.info,
        ISBN: req.body.ISBN,
        brief: req.body.brief,
        tags: req.body.tags,
        img: req.body.img,
        rating:req.body.rating,
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata,
    };
    request(requestOptions, function (err, response, body) {
        console.log("body.name", body.name, response.statusCode);
        if (response.statusCode === 201) {
            res.redirect("/detail/"+body._id);
        } 
        else if (response.statusCode == 400 && body.name && body.name == "ValidationError") {
            res.render('bookCreate', { title: '新增推荐图书', error:"val"});
        }
        else {
            console.log("body.name",body.name);
            info(res, response.statusCode);
        }
    });
};

module.exports.detail = function (req, res) {
    var requestOptions, path;
    path = "/api/book/" + req.params.id;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
    };
    request(requestOptions, function (err, response, body) {
        if (response.statusCode == 200) {
            res.render('detail', { title: body.title, book: body });
        } 
        else {
            info(res, response.statusCode);
        }
    });
};

module.exports.delete = function (req, res) {
    var requestOptions, path;
    path = "/api/book/" + req.params.id;
    console.log(path);
    requestOptions = {
        url: apiOptions.server + path,
        method: "delete",
        json: {},
    };
    request(requestOptions, function (err, response, body) {
        if (response.statusCode == 204) {
            res.json(1);
        } 
        else {
            res.json(0);
        }
    });
};
var fs = require('fs');
var formidable = require('formidable');
module.exports.uploadImg = function (req, res) {
  var form = new formidable.IncomingForm();   //创建上传表单
      form.encoding = 'utf-8';        //设置编辑
      form.uploadDir = 'public/upload/temp/';     //设置上传目录
      form.keepExtensions = true;     //保留后缀
      form.maxFieldsSize = 3 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {
        console.log(files);
        if (err) {
            console.log(err);
          return res.json(0);        
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
            return res.json("/upload/temp/"+ avatarName);
        }
    });
 
};


module.exports.about = function (req, res) {
    res.render('about', { title: 'About' });
};





