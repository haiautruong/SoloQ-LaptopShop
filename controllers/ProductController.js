
let dbs = require('../database/index');
const mongoose = require('mongoose');

let Product = dbs.product;
let category = dbs.category;

exports.detail = (req, res) => {
    Product.findById(req.params.id)
    .populate('category')
    .then(product => {
        console.log('id', req.params.id);
        console.log('pro', product.category);
        console.log('name', product.name);
        console.log('image', product.image);
        console.log('price', product.price);

        res.render('product/detail', {product})
    })
    .catch((err) => {
        console.log(err);
    });
}