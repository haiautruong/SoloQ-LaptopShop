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
        user.findById(req.session.userId)
            .exec((err, person) => {
                if (err) {
                    username = null;
                } else {
                let username = person.name.split(" ");
                    console.log('name', username);
                    username = username[0] + " " + username[username.length - 1];
                    res.render('index', {listProduct, listCategory, username})
                }
            });
    }else{
        res.render('index', {listProduct, listCategory})
    }  
}
























// class HomeControllers{
//     index(req,res){
//         let product = res.app.productModel;
//         let category = res.app.categoryModel;
//         let vm = null;

//         let allProducts = product.getAllProduct();
//         let allCategories = category.getAllCategories();

//         Promise.all([allProducts, allCategories]).then(([listPro, listCate]) => {
//             vm = {
//                 listAllProducts: listPro,
//                 listAllCategories: listCate
//             }

//             res.render("index", vm);
//         });
//     }
// }
// module.exports = HomeControllers;