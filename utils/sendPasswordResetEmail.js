const transport = require("../config/smtp");

const sendPasswordResetMail = async (to, token) => {
  return await transport.sendMail({
    to: to.email,
    from: "app@gmail.com",
    subject: "Password reset mail",
    html: `
            <h5>Hello, ${to.username},<br />
            If you requested password reset, keep reading, otherwise just ignore the mail.<br />
            <br />
            Here is the link for password reset: ${process.env.APP_URL}/reset_password?token=${token}</h5>
            <br/>
            <h3>Regards, our team!</h3>
        `
  });
};

module.exports = sendPasswordResetMail;
