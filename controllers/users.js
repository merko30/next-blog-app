const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const sendPasswordResetEmail = require("../utils/sendPasswordResetEmail");
// const sendVerificationEmail = require("../utils/sendVerificationEmail");

const register = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (user) {
      throw new Error("User already exists, check your email or username");
    }
    const newUser = new User(req.body);

    // const verificationToken = crypto.randomBytes(20).toString("hex");
    // newUser.verificationToken = verificationToken;

    await newUser.save();

    // await sendVerificationEmail(newUser, verificationToken);

    res.json({
      ok: true,
      message: "Successfully registered, you can sign in now",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [
        { username: req.body.usernameOrEmail },
        { email: req.body.usernameOrEmail },
      ],
    });
    if (user) {
      if (await user.validPassword(req.body.password)) {
        // let message = !user.verified ? "Please verify your account!" : null;

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24,
        });

        res.json({ message: "Logged in" });
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
    const user = await User.findById(req.userId).select("-password");
    // let message = !user.verified ? "Please, verify your account!" : null;
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
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
    const token = crypto.randomBytes(20).toString("hex");

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
    const user = await User.findOne({ resetPasswordToken: req.query.token });

    if (user) {
      if (user.resetPasswordExpires - Date.now() > 3600000) {
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

const updateField = async (req, res, next) => {
  const { field } = req.params;
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }
    if (field === "avatar") {
      if (req.file) {
        user[field] = req.file.filename;
      }
    } else {
      user[field] = req.body[field];
    }
    const updated = await user.save();
    res.json({
      user: updated,
      message: `${
        field.substring(0, 1).toUpperCase() + field.substring(1)
      } is successfully updated`,
    });
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
  verifyEmail,
  updateField,
};
