const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        name: String
    },
    {
        timestamps: true,
        versionKey: false
    }
)

CategorySchema.statics.getAllCategories = () => {
    return Category.find();
}


const Category = mongoose.model('category', CategorySchema);

module.exports = Category;