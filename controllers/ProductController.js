
let dbs = require('../database/index');

let Product = dbs.product;
let Category = dbs.category;
let Brand = dbs.brand;


let listCategory;
Category.find().exec((err, list) => {
    if (err) item.push(err);
    listCategory = list;
});

let listBrand;
Brand.find().exec((err, list) => {
    if (err) item.push(err);
    listBrand = list;
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
    Product.find({categoryCode: shopId})
    .populate('categoryCode')
    .exec((err, shopItems) => {
        if(err){
            console.log('err shop', err);
        }else{
            res.render('product/store', { listCategory, listBrand, shopItems })
        }
    });
    
}

exports.search = (req, res) => {
    res.render('product/search', { listCategory, listBrand })
}