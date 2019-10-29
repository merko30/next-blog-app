const transport = require("../config/smtp");

const sendPasswordResetMail = async (to, token) => {
  return await transport.sendMail({
    to: to.email,
    from: "app@gmail.com",
    subject: "Email verification",
    html: `
            <h5>Hello, ${to.username},<br />
            Here is a verification email <br />
            <br />
            To verify your account follow this 
            <a target="_blank" href="${process.env.APP_URL}/verification/?token=${token}&email=${to.email}">link</a>
            </h5>
            <br/>
            <h3>Regards, our team!</h3>
        `
  });
};

module.exports = sendPasswordResetMail;
