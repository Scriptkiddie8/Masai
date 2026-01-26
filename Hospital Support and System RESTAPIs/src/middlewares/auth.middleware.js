const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("No token");

  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
};
