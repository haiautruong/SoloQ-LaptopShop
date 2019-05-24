const dbs = require('../database/index');
let product = dbs.product;
let category = dbs.category;

exports.index = (req, res) => {
    product.find().exec((err, listProduct) => {
        if(err) item.push(err);
        console.log('listProduct', listProduct);

    category.find().exec((err, listCategory) => {
        if(err) item.push(err);
        res.render('index', {listProduct, listCategory})
        })
    })  
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