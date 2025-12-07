const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { getMe } = require("../controllers/authController");

router.get("/me", auth, getMe);

module.exports = router;
