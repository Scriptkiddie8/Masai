const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");

const restaurantRoute = require("./routes/restaurantRoutes");
const reviewRoute = require("./routes/reviewRoutes");
const notFound = require("./middleware/notFound");
const ConnectToDB = require("./config/mongodb.config");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/restaurants", restaurantRoute);
app.use("/api", reviewRoute);

app.use(notFound);

ConnectToDB();

app.listen(3000, (req, res) => {
  console.log("Server is running at port 3000");
});
