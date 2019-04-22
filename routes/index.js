var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SoloQ Laptop Shop' });
});

/* GET detail product page. */
router.get('/detail-product', function(req, res, next) {
  res.render('product/product-detail', { title: 'Detail product' });
});

module.exports = router;
