const express = require("express");
const router = express.Router();
const passport = require("passport");

const upload = require("../config/multer");

const { register, login, getUser } = require("../controllers/users");

router.post("/register", upload.single("avatar"), register);

router.post("/login", login);

router.get("/:id", passport.authenticate("jwt", { session: false }), getUser);

module.exports = router;
