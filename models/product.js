const mongoose = require("mongoose");
const CategorySchema = require('../models/category');

let Category = mongoose.model('category', CategorySchema)

productSchema = mongoose.Schema(
    {
        name: String,
        price: Number,
        image: String,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = productSchema;