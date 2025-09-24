require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "user", "chef"], default: "user" },
  resetToken: String,
  resetTokenExpiry: Date,
});
const User = mongoose.model("User", userSchema);

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  chefId: mongoose.Schema.Types.ObjectId,
  status: {
    type: String,
    enum: ["Order Received", "Preparing", "Out for Delivery", "Delivered"],
    default: "Order Received",
  },
});
const Order = mongoose.model("Order", orderSchema);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
};

const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: "Access denied" });
    next();
  };

app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ message: "Registered" });
  } catch {
    res.status(400).json({ error: "Email already exists" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ token });
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(200).json({ message: "If email exists, link sent" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
  await user.save();

  const link = `http://localhost:${process.env.PORT}/reset-password/${token}`;
  await transporter.sendMail({
    to: user.email,
    subject: "Password Reset",
    text: `Reset your password: ${link}`,
  });

  res.json({ message: "Reset link sent to email" });
});

app.post("/reset-password/:token", async (req, res) => {
  const { password } = req.body;
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() },
  });
  if (!user) return res.status(400).json({ error: "Invalid or expired token" });

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
});

app.post("/orders", auth, authorize("user"), async (req, res) => {
  const chefs = await User.find({ role: "chef" });
  const randomChef = chefs[Math.floor(Math.random() * chefs.length)];

  const order = await Order.create({
    userId: req.user.id,
    chefId: randomChef._id,
  });

  res.status(201).json({ message: "Order placed", order });
});

app.get("/orders", auth, async (req, res) => {
  const filter =
    req.user.role === "user"
      ? { userId: req.user.id }
      : req.user.role === "chef"
      ? { chefId: req.user.id }
      : {};

  const orders = await Order.find(filter);
  res.json({ orders });
});

app.patch("/orders/:id/status", auth, authorize("chef"), async (req, res) => {
  const { status } = req.body;
  const order = await Order.findOne({
    _id: req.params.id,
    chefId: req.user.id,
  });
  if (!order) return res.status(404).json({ error: "Order not found" });

  order.status = status;
  await order.save();

  res.json({ message: "Status updated", order });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB error:", err));
