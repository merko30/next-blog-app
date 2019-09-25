const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 5 },
  name: { type: String },
  email: { type: String, unique: true, required: true },
  avatar: { type: String },
  password: { type: String, required: true }
});

schema.pre("save", function(next) {
  var user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) throw err;
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", schema);
