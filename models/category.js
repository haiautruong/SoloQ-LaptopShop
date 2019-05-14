const Database = require('../database/index');


const COLLECTION = 'category';
class Category{
    
    constructor(db){
        this.db = db;
    }

    getAllCategories(){
        return Database.find(this.db, COLLECTION);
    }
}

module.exports = Category;