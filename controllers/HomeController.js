const dbs = require('../database/index');
let product = dbs.product;
let category = dbs.category;
let user = dbs.user;

let listCategory;
category.find()
    .exec((err, list) => {
        if (err) 
            item.push(err);
        listCategory = list;
    });

let listProduct;
product.find()
    .exec((err, list) => {
        if (err) 
            item.push(err);
        listProduct = list;
    });

exports.index = (req, res) => {
    if(req.session.userId){
        let userSession = req.session;
        console.log('userSession',userSession);
        console.log('username', userSession.username);
        res.render('index', {listProduct, listCategory, userSession})
    }else{
        res.render('layouts/index', {listProduct, listCategory})
    }
}
















