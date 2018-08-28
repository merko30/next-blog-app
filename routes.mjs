import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
var router = express.Router();

import User from "./models/user.mjs";

import Post from "./models/post.mjs";
import Comment from "./models/comment.mjs";

router.get("/posts", (req, res) => {
    Post.find({})
        .sort([["created_at", -1]])
        .populate("author")
        .populate("comments")
        .exec((err, posts) => {
            if (err) throw err;
            else {
                res.json(posts);
            }
        });
});

router.get("/posts/:id", (req, res) => {
    Post.findById(req.params.id)
        .populate("author")
        .populate("comments")
        .exec((err, post) => {
            if (err) throw err;
            else {
                res.json(post);
            }
        });
});

router.post(
    "/posts",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        var newPost = new Post({
            title: req.body.title,
            body: req.body.body,
            image: req.body.image,
            author: req.user._id
        });
        newPost.save((err, post) => {
            if (err) throw err;
            else {
                res.json({
                    message: "You have successfully created a post",
                    success: true,
                    post
                });
            }
        });
    }
);

router.put(
    "/posts/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Post.findOne({ _id: req.params.id }, (err, post) => {
            if (err) throw err;
            if (post.author.equals(req.user._id)) {
                post.title = req.body.title;
                post.body = req.body.body;
                post.image = req.body.image;

                post.save((err, updatedPost) => {
                    if (err) throw err;
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

router.delete("/posts/:id", passport.authenticate("jwt"), (req, res) => {
    Post.findByIdAndRemove(req.params._id, (err, msg) => {
        if (err) {
            res.send({ success: false, message: "Error " + err });
        } else {
            res.send({ success: true, message: "Post has been deleted." });
        }
    });
});

//COMMENTS

router.get("/comments", (req, res) => {
    Comment.find({})
        .sort([["created_at", -1]])
        .populate("author")
        .exec((err, comments) => {
            if (err) throw err;
            else {
                res.json(comments);
            }
        });
});

//New comment
router.post(
    "/posts/:id/comments",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        var newComment = new Comment({
            comment: req.body.comment,
            postID: req.params.id,
            author: req.user._id
        });
        newComment.save((err, comment) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Error" + err
                });
            } else {
                res.json({ message: "Comment created", success: true });
            }
        });
    }
);

/*
Edit comment
router.put('/posts/:id/comments/:commentId', passport.authenticate('jwt'), (req, res) => {
    Comment.findOne({ _id: req.params.commentId }, (err, comment) => {
        if (err) throw err;
        if (comment.author.equals(req.user._id)) {
            comment.comment = req.body.comment

            comment.save((err, updatedComment) => {
                if (err) throw err;
                else {
                    res.json({ success: true, updatedComment, message: "Success" });
                }
            });
        }
    });
});
*/

//Delete comment
router.delete(
    "/comments/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Comment.findOne({ _id: req.params.id }, (err, comment) => {
            if (err) throw err;
            if (comment.author.equals(req.user._id)) {
                comment.remove(err => {
                    if (err) throw err;
                    res.json({ success: true, message: "Comment deleted." });
                });
            } else {
                res.status(401).json({
                    message: "Not allowed",
                    success: false
                });
            }
        });
    }
);

// REGISTER - LOGIN

router.post("/register", (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        avatar: req.body.avatar
    });

    newUser.save((err, user) => {
        if (err) res.json({ success: false, message: "Error: " + err });
        else {
            res.json({
                success: true,
                message: "You have successfully registered"
            });
        }
    });
});

router.post("/login", (req, res) => {
    console.log(req.body);
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err)
            res.status(400).send({ success: false, message: "Error: " + err });
        if (!user)
            res.status(400).send({ success: false, message: "User not found" });
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, match) => {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: "Error: " + err
                    });
                }
                if (!match) {
                    res.status(401).send({
                        success: false,
                        message: "Wrong password"
                    });
                } else {
                    const token = jwt.sign(
                        { _id: user._id },
                        process.env.JWT_SECRET
                    );
                    res.json({
                        success: true,
                        token: "Bearer " + token,
                        user: {
                            username: user.username,
                            name: user.name,
                            email: user.email
                        },
                        message: "You have successfully logged in."
                    });
                }
            });
        }
    });
});

export default router;
