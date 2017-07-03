var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'sandbox', main: 'vote' });
});

/* GET home page. */
router.get('/scores', function(req, res, next) {
  res.render('scores', { title: 'sandbox scores', main: 'scores' });
});

module.exports = router;
