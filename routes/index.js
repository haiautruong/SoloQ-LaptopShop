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

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('user/login', { title: 'Login' });
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('user/signup', { title: 'Signup' });
});

/* GET forget password page. */
router.get('/forget-password', function(req, res, next) {
  res.render('user/forgetPass', { title: 'Forget password' });
});
module.exports = router;
