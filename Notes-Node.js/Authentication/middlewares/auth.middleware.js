var jwt = require("jsonwebtoken");
const authMiddleware = (role) => {
  return (req, res, next) => {
    let decoded;
    try {
      let token = req.headers?.authorization?.split(" ")[1]; // '?' using for optional chaining means it will only check for headers if header is present then only it will check for authorization and so on
      //   console.log(token);
      if (token) {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        // console.log("Passed through auth middleware");
      } else {
        res.status(400).json({ msg: "Unauthorized" });
      }
    } catch (error) {
      if (error.message == "jwt expired") {
        let token = req.headers?.refreshToken?.split(" ")[1];
        let refreshTokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (refreshTokenDecoded) {
          let newAccessToken = jwt.sign(
            {
              userId: refreshTokenDecoded.userId,
              role: refreshTokenDecoded.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 30 }
          );
          decoded = jwt.verify(newAccessToken, process.env.JWT_SECRET_KEY);
        }
        res.status(403).json({ msg: "Token Expired, Login Again" });
      } else {
        res.status(500).json({ msg: "Something went wrong" });
      }
    }

    if (decoded) {
      if (role == decoded.role) {
        req.user = decoded.userId;
        next();
      } else {
        res.status(401).json({ msg: "Unauthorized role" });
      }
    } else {
      res.status(403).json({ msg: "Login Failed. Please Login Again" });
    }
  };
};

module.exports = authMiddleware;
