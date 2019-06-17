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

brandSchema.statics.getAllBrands = () => {
    return Brand.find();
}


const Brand = mongoose.model('brand', brandSchema);

module.exports = Brand;