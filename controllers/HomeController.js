const dbs = require('../database/index');
let Product = dbs.product;
let Category = dbs.category;

let Brand = dbs.brand;


let listCategory;
Category.find()
    .exec((err, list) => {
        if (err)
            item.push(err);
        listCategory = list;
    });


let listBrand;
Brand.find()
    .exec((err, list) => {
        if (err)
            item.push(err);
        listBrand = list;
    });

let listProduct;
Product.find()
    .exec((err, list) => {
        if (err)
            item.push(err);
        listProduct = list;
    });

exports.index = (req, res) => {
    if (req.session.passport && req.user) {
        const userSession = req.user;
        res.render('layouts/index', { listProduct, listCategory, userSession, listBrand })
    } else {
        console.log("Render abc");
        res.render('layouts/index', { listProduct, listCategory, listBrand })
    }
}