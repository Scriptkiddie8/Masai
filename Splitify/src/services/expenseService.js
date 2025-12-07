const Expense = require("../models/Expense");
const Group = require("../models/Group");
const User = require("../models/User");
const ApiError = require("../utils/errorResponse");
const { isAdmin } = require("./groupService");

async function validateUsersExist(userIds) {
  const users = await User.find({ _id: { $in: userIds } });
  if (users.length !== userIds.length) {
    throw new ApiError(400, "One or more participants not found");
  }
}

async function ensureGroupAndMembership(
  groupId,
  currentUserId,
  participantIds
) {
  if (!groupId) return null;

  const group = await Group.findById(groupId);
  if (!group) throw new ApiError(404, "Group not found");

  const memberIds = group.members.map((m) => String(m.user));

  const isMember = memberIds.includes(String(currentUserId));
  if (!isMember) throw new ApiError(403, "You are not a member of this group");

  for (const pid of participantIds) {
    if (!memberIds.includes(String(pid))) {
      throw new ApiError(400, "All participants must be members of the group");
    }
  }

  return group;
}

function computeShares(splitType, amount, participantsInput) {
  const participants = participantsInput.map((p) => ({ ...p }));

  if (splitType === "EQUAL") {
    const share = amount / participants.length;
    return participants.map((p) => ({
      user: p.userId,
      shareAmount: Number(share.toFixed(2)),
    }));
  }

  if (splitType === "EXACT") {
    const sum = participants.reduce(
      (acc, p) => acc + Number(p.exactAmount || 0),
      0
    );
    if (Math.abs(sum - amount) > 0.01) {
      throw new ApiError(400, "Sum of exact amounts must equal total amount");
    }
    return participants.map((p) => ({
      user: p.userId,
      shareAmount: Number(p.exactAmount.toFixed(2)),
      exactAmount: Number(p.exactAmount),
    }));
  }

  if (splitType === "PERCENT") {
    const percentSum = participants.reduce(
      (acc, p) => acc + Number(p.percentage || 0),
      0
    );
    if (Math.abs(percentSum - 100) > 0.01) {
      throw new ApiError(400, "Sum of percentages must be 100");
    }
    return participants.map((p) => {
      const share = (amount * p.percentage) / 100;
      return {
        user: p.userId,
        shareAmount: Number(share.toFixed(2)),
        percentage: Number(p.percentage),
      };
    });
  }

  throw new ApiError(400, "Invalid split type");
}

async function createExpense(
  { groupId, description, amount, currency, paidBy, splitType, participants },
  currentUser
) {
  if (
    !description ||
    !amount ||
    !paidBy ||
    !splitType ||
    !participants ||
    !participants.length
  ) {
    throw new ApiError(400, "Missing required fields for expense");
  }

  const participantIds = [...new Set(participants.map((p) => p.userId))];
  await validateUsersExist([...participantIds, paidBy]);

  const group = await ensureGroupAndMembership(
    groupId,
    currentUser._id,
    participantIds
  );

  const shares = computeShares(splitType, amount, participants);

  const expense = await Expense.create({
    description,
    amount,
    currency,
    group: group ? group._id : null,
    paidBy,
    splitType,
    participants: shares,
    createdBy: currentUser._id,
  });

  return expense.populate("paidBy", "name email");
}

async function getGroupExpenses(groupId, currentUserId) {
  const group = await Group.findById(groupId);
  if (!group) throw new ApiError(404, "Group not found");

  const isMember = group.members.some(
    (m) => String(m.user) === String(currentUserId)
  );
  if (!isMember) throw new ApiError(403, "Not a member of this group");

  return Expense.find({ group: groupId, deletedAt: null })
    .populate("paidBy", "name email")
    .populate("participants.user", "name email")
    .sort({ createdAt: -1 });
}

async function updateExpense(expenseId, data, currentUser) {
  const expense = await Expense.findById(expenseId).populate("group");
  if (!expense || expense.deletedAt)
    throw new ApiError(404, "Expense not found");

  let canEdit =
    String(expense.createdBy) === String(currentUser._id) ||
    String(expense.paidBy) === String(currentUser._id);

  if (expense.group && !canEdit) {
    const group = await Group.findById(expense.group);
    if (isAdmin(group, currentUser._id)) canEdit = true;
  }

  if (!canEdit) throw new ApiError(403, "Not allowed to update this expense");

  if (data.description !== undefined) expense.description = data.description;
  if (data.amount !== undefined) expense.amount = data.amount;
  if (data.currency !== undefined) expense.currency = data.currency;

  if (data.splitType || data.participants) {
    const splitType = data.splitType || expense.splitType;
    const participantsInput =
      data.participants ||
      expense.participants.map((p) => ({
        userId: String(p.user),
        exactAmount: p.exactAmount,
        percentage: p.percentage,
      }));

    const shares = computeShares(splitType, expense.amount, participantsInput);
    expense.splitType = splitType;
    expense.participants = shares;
  }

  await expense.save();
  return expense;
}

async function deleteExpense(expenseId, currentUser) {
  const expense = await Expense.findById(expenseId).populate("group");
  if (!expense || expense.deletedAt)
    throw new ApiError(404, "Expense not found");

  let canDelete =
    String(expense.createdBy) === String(currentUser._id) ||
    String(expense.paidBy) === String(currentUser._id);

  if (expense.group && !canDelete) {
    const group = await Group.findById(expense.group);
    if (isAdmin(group, currentUser._id)) canDelete = true;
  }

  if (!canDelete) throw new ApiError(403, "Not allowed to delete this expense");

  expense.deletedAt = new Date();
  await expense.save();
}

module.exports = {
  createExpense,
  getGroupExpenses,
  updateExpense,
  deleteExpense,
};
