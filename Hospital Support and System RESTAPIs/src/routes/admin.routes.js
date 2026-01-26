const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const controller = require("../controllers/admin.controller");

router.use(auth, role("admin"));

router.get("/users", controller.getUsers);
router.get("/stats", controller.getStats);

module.exports = router;
