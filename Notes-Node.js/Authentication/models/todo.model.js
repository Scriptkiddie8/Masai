const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: Boolean, default: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;
