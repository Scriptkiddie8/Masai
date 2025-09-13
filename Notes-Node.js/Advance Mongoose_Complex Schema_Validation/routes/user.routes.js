const express = require("express");
const UserModel = require("../models/user.model");

const UserRouter = express.Router();

UserRouter.post("/add-user", async (req, res) => {
  try {
    let user = await UserModel.create(req.body);
    res.status(200).json({ msg: "User Created", user });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong, Please try again late..." });
  }
});

UserRouter.patch("/add-address/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await UserModel.findById(userId);
    if (!user) {
      res.status(400).json({ msg: "User Not Found" });
    } else {
      //re.body is address of new address
      user.address.push(req.body);
      await user.save();
      res.status(201).json({ msg: `Address added to the user ${user.name}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong, Please try again late..." });
  }
});

UserRouter.patch("/add-order/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await UserModel.findById(userId);
    if (!user) {
      res.status(400).json({ msg: "User Not Found" });
    } else {
      //re.body is address of new address
      user.order.push(req.body);
      await user.save();
      res.status(201).json({ msg: `Order added to the user ${user.name}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong, Please try again late..." });
  }
});

//Female user less then 30
UserRouter.get("/analytics/flt30", async (req, res) => {
  let users = await UserModel.find({
    $and: [{ gender: "female" }, { age: { $lte: 30 } }],
  });
  res.json(users);
});

// Users from Delhi and Karnataka
UserRouter.get("/analytics/ufdb", async (req, res) => {
  let users = await UserModel.find(
    { "address.state": { $in: ["Delhi", "Karnataka", "Bihar"] } },
    { name: 1 }
  );
  res.json(users);
});

// Users whose order is more than 50000
UserRouter.get("/analytics/ogt50k", async (req, res) => {
  let users = await UserModel.find({
    "orders.orderAmount": { $gte: 50000 },
  }).lean();

  let filetredOrders = users.map((user) => {
    return {
      ...user,
      orders: user.orders.filter((el) => el.orderAmount >= 50000),
    };
  });

  res.json(filetredOrders);
});

module.exports = UserRouter;
