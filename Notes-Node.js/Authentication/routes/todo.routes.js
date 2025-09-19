const express = require("express");
const TodoModel = require("../models/todo.model");
const authMiddleware = require("../middlewares/auth.middleware");

const TodoRouter = express.Router();

TodoRouter.post("/add-todo", authMiddleware, async (req, res) => {
  //title & status are coming from req.body
  //This route is protected route
  //Only Authenticated or loggedin users are allowed
  try {
    let todo = await TodoModel.create({ ...req.body, userId: req.user });
    res.status(200).json({ msg: "Todo Added", todo });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

TodoRouter.get("/my", authMiddleware, async (req, res) => {
  try {
    let todos = await TodoModel.find({ userId: req.user });
    res.status(200).json({ msg: "Todo List", todos });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = TodoRouter;
