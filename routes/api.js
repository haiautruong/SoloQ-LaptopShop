const express = require('express');
const router = express.Router();
const api = require('../api');

router.get('/get-products', (req, res) => api.listProducts(req,res));

module.exports = router;