const express = require("express");
const UserModel = require("../models/user.model");

const UserRouter = express.Router();

//Get all user from userCollection
UserRouter.get("/", async (req, res) => {
  //find all the documnets present in user collection through UserModel
  try {
    let user = await UserModel.find({});
    res.status(200).json({ msg: "User list", users });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong..." });
  }
});

//add user into user collection
UserRouter.post("/add-user", async (req, res) => {
  console.log(req.body);
  let user = await UserModel.create(req.body);
  res.status(201).json({ msg: "User Added", user });
});

//Patch or update the user by Id
UserRouter.patch("/update-user/:userId", async (req, res) => {
  const { userId } = req.params;
  let user = await UserModel.findById(userId);
  if (!userId) {
    res.status(404).json({ msg: "User Not Found" });
  } else {
    await UserModel.findByIdAndUpdate(userId, req.body);
    res.status(201).json({ msg: "User Updated" });
  }
});

//Delete by Id
UserRouter.delete("/delete-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await UserModel.findById(userId);
    if (!userId) {
      res.status(404).json({ msg: "User Not Found" });
    } else {
      await UserModel.findByIdAndDelete(userId);
      res.status(201).json({ msg: "User Deleted" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = UserRouter;
