const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/user-profile-db")
  .then(() => console.log("MongoDB connected"));

app.use("/api", userRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
