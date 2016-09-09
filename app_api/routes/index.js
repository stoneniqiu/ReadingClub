var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var bookCtrl = require('../controllers/book');
var topicCtrl = require('../controllers/topic');
var ctrlAuth = require('../controllers/authentication');

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


router.get('/books', bookCtrl.books);
router.post('/book', auth, bookCtrl.bookCreate);
router.get('/book/:bookid', bookCtrl.bookReadOne);
router.put('/books/:bookid', auth, bookCtrl.bookUpdateOne);
router.delete('/book/:bookid', auth, bookCtrl.bookDeleteOne);

//topics
router.get('/topics', topicCtrl.topics);

router.post('/uploadImg', bookCtrl.uploadImg);

module.exports = router;




