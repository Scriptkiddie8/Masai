const { getGlobalBalancesForUser } = require("../services/balanceService");

async function getProfile(req, res) {
  const user = req.user;
  res.json({
    id: user._id,
    firebaseUid: user.firebaseUid,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
}

async function getMyBalances(req, res, next) {
  try {
    const result = await getGlobalBalancesForUser(req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getProfile,
  getMyBalances,
};
