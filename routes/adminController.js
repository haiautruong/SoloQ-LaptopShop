var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var vm = {
    title: 'Admin Home',
    layout: 'admin.handlebars'
};  
    res.render('admin/index', vm);
  });

module.exports = router;