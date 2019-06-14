const mongoose = require('mongoose');
const dbs = require('../database/index');
let Product = dbs.product;

exports.listProducts = (req, res) =>{
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