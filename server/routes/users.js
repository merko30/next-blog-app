const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {
  register,
  login,
  getUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updateField,
} = require("../controllers/users");

const authMiddleware = require("../config/authMiddleware");

const userExists = require("../middlewares/userExists");

const middlewares = [authMiddleware, userExists, upload.single("avatar")];

router.post("/register", register);

router.post("/login", login);

router.get("/user", authMiddleware, getUser);

router.put("/update/:field", middlewares, updateField);

router.post("/forgot_password", forgotPassword);

router.post("/reset_password", resetPassword);

router.post("/verify_email", verifyEmail);

module.exports = router;
