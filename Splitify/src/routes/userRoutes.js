const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.get("/me", auth, userController.getProfile);
router.get("/me/balances", auth, userController.getMyBalances);

module.exports = router;
