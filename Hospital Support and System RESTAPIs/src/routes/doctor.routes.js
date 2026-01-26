const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const controller = require("../controllers/doctor.controller");

router.use(auth, role("doctor"));

router.get("/appointments", controller.myAppointments);
router.patch("/appointments/:id", controller.addPrescription);
router.patch("/tickets/:id/resolve", controller.resolveTicket);

module.exports = router;
