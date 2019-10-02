const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");

module.exports = app => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true, limit: 5000000 }));
  app.use(bodyParser.json({ limit: 5000000 }));
  app.use(passport.initialize());
  require("./passport")(passport);
  app.use(morgan("dev"));

  // static
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "..", "static", "uploads"))
  );
};
