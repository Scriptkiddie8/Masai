const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: String,
  status: String,
  completedAt: Date,
  dueDate: Date,
});

module.exports = mongoose.model("Task", taskSchema);
