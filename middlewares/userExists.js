const User = require("../models/user");

const userExists = async (req, res, next) => {
  try {
    if (req.body.username) {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        throw new Error("Username is already taken");
      } else {
        next();
      }
    }

    if (req.body.email) {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        throw new Error("Email is already taken");
      } else {
        next();
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userExists;
