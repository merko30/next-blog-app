const Comment = require("../models/comment");
const Post = require("../models/post");

const create = async (req, res, next) => {
  try {
    const { postId, ...data } = req.body;

    const comment = await new Comment({ ...data, author: req.userId }).save();
    const post = await Post.findById(postId);
    post.comments = [...post.comments, comment];
    await post.save();

    await comment.populate("author", "-password");

    res.json({ comment });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    ).populate("author");
    res.json({ comment });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    // const post = await Post.findById(comment);
    // post.comments = post.comments.filter(
    //   (comment) => comment._id !== req.params.commentId
    // );
    // await post.save();
    res.json({ comment });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  update,
  remove,
};
