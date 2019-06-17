
let dbs = require('../database/index');

let Product = dbs.product;
let Comment = dbs.comment;
let Brand = dbs.brand;
const Category = dbs.category;

exports.detail = (req, res) => {
    Product.getProduct(req.params.id).exec((err, product) => {
        if (err) {
            console.log(err);
        }
        else {
            Product.getProducts('category', product.categoryCode).limit(4).exec((err, listRelated) => {
                if (err) {
                    console.log("related: ", err);
                }
                else {
                    let user = req.user;
                    console.log("ABC", user);
                    res.render('product/detail', { product, listRelated, userSession: user });
                }
            });
        }
    })
}

exports.store = (req, res) => {
    Category.getAllCategories().exec((err, listCategory) => {
        if (err) {
            console.log(err);
        } else {
            Brand.getAllBrands().exec((err, listBrand) => {
                if (err) {
                    console.log(err);
                }
                res.render('product/store', { listCategory, listBrand })
            });
        }
    });
}

exports.search = (req, res) => {
    Category.getAllCategories().exec((err, listCategory) => {
        if (err) {
            console.log(err);
        } else {
            Brand.getAllBrands().exec((err, listBrand) => {
                if (err) {
                    console.log(err);
                }
                res.render('product/search', { listCategory, listBrand })
            });
        }
    });
}

exports.comments = (req, res) => {
    console.log("body", req.body);
    const idProduct = req.body.idProduct;
    const name = req.body.name;
    const comment = req.body.comment;
    const rating = req.body.rating;

    const newComment = new Comment({
        idProduct,
        name,
        rating,
        comment
    });

    newComment.save((err) => {
        res.redirect(`/product/detail/${idProduct}`);
    });
}