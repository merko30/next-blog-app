const express = require("express");
const router = express.Router();

const authMiddleware = require("../config/authMiddleware");
const upload = require("../config/multer");

const {
  getAll,
  create,
  getOne,
  update,
  remove,
  likePost,
  getUsersPosts,
} = require("../controllers/posts");

const middlewares = [authMiddleware, upload.single("image")];

router.route("/").get(getAll).post(middlewares, create);

router.get("/user", authMiddleware, getUsersPosts);

router
  .route("/:id")
  .get(getOne)
  .put(middlewares, update)
  .delete(middlewares, remove);

router.route("/:id/like").put(authMiddleware, likePost);

module.exports = router;
