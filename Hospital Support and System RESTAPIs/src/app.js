const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./utils/db");
const logger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/error.middleware");
const rateLimiter = require("./middlewares/rateLimit.middleware");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
app.use(rateLimiter);

app.use("/auth", require("./routes/auth.routes"));
app.use("/patient", require("./routes/patient.routes"));
app.use("/doctor", require("./routes/doctor.routes"));
app.use("/admin", require("./routes/admin.routes"));

app.use(errorHandler);

module.exports = app;
