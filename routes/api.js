const express = require('express');
const router = express.Router();
const api = require('../api');

router.get('/get-products', (req, res) => api.listProducts(req, res));
router.get('/store-pagination', (req, res) => api.storePagination(req, res));

router.get('/get-comments', (req, res) => {
    console.log("call api");
    api.commentsPagination(req, res);
});


module.exports = router;