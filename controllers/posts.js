const Post = require("../models/post");
const paginate = require("../utils/paginate");

const getAll = async (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;
  try {
    const response = await paginate(
      Post,
      null,
      { perPage, page },
      { createdAt: "desc" },
      [{ path: "author", select: "-password" }]
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

getUsersPosts = async (req, res, next) => {
  const page = req.query.page;
  const perPage = req.query.perPage || 3;
  try {
    const response = await paginate(
      Post,
      { author: req.user._id },
      { page, perPage },
      { createdAt: "desc" },
      []
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)

      .populate("author", "-password")
      .populate({
        path: "comments",
        populate: { path: "author", model: "User", select: "-password" }
      });
    res.json({ post });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const post = new Post({ ...req.body, author: req.user._id });
    if (req.file) {
      post.image = req.file.filename;
    }
    await post.save();
    res.json({ post });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (req.file != null) {
      post.image = req.file.filename;
    }
    await post.save();
    res.json({ post });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const post = Post.findByIdAndDelete(req.params.id);
    res.json({ post });
  } catch (error) {
    next(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id)
      .populate("author", "-password")
      .populate({
        path: "comments",
        populate: { path: "author", model: "User", select: "-password" }
      });

    if (post) {
      const likes = post.likes.map(like => like.toString());
      if (!likes.includes(req.user._id.toString())) {
        post.likes = [...post.likes, req.user._id];
      } else {
        const newLikes = likes.filter(like => like !== req.user._id.toString());
        post.likes = newLikes;
      }
      await post.save();
      res.json({ post });
    } else {
      throw new Error("Post not found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  likePost,
  getUsersPosts
};
