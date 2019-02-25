const router = require("express").Router();
const passport = require('passport');

const Comment = require("../models/comment.js");
const Post = require('../models/post');

// IMPLEMENT LOAD MORE

router.get("/:postID", (req, res) => {
    Comment.find({ postID: req.params.postID })
        .sort([["created_at", -1]])
        .populate("author")
        .exec((err, comments) => {
            if (err) throw err;
            else {
                res.json(comments);
            }
        });
});

router.post(
    "/:postID",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {

        let { postID } = req.params;

        var newComment = new Comment({
            comment: req.body.comment,
            author: req.user._id
        });

        newComment.save((err, comment) => {
            if (err) {
                next(err)
            } else {
               comment.populate('author', (err, com) => {
                   res.json({ comment: com })
                   Post.findById(postID, (err, post) => {
                       if (err) {
                           next(err)
                        } else {
                            post.comments.push(newComment._id)
                            post.save();
                        }
                    })
                })
            }
        })
    }
);


router.delete(
    "/:postID/:commentID",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        let { commentID, postID } = req.params
        Comment.findOne({ _id: commentID }, (err, comment) => {
            if (err) throw err;
            if (comment.author.equals(req.user._id)) {
                comment.remove(err => {
                    if (err) next(err)
                    res.json({ success: true, message: "Comment deleted." });
                    Post.findById(postID, (error, post) => {
                        if (error) {
                            next(error)
                        }
                        post.comments = post.comments.filter(c => c.toString() !== commentID)
                        post.save();
                    })

                });
            } else {
                res.status(401).json({
                    message: "Not allowed",
                    success: false
                });
            }
        }).then(() => {
            Post.findById(req.params.postID, (err, post) => {
                if (err) {
                    next(err)
                } else {
                    post.comments = post.comments.filter(p => p !== req.params.postID)
                    post.save();
                }
            })
        })
    }
);


module.exports = router;
