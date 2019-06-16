const mongoose = require('mongoose');
const dbs = require('../database/index');
let Product = dbs.product;

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
            console.log(docs.length);
            res.send(docs);
        });


}

exports.storePagination = (req, res) => {
    try {

        let perPage = parseInt(req.query.pageSize);
        let page = Math.max(0, parseInt(req.query.pageNumber));

        Product.getProductsWithCategory(req.params.id, perPage, page).exec((err, products) => {
            if (err) {
                res.status(500);
                res.send(err.message);
                console.log(err);
            }
            else {
                Product.countAllProducts(req.params.id).exec((err, count) => {
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


    // Product.find({
    //     categoryCode: req.params.id
    // })
    // .limit(perPage)
    // .skip(perPage * (page - 1))
    // .populate('categoryCode')
    // .exec(function(err, products) {
    //     if(err){
    //         console.log("api: find: ", err);
    //     }
    //     else{
    //         Product.countDocuments({
    //             categoryCode: req.params.id
    //         }).exec(function(err, count) {
    //             if(err){
    //                 console.log("api: err count", err)

    //             }
    //             else{
    //                 page = {
    //                     products: products,
    //                     pageNumber: page,
    //                     total: count
    //                 }

    //                 res.send(page);
    //             }
    //         })
    //     }
    // })
}