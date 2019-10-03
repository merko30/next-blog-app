const express = require("express");
const router = express.Router();
const passport = require("passport");

const upload = require("../config/multer");

const {
  register,
  login,
  getUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updateField
} = require("../controllers/users");

const userExists = require("../middlewares/userExists");

const middlewares = [
  passport.authenticate("jwt", { session: false }),
  userExists,
  upload.single("avatar")
];

router.post("/register", upload.single("avatar"), register);

router.post("/login", login);

router.get("/user", passport.authenticate("jwt", { session: false }), getUser);

router.put("/update/:field", middlewares, updateField);

router.post("/forgot_password", forgotPassword);

router.post("/reset_password", resetPassword);

router.post("/verify_email", verifyEmail);

module.exports = router;
