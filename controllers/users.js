const crypto = require("crypto");

const User = require("../models/user");

const sendPasswordResetEmail = require("../utils/sendPasswordResetEmail");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

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
      newUser.avatar = req.file.filename;
    }
    const verificationToken = crypto.randomBytes(20).toString("hex");
    newUser.verificationToken = verificationToken;

    await newUser.save();

    await sendVerificationEmail(newUser, verificationToken);

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
    }).select("-password");
    if (user) {
      if (user.validPassword(req.body.password)) {
        const token = user.generateToken();
        res.json({ token, user });
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

const verifyEmail = async (req, res, next) => {
  console.log(req.query);
  const { email, token } = req.query;

  try {
    const user = await User.findOne({ email });

    if (user.verified) {
      res.json({ message: "User is already verified" });
    }

    if (user.verificationToken == token) {
      user.verified = true;
      user.verificationToken = null;
      await user.save();
      res.json({ message: "You have successfully verified your account" });
    }
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const token = crypto.randomBytes(20, (err, buff) => buff.toString("hex"));

    console.log(token);

    const user = await User.findOne({ email });

    if (user) {
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      user.save();

      await sendPasswordResetEmail(user, token);

      res.json({ message: "Email has been sent, check your inbox!" });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ resetPasswordToken: req.params.token });

    if (user) {
      if (user.resetPasswordExpires - Date.now() < 3600000) {
        throw new Error("Link has expired. Request a new reset link");
      } else {
        user.password = req.body.password;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.json({ message: "Password has been updated." });
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUser,
  forgotPassword,
  resetPassword,
  verifyEmail
};
