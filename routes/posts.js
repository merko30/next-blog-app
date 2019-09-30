const express = require("express");
const router = express.Router();
const passport = require("passport");

const upload = require("../config/multer");

const {
  getAll,
  create,
  getOne,
  update,
  remove,
  likePost
} = require("../controllers/posts");

const middlewares = [
  passport.authenticate("jwt", { session: false }),
  upload.single("image")
];

router
  .route("/")
  .get(getAll)
  .post(middlewares, create);

router
  .route("/:id")
  .get(getOne)
  .put(middlewares, update)
  .delete(middlewares, remove);

router
  .route("/:id/like")
  .put(passport.authenticate("jwt", { session: false }), likePost);

module.exports = router;
