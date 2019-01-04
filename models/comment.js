const mongoose = require("mongoose");
const schema = mongoose.Schema;

const commentSchema = new schema(
  {
    comment: { type: String, required: true },
    author: { type: schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Comment", commentSchema);
