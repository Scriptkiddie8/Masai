const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const settlementController = require("../controllers/settlementController");

router.post("/", auth, settlementController.createSettlement);
router.get("/group/:groupId", auth, settlementController.getGroupSettlements);

module.exports = router;
