const mongoose = require("mongoose");

const user = new mongoose.Schema(
    {
        email: {type: String, required: true, lowercase: true, unique: true},
        password: {type: String, required: true},
        name: {type: String},
        phone: {type: String, required: true},
        address: {type: String, required: true}
    },
    
    {timestamps: true}
)

module.exports = user;