var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var vm = {
    title: 'Admin Home',
    layout: 'admin.handlebars'
  };  
    res.render('admin/index', vm);
});

router.get('/order', function(req, res) {
  var vm = {
    title: 'Manage Order',
    layout: 'admin.handlebars'
  };  
    res.render('admin/order', vm);
});

router.get('/user', function(req, res) {
  var vm = {
    title: 'Manage User',
    layout: 'admin.handlebars'
  };  
    res.render('admin/user', vm);
});

router.get('/product', function(req, res) {
  var vm = {
    title: 'Manage Product',
    layout: 'admin.handlebars'
  };  
    res.render('admin/product', vm);
});

module.exports = router;