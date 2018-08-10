import mongoose from "mongoose";
var schema = mongoose.Schema;

var commentSchema = new schema(
  {
    comment: { type: String, required: true },
    postID: { type: String, required: true },
    author: { type: schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: { createdAt: "created_at" } }
);

export default mongoose.model("Comment", commentSchema);
