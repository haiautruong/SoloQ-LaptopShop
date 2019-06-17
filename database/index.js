'use strict';

const mongoose = require('mongoose');
const category = require("../models/category");
const product = require("../models/product");
const user = require("../models/user");
const brand = require("../models/brand");
const comment = require("../models/comment");
const transaction = require("../models/transaction");



// const url = "mongodb+srv://admin0:1234567890@webshop-xftef.mongodb.net/laptop-shop";
const url = "mongodb://127.0.0.1:27017/laptop-shop";

mongoose.connect(
  url,
  {
    useNewUrlParser: true
  }
);

mongoose.set('useCreateIndex', true);

// const product = mongoose.model("product", productSchema);
// const category = mongoose.model("category", categorySchema);
// const brand = mongoose.model("brand", brandSchema);


module.exports = {
  product,
  category,
  user,
  brand,
  comment,
  transaction
}