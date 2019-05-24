const mongoose = require("mongoose");

const category = new mongoose.Schema(
    {
        name: String
    }
)

module.exports = category;