var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    info: { type: String, required: true },
    img: String,
    tags: [String],
    brief: { type: String, required: true },
    ISBN: String,
});

var userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    createdOn: {
        type: Date,
        default: Date.now
    },
    img: String,
    ip: String,
    mobile: String
});

var commentSchema = new mongoose.Schema({
    user: userSchema,
    createdOn: {
        type: Date,
        default: Date.now
    },
    content: String
});
var topicSchema = new mongoose.Schema({
    title: String,
    type: String,
    visitedCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    createdOn: {
        type: Date,
        default: Date.now
    },
    img: String,
    author: String,
    content: String,
    comments: [commentSchema],
    deleted: { type: Boolean, default: false },
    top: { type: Boolean, default: false }, // ÖÃ¶¥Ìû
    good: { type: Boolean, default: false }, // ¾«»ªÌû
});



mongoose.model('Book', bookSchema);
mongoose.model('Topic', topicSchema);

