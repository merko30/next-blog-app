const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.cookies.token) {
    const payload = jwt.decode(req.cookies.token);

    req.userId = payload.id;
  }

  next();
};
