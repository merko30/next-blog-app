const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.cookies.token) {
    const payload = jwt.decode(req.cookies.token);

    console.log({ payload });

    if (payload.id) {
      req.userId = payload.id;

      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
