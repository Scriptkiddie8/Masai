const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const expenseController = require("../controllers/expenseController");

// Standalone expenses
router.post("/", auth, expenseController.createStandaloneExpense);

// Group expenses
router.post("/group/:groupId", auth, expenseController.createGroupExpense);
router.get("/group/:groupId", auth, expenseController.getGroupExpenses);

// Single expense update/delete
router.put("/:expenseId", auth, expenseController.updateExpense);
router.delete("/:expenseId", auth, expenseController.deleteExpense);

module.exports = router;
