const express = require("express");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/orderRoutes");
const fs = require("fs");
const Order = require("./models/order");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ordersdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"));

app.get("/seed", async (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data/sampleOrders.json", "utf-8"));
  await Order.deleteMany({});
  await Order.insertMany(data);
  res.send("Sample data inserted!");
});

app.use("/orders", orderRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
