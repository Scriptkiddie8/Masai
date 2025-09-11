const express = require("express");
const router = express.Router();
const controller = require("../controllers/vehicleController");

router.post("/", controller.createVehicle);

module.exports = router;
