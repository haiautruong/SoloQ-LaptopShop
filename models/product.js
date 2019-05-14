const Database = require('../database/index');


const COLLECTION = 'product';
class Product {

    constructor(db){
        this.db = db;
    }

    getAllProduct(){
        return Database.find(this.db, COLLECTION);
    }

    getNewProducts(amount){

        let product = {
            category : 2
        };
        //for
        let category = categoryModel.getCategory(product.category);
        product.category = category;

        let product = {
            category : {
                id: 2,
                name: 'abc'
            }
        };

    return products;
    }

}

module.exports = Product;