const Task = require("../models/task.model");

exports.createTask = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const filter = {};
  if (req.query.priority) filter.priority = req.query.priority;
  if (req.query.status) filter.status = req.query.status;

  const tasks = await Task.find(filter);
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const updates = req.body;

  if (updates.status && updates.status === "completed") {
    updates.completedAt = new Date();
  }

  const task = await Task.findByIdAndUpdate(req.params.id, updates, {
    new: true,
  });

  if (!task) return res.status(404).json({ error: "Task not found" });

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json({ message: "Task deleted" });
};

exports.deleteTasksByPriority = async (req, res) => {
  const { priority } = req.params;
  const result = await Task.deleteMany({ priority });
  res.json({ message: `${result.deletedCount} task(s) deleted` });
};
