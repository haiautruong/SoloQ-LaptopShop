const mongoose = require("mongoose");

const brand = new mongoose.Schema(
    {
        name: String
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = brand;