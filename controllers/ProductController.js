
let dbs = require('../database/index');
const mongoose = require('mongoose');

let Product = dbs.product;
let category = dbs.category;

exports.detail = (req, res) => {
    Product.findById(req.params.id)
    .then(product => {
        res.render('product/detail', product)
    });
}