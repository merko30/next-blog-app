const express = require("express");

const router = express.Router();

const posts = require("./posts");
const comments = require("./comments");
const users = require("./users");

router.use("/posts", posts);
router.use("/comments", comments);
router.use("/auth", users);

module.exports = router;
