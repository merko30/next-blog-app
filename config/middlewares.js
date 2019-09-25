const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");

module.exports = app => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  require("./passport")(passport);
  app.use(morgan("dev"));

  // static
  app.use("/uploads", express.static(__dirname + "../static/uploads"));

  if (process.env.NODE_ENV === "production") {
    //set stati folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
};
