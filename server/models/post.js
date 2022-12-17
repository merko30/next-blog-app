const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 10 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    body: { type: String, required: true, minlength: 150 },
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    slug: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", schema);
