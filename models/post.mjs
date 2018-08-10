import mongoose from "mongoose";

var schema = mongoose.Schema;

var postSchema = new schema(
  {
    title: { type: String, required: true },
    author: { type: schema.Types.ObjectId, ref: "User" },
    body: { type: String, required: true },
    image: { type: String },
    keywords: [String],
    likes: { type: Number }
  },
  { timestamps: { createdAt: "created_at" } }
);

export default mongoose.model("Post", postSchema);
