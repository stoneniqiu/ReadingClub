var express = require('express');
var router = express.Router();
var bookCtrl = require('../controllers/book');
var topicCtrl = require('../controllers/topic');

router.get('/books', bookCtrl.books);
router.post('/book', bookCtrl.bookCreate);
router.get('/book/:bookid', bookCtrl.bookReadOne);
router.put('/books/:bookid', bookCtrl.bookUpdateOne);
router.delete('/books/:bookid', bookCtrl.bookDeleteOne);

//topics
router.get('/topics', topicCtrl.topics);


module.exports = router;




