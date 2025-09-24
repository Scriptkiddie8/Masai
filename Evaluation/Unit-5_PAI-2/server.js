require("dotenv").config();
const express = require("express");
const ConnectToDb = require("./config/mongodb.config");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

ConnectToDb();

app.use("/api/auth", authRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
