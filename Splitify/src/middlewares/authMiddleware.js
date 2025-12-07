const admin = require("../config/firebase");
const User = require("../models/User");

module.exports = async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const firebaseUid = decoded.uid;

    let user = await User.findOne({ firebaseUid });
    if (!user) {
      user = await User.create({
        firebaseUid,
        email: decoded.email,
        name: decoded.name || decoded.displayName || "Unnamed User",
      });
    }

    req.user = user;
    next();
  } catch (e) {
    console.error("Firebase auth error:", e.message);
    return res.status(401).json({ message: "Invalid Firebase token" });
  }
};
