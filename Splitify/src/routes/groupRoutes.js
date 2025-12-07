const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const groupController = require("../controllers/groupController");

router.post("/", auth, groupController.createGroup);
router.get("/", auth, groupController.getMyGroups);
router.get("/:groupId/members", auth, groupController.getGroupMembers);
router.post("/:groupId/members", auth, groupController.addMember);
router.delete("/:groupId/members/:userId", auth, groupController.removeMember);

module.exports = router;
