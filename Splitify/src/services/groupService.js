const Group = require("../models/Group");
const User = require("../models/User");
const ApiError = require("../utils/errorResponse");

async function createGroup(currentUser, { name, description, memberIds = [] }) {
  const uniqueMemberIds = [...new Set(memberIds.map(String))];

  const members = [{ user: currentUser._id, role: "admin" }];

  for (const id of uniqueMemberIds) {
    if (id === String(currentUser._id)) continue;
    const user = await User.findById(id);
    if (!user) throw new ApiError(400, `User not found: ${id}`);
    members.push({ user: user._id, role: "member" });
  }

  const group = await Group.create({
    name,
    description,
    createdBy: currentUser._id,
    members,
  });

  return group;
}

async function getMyGroups(currentUserId) {
  return Group.find({ "members.user": currentUserId }).populate(
    "members.user",
    "name email"
  );
}

async function getGroupById(groupId, currentUserId) {
  const group = await Group.findById(groupId).populate(
    "members.user",
    "name email"
  );
  if (!group) throw new ApiError(404, "Group not found");

  const isMember = group.members.some(
    (m) => String(m.user._id) === String(currentUserId)
  );
  if (!isMember) throw new ApiError(403, "Not a member of this group");

  return group;
}

function isAdmin(group, userId) {
  return group.members.some(
    (m) => String(m.user._id || m.user) === String(userId) && m.role === "admin"
  );
}

async function addMember(groupId, currentUser, { userId, role = "member" }) {
  const group = await Group.findById(groupId);
  if (!group) throw new ApiError(404, "Group not found");

  if (!isAdmin(group, currentUser._id)) {
    throw new ApiError(403, "Only admins can add members");
  }

  const user = await User.findById(userId);
  if (!user) throw new ApiError(400, "User not found");

  const alreadyMember = group.members.some(
    (m) => String(m.user) === String(userId)
  );
  if (alreadyMember) throw new ApiError(400, "User already in group");

  group.members.push({ user: user._id, role });
  await group.save();

  return group;
}

async function removeMember(groupId, currentUser, memberUserId) {
  const group = await Group.findById(groupId);
  if (!group) throw new ApiError(404, "Group not found");

  if (!isAdmin(group, currentUser._id)) {
    throw new ApiError(403, "Only admins can remove members");
  }

  group.members = group.members.filter(
    (m) => String(m.user) !== String(memberUserId)
  );
  await group.save();
  return group;
}

module.exports = {
  createGroup,
  getMyGroups,
  getGroupById,
  addMember,
  removeMember,
  isAdmin,
};
