var jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  let token = req.headers?.authorization?.split(" ")[1]; // '?' using for optional chaining means it will only check for headers if header is present then only it will check for authorization and so on
  //   console.log(token);
  if (token) {
    var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decoded);
    // console.log("Passed through auth middleware");
    if (decoded) {
      req.user = decoded.userId;
      next();
    } else {
      res.status(403).json({ msg: "Login Failed. Please Login Again" });
    }
  } else {
    res.status(400).json({ msg: "Unauthorized" });
  }
};

module.exports = authMiddleware;
