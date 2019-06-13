const mongoose = require("mongoose");

const category = new mongoose.Schema(
    {
        name: String
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = category;