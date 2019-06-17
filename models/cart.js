const mongoose = require("mongoose");

cartSchema = mongoose.Schema(
    {
        idUser:{type: mongoose.Schema.Types.ObjectId, required: true},
        listProduct: {type: Array}
    },
    {
        timestamps: true,
        versionKey: false
    }
)


module.exports = cartSchema;