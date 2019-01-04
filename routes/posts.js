const router = require('express').Router();
const passport = require('passport');

const Post = require('../models/post');
const Comment = require('../models/comment');
const schema = require('../validation/post');
const upload = require('../config/multer');

let perPage = 5;

router.get("/", (req, res, next) => {
    let { page } = req.query;
    Post.find()
        .populate('author')
        .populate({
            path: 'comments', model: "Comment", populate: {
                path: "author", model: "User"
            }
        })
        .sort([["created_at", -1]])
        .skip(((perPage * page) - perPage) > 0 ? ((perPage * page) - perPage) : 0)
        .limit(perPage)
        .exec((err, posts) => {
            Post.count().exec((err, count) => {
                if (err) next(err);
                res.json({ posts, numberOfPages: Math.ceil(count / perPage), current: page || 1 });
            })
            if (err) next(err)

        });
});

router.get("/:id", (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .populate('author')
        .populate({
            path: 'comments', model: "Comment", populate: {
                path: "author", model: "User"
            }
        })
        .exec((err, post) => {
            if (err) next(err)
            else {
                res.json(post);
            }
        });
});

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    upload.single('image'),
    (req, res, next) => {

        schema.validate(req.body, (err, value) => {

            if (!err) {

                var newPost = new Post({
                    title: req.body.title,
                    body: req.body.body,
                    author: req.user._id
                });

                if (req.file !== undefined) {
                    newPost.image = req.file.filename
                }

                newPost.save((err, post) => {
                    if (err) {
                        next(err)
                    } else {
                        res.json({
                            message: "You have successfully created a post",
                            success: true,
                            post
                        });
                    }
                });
            } else {
                res.status(422).json({ err })
            }

        })
    }

);

router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    upload.single('image'),
    (req, res, next) => {

        Post.findOne({ _id: req.params.id }, (err, post) => {
            if (err) next(err)
            console.log(post, req.body)
            if (post.author.equals(req.user._id)) {
                post.title = req.body.title;
                post.body = req.body.body;

                if (req.file !== undefined) {
                    post.image = req.file.filename
                }

                post.save((err, updatedPost) => {
                    if (err) next(err)
                    else {
                        res.json({
                            message: "You have successfully updated your post",
                            success: true
                        });
                    }
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "You are not allowed to do this."
                });
            }
        });
    }
);

router.delete("/:id", passport.authenticate("jwt"), (req, res, next) => {
    Post.findByIdAndRemove(req.params._id, (err, msg) => {
        if (err) {
            next(err)
        } else {
            res.send({ success: true, message: "Post has been deleted." });
        }
    });
});


module.exports = router;