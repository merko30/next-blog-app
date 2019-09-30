const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      min: [12, "Comment is too short"]
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", schema);
