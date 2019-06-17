const mongoose = require('mongoose');
const dbs = require('../database/index');
let Product = dbs.product;
let Comment = dbs.comment;

exports.listProducts = (req, res) => {
    console.log(req.query.list_products);
    //console.log("ABC", req.query);
    let arr = req.query.list_products;
    console.log('arr', arr);

    let listIdProduct = arr.map(elm => {
        return mongoose.Types.ObjectId(elm.idCart);
    });

    Product.find({
        '_id': {
            $in: listIdProduct
        }
    }).populate('categoryCode')
        .exec((err, docs) => {
            console.log(docs);
            res.send(docs);
        });


}

exports.storePagination = (req, res) => {
    try {

        let perPage = parseInt(req.query.pageSize);
        let page = Math.max(0, parseInt(req.query.pageNumber));
        let type = req.query.name;
        let id = req.query.id;


        Product.getProducts(type, id, perPage, page).exec((err, products) => {
            if (err) {
                res.status(500);
                res.send(err.message);
                console.log(err);
            }
            else {
                Product.countAllProducts(type, id).exec((err, count) => {
                    if (err) {
                        res.status(500);
                        res.send(err.message);
                        console.log(err)
                    }
                    else {
                        const data = {
                            products: products,
                            pageNumber: page,
                            total: count
                        }

                        res.send(data);
                    }
                })
            }
        });
    } catch (e) {
        res.status(500);
        res.send(e.message);
        console.log(e.message);
    }
}

exports.commentsPagination = (req, res) => {
    try {

        let perPage = parseInt(req.query.pageSize);
        let page = Math.max(0, parseInt(req.query.pageNumber));

        let id = req.query.id;


        Comment.getComments(id, perPage, page).exec((err, comments) => {
            if (err) {
                res.status(500);
                res.send(err.message);
                console.log(err);
            }
            else {
                Comment.countAllComments(id).exec((err, count) => {
                    if (err) {
                        res.status(500);
                        res.send(err.message);
                        console.log(err)
                    }
                    else {
                        const data = {
                            comments: comments,
                            pageNumber: page,
                            total: count
                        }
                        res.send(data);
                    }
                })
            }
        });
    } catch (e) {
        res.status(500);
        res.send(e.message);
        console.log(e.message);
    }
}