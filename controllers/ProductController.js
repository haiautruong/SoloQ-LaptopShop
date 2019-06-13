
let dbs = require('../database/index');

let Product = dbs.product;
let category = dbs.category;

let listCategory;
category.find().exec((err, list) => {
    if (err) item.push(err);
    listCategory = list;
});

exports.detail = (req, res) => {
    Product.findById(req.params.id)
        .populate('category')
        .then(product => {
            console.log('id', req.params.id);
            console.log('pro', product.category);
            console.log('name', product.name);
            console.log('image', product.image);
            console.log('price', product.price);

            res.render('product/detail', { product, listCategory })
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.store = (req, res) => {
    const shopId = req.params.idCategory;
    console.log('idCategory', shopId)
    res.render('product/store', { listCategory })
}