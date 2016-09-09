var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.register = function(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        console.log("name", req.body.name);
        console.log("email", req.body.email);
        console.log("password", req.body.password);
        sendJSONresponse(res, 400, { message: "请完成所有字段" });
        return;
    }
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function(err) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, { 'token': token });
        }

    });
};
module.exports.login = function(req, res) {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, { message: '请输入邮箱和密码!' });
        return;
    }
    passport.authenticate('local', function(err, user, info) {
        var token;
        if (err) {
            sendJSONresponse(err, 404, err);
            return;
        }
        if (user) {
            token = user.generateJwt();
            sendJSONresponse(res, 200, { token: token });
        } else {
            sendJSONresponse(res, 401, info);
        }

    })(req,res);
};