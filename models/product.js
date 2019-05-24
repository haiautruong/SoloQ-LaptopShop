const mongoose = require("mongoose");

productSchema =  mongoose.Schema(
    {
        name: String,
        price: Number,
        image: String
    }
)

module.exports = productSchema;