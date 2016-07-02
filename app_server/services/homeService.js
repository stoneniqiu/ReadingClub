var mongoose = require('mongoose');
var db = require('../../app_api/models/db.js');
var Bookmodel = mongoose.model('Book');
var Topicmodel = mongoose.model('Topic');


var jsonResult = function (status, content) {
    return { status: status, content: content };
};

module.exports.bookReadOne = function (id,callback) {
    console.log('Finding book details', id);
    if (!id) {
        console.log('No bookid specified');
        return jsonResult(404, { "message": "No bookid specified" });
    }
    Bookmodel.findById(id).exec(function (err, book) {
        if (err) {
            callback(jsonResult(404, err));
            return;
        }
        if (!book) {
            callback(jsonResult(404, { "message": "book not found" }));
            return;
        }
       callback(jsonResult(200, book));
    });

};
module.exports.allBooks=function(callback) {
    Bookmodel.find().exec(function (err, books) {
        if (err) {
            callback(jsonResult(404, err));
            return;
        }
        if (!books.length) {
            callback(jsonResult(404, { "message": "books not found" }));
            return;
        }
        callback(jsonResult(200, books));
    });
}
module.exports.createBook = function (book, callback) {
    var t = new Bookmodel(book);
    t.save(function (err) {
        callback(err);
    });
}

module.exports.allTopics=function(callback) {
    Topicmodel.find().exec(function (err, topics) {
        if (err) {
            callback(jsonResult(404, err));
            return;
        }
        if (!topics.length) {
            callback(jsonResult(404, { "message": "topics not found" }));
            return;
        }
        callback(jsonResult(200, topics));
    });
}

module.exports.createTopic=function(topic, callback) {
    var t = new Topicmodel(topic);
    t.save(function(err) {
        callback(err);
    });
}


var books = [
    {
        id: 0,
        title: "深入浅出Node.js",
        info: "朴灵 / 人民邮电出版社 / 2013-12-1 / CNY 69.00",
        rating: 5,
        img: "https://img3.doubanio.com/mpic/s27269296.jpg",
        tags: ["node", "深入浅出"],
        brief: '本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node 的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer 的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node 构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。本书适合想深入了解 Node 的人员阅读。'
        ,ISBN: 9787115335500
    },
    {
        id: 1,
        title: "程序员修炼之道 : 从小工到专家",
        info: "Andrew Hunt、David Thomas / 马维达 / 电子工业出版社 / 2005-1 / 48.00元",
        rating: 5,
        img: "https://img3.doubanio.com/mpic/s3957863.jpg",
        tags: ["程序人生", "软件开发"],
        brief: '《程序员修炼之道》由一系列的独立的部分组成，涵盖的主题从个人责任、职业发展，直到用于使代码保持灵活、并且易于改编和复用的各种架构技术。利用许多富有娱乐性的奇闻轶事、有思想性的例子以及有趣的类比，全面阐释了软件开发的许多不同方面的最佳实践和重大陷阱。无论你是初学者，是有经验的程序员，还是软件项目经理，本书都适合你阅读。'
        ,ISBN: 9787505397194
    },
    {
        id: 2,
        title: "Getting MEAN with Mongo, Express, Angular, and Node",
        info: "Simon Holmes / Manning Publications / 2015-11-26 / USD 44.99",
        rating: 4,
        img: "https://img3.doubanio.com/mpic/s27676844.jpg",
        tags: ["node", "web开发", "编程"],
        brief: 'MEAN栈开发,比较详尽的的应用开发书籍'
        , ISBN: 9781617292033
    }
];
var topics = [
    {
        title: "书山有路第十一期：程序员修炼之道-第二章-注重实效的途径--第五天",
        type: "读书",
        visitedCount: 80,
        commentCount: 2,
        createdOn: '2016/5/15 21:32',
        author: 'stoneniqiu',
        img: 'http://upload.jianshu.io/users/upload_avatars/133630/d5370e672fd4.png?imageMogr/thumbnail/90x90/quality/100'
    },
    {
        title: "《明朝那些事儿》之闲言散语",
        type: "书评",
        visitedCount: 180,
        commentCount: 20,
        createdOn: '2016/5/15 21:32',
        author: '卡卡卡萨布兰卡 ',
        img: 'http://upload.jianshu.io/users/upload_avatars/1675188/2d0810ccc03d.jpg?imageMogr/thumbnail/90x90/quality/100'
    },
    {
        title: "有《程序员修炼之道》高清版吗？",
        type: "求书",
        visitedCount: 90,
        commentCount: 1,
        createdOn: '2016/5/15 21:32',
        author: '吾不知 ',
        img: 'http://upload.jianshu.io/users/upload_avatars/1125491/3910f3825f73.jpg?imageMogr/thumbnail/90x90/quality/100',
    },
    {
        title: "《国富论》-读书笔记",
        type: "书评",
        visitedCount: 180,
        commentCount: 20,
        createdOn: '2016/5/15 21:32',
        author: '寻海 '
        ,img: 'http://upload.jianshu.io/users/upload_avatars/133630/d5370e672fd4.png?imageMogr/thumbnail/90x90/quality/100'
    },
    {
        title: "《高效人士的七个习惯》读书笔记",
        type: "书评",
        visitedCount: 180,
        commentCount: 20,
        createdOn: '2016/5/15 21:32',
        author: '书虫纪庆 ',
        img: 'http://upload.jianshu.io/users/upload_avatars/1429280/454c495361f9.jpg?imageMogr/thumbnail/90x90/quality/100'
    },
    {
        title: "《css揭秘》这本书如何",
        type: "求索",
        visitedCount: 58,
        commentCount: 3,
        createdOn: '2016/5/15 21:32',
        author: 'Watery_D_Lotus ',
        img: 'http://upload.jianshu.io/users/upload_avatars/1449533/a2d98762484a.jpg?imageMogr/thumbnail/90x90/quality/100'
    }
];



//module.exports.bookCreate = function (req, res) {
//    var book = {
//        title: "test",
//        info: "Simon Holmes / Manning Publications / 2015-11-26 / USD 44.99",
//        rating: 4,
//        img: "https://img3.doubanio.com/mpic/s27676844.jpg",
//        tags: ["node", "web开发", "编程"],
//        brief: 'MEAN栈开发,比较详尽的的应用开发书籍',
//        ISBN: 9781617292033
//    };
//    var b = new Bookmodel(book);
//    b.save(function (err) {
//        if (err) {
//            console.log(err);
//            res.render('error', {
//                message: err.message,
//                error: err
//            });
//        }
//        res.render('info', { message: "添加成功！", success: true });
//    });

//};
//module.exports.bookDelete = function (req, res) {
//    Bookmodel.findOneAndRemove({ title: "test" }, function (err) {
//        if (err) {
//            console.log(err);
//            res.render('error', {
//                message: err.message,
//                error: err
//            });
//        }
//        res.render('info', { message: "删除成功！", success: true });
//    });
//};




