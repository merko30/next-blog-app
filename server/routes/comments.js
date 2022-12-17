const router = require("express").Router();

const authMiddleware = require("../config/authMiddleware");

const { create, update, remove } = require("../controllers/comments");

router.route("/").post(authMiddleware, create);

router
  .route("/:commentId")
  .put(authMiddleware, update)
  .delete(authMiddleware, remove);

module.exports = router;
