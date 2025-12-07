const Expense = require("../models/Expense");
const Settlement = require("../models/Settlement");
const Group = require("../models/Group");
const ApiError = require("../utils/errorResponse");
const { simplifyDebts } = require("../utils/debtSimplifier");

function addDebt(owed, debtorId, creditorId, amount) {
  if (amount <= 0 || debtorId === creditorId) return;

  debtorId = String(debtorId);
  creditorId = String(creditorId);

  // Net against opposite direction if exists
  if (owed[creditorId] && owed[creditorId][debtorId]) {
    const existing = owed[creditorId][debtorId];
    if (existing > amount) {
      owed[creditorId][debtorId] = existing - amount;
      return;
    } else if (existing === amount) {
      owed[creditorId][debtorId] = 0;
      return;
    } else {
      owed[creditorId][debtorId] = 0;
      amount = amount - existing;
    }
  }

  if (!owed[debtorId]) owed[debtorId] = {};
  if (!owed[debtorId][creditorId]) owed[debtorId][creditorId] = 0;
  owed[debtorId][creditorId] += amount;
}

async function buildOwedGraph({ groupId = null } = {}) {
  const filter = { deletedAt: null };
  if (groupId) filter.group = groupId;
  const expenses = await Expense.find(filter).lean();

  const settlementsFilter = {};
  if (groupId) settlementsFilter.group = groupId;
  const settlements = await Settlement.find(settlementsFilter).lean();

  const owed = {}; // debtor -> creditor -> amount

  // Expenses
  for (const e of expenses) {
    const payerId = String(e.paidBy);
    for (const p of e.participants) {
      const participantId = String(p.user);
      const share = p.shareAmount || 0;
      if (participantId === payerId) continue;
      addDebt(owed, participantId, payerId, share);
    }
  }

  // Settlements reduce debts: treat as opposite debt
  for (const s of settlements) {
    const fromId = String(s.from);
    const toId = String(s.to);
    const amount = s.amount;
    addDebt(owed, toId, fromId, amount);
  }

  return owed;
}

function computeNetBalancesFromOwed(owed) {
  const net = {}; // userId -> net amount (positive = to receive, negative = to pay)

  for (const debtorId of Object.keys(owed)) {
    for (const creditorId of Object.keys(owed[debtorId])) {
      const amount = owed[debtorId][creditorId];
      if (amount <= 0) continue;

      if (!net[debtorId]) net[debtorId] = 0;
      if (!net[creditorId]) net[creditorId] = 0;

      net[debtorId] -= amount;
      net[creditorId] += amount;
    }
  }

  return net;
}

async function getGroupBalances(groupId, currentUserId) {
  const group = await Group.findById(groupId).populate(
    "members.user",
    "name email"
  );
  if (!group) throw new ApiError(404, "Group not found");

  const memberIds = group.members.map((m) => String(m.user._id));
  if (!memberIds.includes(String(currentUserId))) {
    throw new ApiError(403, "Not a member of this group");
  }

  const owed = await buildOwedGraph({ groupId });
  const net = computeNetBalancesFromOwed(owed);

  const summary = group.members.map((m) => {
    const userId = String(m.user._id);
    const netBalance = net[userId] || 0;

    let totalOwedByUser = 0;
    let totalOwedToUser = 0;

    if (owed[userId]) {
      for (const amount of Object.values(owed[userId])) {
        totalOwedByUser += amount;
      }
    }
    for (const [fromId, toMap] of Object.entries(owed)) {
      if (toMap[userId]) totalOwedToUser += toMap[userId];
    }

    return {
      userId,
      userName: m.user.name,
      totalOwedByUser,
      totalOwedToUser,
      netBalance,
    };
  });

  const pairs = [];
  for (const [fromId, toMap] of Object.entries(owed)) {
    for (const [toId, amount] of Object.entries(toMap)) {
      if (amount > 0.01) {
        pairs.push({ fromUserId: fromId, toUserId: toId, amount });
      }
    }
  }

  return { groupId: String(group._id), summary, pairs };
}

async function getGlobalBalancesForUser(currentUserId) {
  const owed = await buildOwedGraph({});
  const net = computeNetBalancesFromOwed(owed);
  const userId = String(currentUserId);

  let totalOwedByMe = 0;
  let totalOwedToMe = 0;
  const perCounterparty = {};

  if (owed[userId]) {
    for (const [toId, amount] of Object.entries(owed[userId])) {
      totalOwedByMe += amount;
      if (!perCounterparty[toId])
        perCounterparty[toId] = { iOwe: 0, owedToMe: 0 };
      perCounterparty[toId].iOwe += amount;
    }
  }
  for (const [fromId, toMap] of Object.entries(owed)) {
    if (toMap[userId]) {
      const amount = toMap[userId];
      totalOwedToMe += amount;
      if (!perCounterparty[fromId])
        perCounterparty[fromId] = { iOwe: 0, owedToMe: 0 };
      perCounterparty[fromId].owedToMe += amount;
    }
  }

  const details = Object.entries(perCounterparty).map(([cpId, v]) => ({
    counterpartyId: cpId,
    iOwe: v.iOwe,
    owedToMe: v.owedToMe,
    net: v.owedToMe - v.iOwe,
  }));

  const netBalance = net[userId] || 0;

  return {
    userId,
    totalOwedByMe,
    totalOwedToMe,
    netBalance,
    details,
  };
}

async function simplifyGroupDebts(groupId, currentUserId) {
  const { summary } = await getGroupBalances(groupId, currentUserId);
  const net = {};
  for (const s of summary) {
    net[s.userId] = s.netBalance;
  }
  const simplifiedSettlements = simplifyDebts(net);
  return { groupId, simplifiedSettlements };
}

async function simplifyGlobalDebts() {
  const owed = await buildOwedGraph({});
  const net = computeNetBalancesFromOwed(owed);
  const simplifiedSettlements = simplifyDebts(net);
  return { scope: "global", simplifiedSettlements };
}

module.exports = {
  getGroupBalances,
  getGlobalBalancesForUser,
  simplifyGroupDebts,
  simplifyGlobalDebts,
};
