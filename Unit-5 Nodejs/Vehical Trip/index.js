const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/vehicle-trip", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"));

app.use("/vehicles", vehicleRoutes);

app.listen(3000, () => console.log("Server started on http://localhost:3000"));
