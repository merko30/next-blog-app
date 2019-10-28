const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transport = nodemailer.createTransport(smtpTransport, {
  service: process.env.NODEMAILER_SERVICE,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: NODEMAILER_PASSWORD
  }
});

module.exports = transport;
