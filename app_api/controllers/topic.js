var mongoose = require('mongoose');
var TopicModel = mongoose.model('Topic');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.topics = function(req, res) {
    TopicModel.find().exec(function(err, topic) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
            return;
        }
        sendJSONresponse(res, 200, topic);
    });
};
