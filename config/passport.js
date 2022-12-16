const passport = require("passport");
const CookieStrategy = require("passport-cookie/strategy");

const user = require("../models/user");

module.exports = () =>
  passport.use(
    new CookieStrategy(function (token, done) {
      console.log(token);
      user.findById(token, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );

passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    return cb(null, user.id);
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});
