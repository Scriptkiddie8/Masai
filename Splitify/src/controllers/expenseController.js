const expenseService = require("../services/expenseService");

async function createGroupExpense(req, res, next) {
  try {
    const groupId = req.params.groupId;
    const expense = await expenseService.createExpense(
      { groupId, ...req.body },
      req.user
    );
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
}

async function createStandaloneExpense(req, res, next) {
  try {
    const expense = await expenseService.createExpense(
      { groupId: null, ...req.body },
      req.user
    );
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
}

async function getGroupExpenses(req, res, next) {
  try {
    const expenses = await expenseService.getGroupExpenses(
      req.params.groupId,
      req.user._id
    );
    res.json(expenses);
  } catch (err) {
    next(err);
  }
}

async function updateExpense(req, res, next) {
  try {
    const expense = await expenseService.updateExpense(
      req.params.expenseId,
      req.body,
      req.user
    );
    res.json(expense);
  } catch (err) {
    next(err);
  }
}

async function deleteExpense(req, res, next) {
  try {
    await expenseService.deleteExpense(req.params.expenseId, req.user);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createGroupExpense,
  createStandaloneExpense,
  getGroupExpenses,
  updateExpense,
  deleteExpense,
};
