const settlementService = require("../services/settlementService");

async function createSettlement(req, res, next) {
  try {
    const settlement = await settlementService.createSettlement(
      req.body,
      req.user
    );
    res.status(201).json(settlement);
  } catch (err) {
    next(err);
  }
}

async function getGroupSettlements(req, res, next) {
  try {
    const settlements = await settlementService.getGroupSettlements(
      req.params.groupId,
      req.user._id
    );
    res.json(settlements);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createSettlement,
  getGroupSettlements,
};
