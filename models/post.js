const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postSchema = new schema(
    {
        title: { type: String, required: true },
        author: { type: schema.Types.ObjectId, ref: "User" },
        body: { type: String, required: true },
        image: { type: String },
        likes: { type: Number },
        comments: [{ type: schema.Types.ObjectId, ref: "Comment" }]
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Post", postSchema);
