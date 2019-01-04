const router = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport');

const schema = require('../validation/user');
const User = require("../models/user.js");
const upload = require('../config/multer');

router.post("/register", upload.single('avatar'), (req, res, next) => {

    User.find({ $or: [{ 'email': req.body.email }, { 'username': req.body.username }] })
        .count()
        .exec((err, docs) => {
            if (err) {
                next(err);
            } else if (docs > 0) {
                res.status(400).json({ message: "User already exists" })
            } else {

                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                });

                if (req.file !== undefined) {
                    newUser.avatar = req.file.filename
                }

                newUser.save((err, user) => {
                    if (err) next(err)
                    res.json({
                        message: "You have successfully registered"
                    });

                });
            }
        })
})


router.post("/login", (req, res, next) => {
    if (req.body.username && req.body.password) {

        User.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                next(err)
            }
            else if (!user) {
                res.status(400).send({ success: false, message: "User not found" });
            }
            else {
                bcrypt.compare(req.body.password, user.password, (err, match) => {
                    if (err) {
                        next(err)
                    }
                    if (!match) {
                        res.status(400).send({
                            message: "Wrong password"
                        });
                    } else {
                        const token = jwt.sign(
                            { _id: user._id },
                            process.env.JWT_SECRET
                        );
                        res.json({
                            token,
                            user: {
                                _id: user._id
                            },
                            message: "You have successfully logged in."
                        });
                    }
                });
            }
        });
    } else {
        res.status(400).json({ message: "Please provide username and password" })
    }

});

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) next(err)
        res.json({ user })
    }).select('-password')
})



module.exports = router;