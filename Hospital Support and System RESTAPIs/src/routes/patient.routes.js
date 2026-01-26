const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const controller = require("../controllers/patient.controller");

router.use(auth, role("patient"));

router.post("/appointments", controller.bookAppointment);
router.get("/appointments", controller.myAppointments);
router.post("/tickets", controller.raiseTicket);

module.exports = router;
