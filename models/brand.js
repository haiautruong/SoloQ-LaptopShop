const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
    {
        name: String
    },
    {
        timestamps: true,
        versionKey: false
    }
)



const Brand = mongoose.model('brand', brandSchema);

module.exports = Brand;