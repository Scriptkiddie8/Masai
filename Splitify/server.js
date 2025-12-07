require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./src/config/db");
const routes = require("./src/routes");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Simple root route so deployed URL shows something
app.get("/", (req, res) => {
  res.send("Splitify Backend API is running");
});

// DB
connectDB();

// Routes
app.use("/api", routes);

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
