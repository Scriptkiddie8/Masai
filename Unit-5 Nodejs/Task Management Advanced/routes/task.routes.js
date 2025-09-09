const express = require("express");
const router = express.Router();
const controller = require("../controllers/task.controller");
const validateTask = require("../middleware/task.middleware");

router.post("/", validateTask, controller.createTask);

router.get("/", controller.getTasks);

router.patch("/:id", controller.updateTask);

router.delete("/:id", controller.deleteTask);

router.delete("/priority/:priority", controller.deleteTasksByPriority);

module.exports = router;
