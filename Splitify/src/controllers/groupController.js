const groupService = require("../services/groupService");

async function createGroup(req, res, next) {
  try {
    const group = await groupService.createGroup(req.user, req.body);
    res.status(201).json(group);
  } catch (err) {
    next(err);
  }
}

async function getMyGroups(req, res, next) {
  try {
    const groups = await groupService.getMyGroups(req.user._id);
    res.json(groups);
  } catch (err) {
    next(err);
  }
}

async function getGroupMembers(req, res, next) {
  try {
    const group = await groupService.getGroupById(
      req.params.groupId,
      req.user._id
    );
    res.json(group.members);
  } catch (err) {
    next(err);
  }
}

async function addMember(req, res, next) {
  try {
    const group = await groupService.addMember(
      req.params.groupId,
      req.user,
      req.body
    );
    res.json(group);
  } catch (err) {
    next(err);
  }
}

async function removeMember(req, res, next) {
  try {
    const group = await groupService.removeMember(
      req.params.groupId,
      req.user,
      req.params.userId
    );
    res.json(group);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createGroup,
  getMyGroups,
  getGroupMembers,
  addMember,
  removeMember,
};
