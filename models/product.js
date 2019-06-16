const mongoose = require("mongoose");
const Category= require('../models/category');

productSchema = mongoose.Schema(
    {
        name: String,
        price: Number,
        image: String,
        categoryCode: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)


productSchema.statics.getProductsWithCategory = (idCategory, perPage, pageNumber) => {
    return Product.find({categoryCode: idCategory})
        .limit(perPage)
        .skip(perPage * (pageNumber - 1))
        .populate('categoryCode');
}

productSchema.statics.countAllProducts = (idCategory) => {
    return Product.countDocuments({
        categoryCode: idCategory
    });
}

let Product = mongoose.model('product', productSchema);

module.exports = Product;