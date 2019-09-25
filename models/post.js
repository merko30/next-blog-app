const mongoose = require("mongoose");


const schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        body: { type: String, required: true },
        image: { type: String },
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", schema);
