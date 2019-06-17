const mongoose = require("mongoose");

let commentSchema = mongoose.Schema(
    {
        idProduct: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String },
        rating: { type: Number },
        comment: { type: String },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

commentSchema.statics.getComments = (id, perPage, pageNumber) => {
    const query = {
        idProduct: id
    };

    return Comment.find(query)
        .limit(perPage)
        .skip(perPage * (pageNumber - 1))
        .sort({
            createdAt: -1
        });
}

commentSchema.statics.countAllComments = (id) => {
    let query = {idProduct : id};

    return Comment.countDocuments(query);
}

let Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;