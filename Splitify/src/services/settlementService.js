const Settlement = require("../models/Settlement");
const Group = require("../models/Group");
const User = require("../models/User");
const ApiError = require("../utils/errorResponse");

async function createSettlement(
  { groupId, fromUserId, toUserId, amount },
  currentUser
) {
  if (!fromUserId || !toUserId || !amount) {
    throw new ApiError(400, "Missing required fields");
  }
  if (fromUserId === toUserId) {
    throw new ApiError(400, "From and to cannot be same user");
  }

  const [fromUser, toUser] = await Promise.all([
    User.findById(fromUserId),
    User.findById(toUserId),
  ]);

  if (!fromUser || !toUser) {
    throw new ApiError(400, "From or To user not found");
  }

  let group = null;
  if (groupId) {
    group = await Group.findById(groupId);
    if (!group) throw new ApiError(404, "Group not found");

    const memberIds = group.members.map((m) => String(m.user));
    if (
      !memberIds.includes(String(fromUserId)) ||
      !memberIds.includes(String(toUserId))
    ) {
      throw new ApiError(400, "Both users must be members of the group");
    }
  }

  if (
    String(currentUser._id) !== String(fromUserId) &&
    String(currentUser._id) !== String(toUserId)
  ) {
    throw new ApiError(
      403,
      "You can only record settlements involving yourself"
    );
  }

  const settlement = await Settlement.create({
    group: group ? group._id : null,
    from: fromUser._id,
    to: toUser._id,
    amount,
    createdBy: currentUser._id,
  });

  return settlement.populate("from", "name email").populate("to", "name email");
}

async function getGroupSettlements(groupId, currentUserId) {
  const group = await Group.findById(groupId);
  if (!group) throw new ApiError(404, "Group not found");

  const isMember = group.members.some(
    (m) => String(m.user) === String(currentUserId)
  );
  if (!isMember) throw new ApiError(403, "Not a member of this group");

  return Settlement.find({ group: groupId })
    .populate("from", "name email")
    .populate("to", "name email")
    .sort({ createdAt: -1 });
}

module.exports = {
  createSettlement,
  getGroupSettlements,
};
