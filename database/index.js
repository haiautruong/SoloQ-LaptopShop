const mongoose = require('mongoose');
const categorySchema = require("../models/category");
const productSchema = require("../models/product");
const url = "mongodb+srv://admin0:1234567890@webshop-xftef.mongodb.net/laptop-shop";
//const url = "mongodb://127.0.0.1:27017/laptop-shop";

mongoose.connect(
  url, 
  { 
      useNewUrlParser: true
   }
);


const product = mongoose.model("product", productSchema);
const category = mongoose.model("category", categorySchema);

module.exports = {
  product,
  category
}