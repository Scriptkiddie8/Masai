const express = require("express");
const rateLimit = require("express-rate-limit");
const apiRoutes = require("./routes/api");

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: { error: "Too many requests, please try again later." },
});

app.use("/api/limited", limiter);

app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
