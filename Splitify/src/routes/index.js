const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const groupRoutes = require("./groupRoutes");
const expenseRoutes = require("./expenseRoutes");
const balanceRoutes = require("./balanceRoutes");
const settlementRoutes = require("./settlementRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/groups", groupRoutes);
router.use("/expenses", expenseRoutes);
router.use("/balances", balanceRoutes);
router.use("/settlements", settlementRoutes);

module.exports = router;
