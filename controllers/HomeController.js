const Product = require('../models/product');
const Category = require('../models/category');
const express = require('express');

const app = express();

class HomeControllers{
    index(req,res){
        let product = res.app.productModel;
        let category = res.app.categoryModel;
        let vm = null;

        let allProducts = product.getAllProduct();
        let allCategories = category.getAllCategories();

        Promise.all([allProducts, allCategories]).then(([listPro, listCate]) => {
            vm = {
                listAllProducts: listPro,
                listAllCategories: listCate
            }

            res.render("index", vm);
        });
    }
}
module.exports = HomeControllers;