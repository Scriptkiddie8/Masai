// server.js
const express = require("express");
const app = express();
const PORT = 3000;

// Hardcoded valid API keys
const validApiKeys = ["123456", "abcdef", "secretkey"];

// Middleware to check x-api-key
function apiKeyAuth(req, res, next) {
  const apiKey = req.header("x-api-key");
  if (!apiKey) {
    return res.status(401).json({ error: "API key is missing" });
  }

  if (!validApiKeys.includes(apiKey)) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  next(); // key is valid, proceed
}

// Public route (no auth required)
app.get("/api/public", (req, res) => {
  res.json({ message: "This is a public route" });
});

// Private routes (API key required)
app.use("/api/private", apiKeyAuth);

app.get("/api/private/data", (req, res) => {
  res.json({ message: "This is private data" });
});

app.get("/api/private/info", (req, res) => {
  res.json({ message: "More private info here" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
