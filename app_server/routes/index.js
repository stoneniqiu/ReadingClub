var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');

router.get('/', homeController.index);
router.get('/about', homeController.about);
router.get('/books', homeController.books);
router.get('/detail/:id', homeController.detail);


module.exports = router;


