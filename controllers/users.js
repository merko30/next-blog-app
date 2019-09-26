const User = require("../models/user");

const register = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }]
    });
    if (user) {
      throw new Error("User already exists, check your email or username");
    }
    const newUser = new User(req.body);

    if (req.file) {
      newUser.avatar = req.file;
    }

    await newUser.save();
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [
        { username: req.body.usernameOrEmail },
        { email: req.body.usernameOrEmail }
      ]
    });
    if (user) {
      if (user.validPassword(req.body.password)) {
        const token = user.generateToken();
        res.json({ token });
      } else {
        throw new Error("Wrong password");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUser
};