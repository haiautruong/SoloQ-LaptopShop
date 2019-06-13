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

// exports.index = (req, res) => {
//     console.log("Show session", req.session);
//     console.log("Show user", req.user);
//     if (req.session.userId) {
//         let userSession = req.session;
//         console.log('userSession', userSession);
//         console.log('username', userSession.username);
//         res.render('index', { listProduct, listCategory, userSession })
//     } else {
//         res.render('index', { listProduct, listCategory })
//     }
// }

exports.index = (req, res) => {
    if (req.session.passport && req.user) {
        const userSession = req.user;
        res.render('layouts/index', { listProduct, listCategory, userSession })
    } else {
        console.log("Render abc");
        res.render('layouts/index', { listProduct, listCategory })
    }
}














