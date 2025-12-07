const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const balanceController = require("../controllers/balanceController");

router.get("/me", auth, balanceController.getMyGlobalBalancesController);
router.get(
  "/group/:groupId",
  auth,
  balanceController.getGroupBalancesController
);

// Simplification
router.get(
  "/group/:groupId/simplify",
  auth,
  balanceController.simplifyGroupDebtsController
);
router.get("/simplify", auth, balanceController.simplifyGlobalDebtsController);

module.exports = router;
