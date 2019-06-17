const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
    {
        idUser: { type: mongoose.Schema.Types.ObjectId, required: true },
        listProducts: Array,
        total: Number,
        address: String,
        status: Number, // -1 Đang xử lý, 0 Đang giao, 1 Đã giao,
        phone: String
    },
    {
        timestamps: true,
        versionKey: false
    }
)

transactionSchema.statics.gettransaction = (idUser) => {
    const query = {
        idUser: idUser
    };

    return Transaction.find(query)
        .sort({
            createdAt: -1
        });
}

let Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;