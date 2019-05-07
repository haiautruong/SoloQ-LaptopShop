var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('user/login', { title: 'Login' });
});

router.get('/sign-up', function(req, res, next) {
  res.render('user/signup',{ title: 'Sign up' });
});

router.get('/forget-pass', function(req, res, next) {
  res.render('user/forgetPass', { title: 'Forget password' });
});

router.get('/update-profile', function(req, res, next) {
  res.render('user/updateInfo', { title: 'Update profile' });
});

module.exports = router;
