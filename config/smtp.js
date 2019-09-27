const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  secure: false,
  auth: {
    user: "merim.test.28@gmail.com",
    pass: "eft2805EFT"
  }
});

module.exports = transport;
