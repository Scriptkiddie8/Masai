// server.js
const express = require("express");

const app = express();
const port = 3000;

// Dummy users
const singleUser = { id: 1, name: "John Doe", email: "john@example.com" };

const userList = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
  { id: 3, name: "Bob Smith", email: "bob@example.com" },
];

// Routes
app.get("/users/get", (req, res) => {
  res.json(singleUser);
});

app.get("/users/list", (req, res) => {
  res.json(userList);
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
