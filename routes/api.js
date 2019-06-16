const express = require('express');
const router = express.Router();
const api = require('../api');

router.get('/get-products', (req, res) => api.listProducts(req,res));
router.get('/store-pagination/:id', (req, res) => api.storePagination(req,res));

module.exports = router;