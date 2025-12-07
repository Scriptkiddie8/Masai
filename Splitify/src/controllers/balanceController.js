const {
  getGroupBalances,
  getGlobalBalancesForUser,
  simplifyGroupDebts,
  simplifyGlobalDebts,
} = require("../services/balanceService");

async function getGroupBalancesController(req, res, next) {
  try {
    const result = await getGroupBalances(req.params.groupId, req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getMyGlobalBalancesController(req, res, next) {
  try {
    const result = await getGlobalBalancesForUser(req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function simplifyGroupDebtsController(req, res, next) {
  try {
    const result = await simplifyGroupDebts(req.params.groupId, req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function simplifyGlobalDebtsController(req, res, next) {
  try {
    const result = await simplifyGlobalDebts();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getGroupBalancesController,
  getMyGlobalBalancesController,
  simplifyGroupDebtsController,
  simplifyGlobalDebtsController,
};
