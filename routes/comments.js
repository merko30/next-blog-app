const router = require("express").Router();
const passport = require("passport");

const { create, update, remove } = require("../controllers/comments");

const middleware = passport.authenticate("jwt", { session: false });

router.route("/postID").post(middleware, create);

router
  .route("/:postID/:commentID")
  .put(middleware, update)
  .delete(middleware, remove);

module.exports = router;
