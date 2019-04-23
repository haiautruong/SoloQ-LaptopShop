var express = require('express');
var router = express.Router();

router.get('/detail', (req, res) => {
  res.render('product/product-detail');
  
});

module.exports = router;