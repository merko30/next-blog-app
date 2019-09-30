const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 6 },
  name: { type: String },
  email: { type: String, unique: true, required: true },
  avatar: { type: String },
  password: { type: String, required: true, minlength: 8 },
  resetPasswordToken: { type: String },
  passwordTokenExpires: { type: Date },
  verified: { type: Boolean },
  verificationToken: { type: String }
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

schema.methods.generateToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
};

schema.methods.validPassword = async function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", schema);
