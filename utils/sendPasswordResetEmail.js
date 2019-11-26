const transport = require("../config/smtp");

const sendPasswordResetMail = async (to, token) => {
  try {
    return await transport.sendMail({
      to: to.email,
      from: "app@gmail.com",
      subject: "Password reset mail",
      html: `
      <h5>Hello, ${to.username},<br />
      If you requested password reset, keep reading, otherwise just ignore the mail.<br />
      <br />
      In order to reset your password follow this <a target="_blank" href="${process.env.APP_URL}/reset_password?token=${token}">link</a></h5>
      <br/>
      <h3>Regards, our team!</h3>
      `
    });
  } catch (error) {
    throw new Error(
      "Something went wrong with sending reset password mail. Try later"
    );
  }
};

module.exports = sendPasswordResetMail;
