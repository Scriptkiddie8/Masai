const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to home page</h1>");
});

app.get("/aboutus", (req, res) => {
  res.json({ message: "Welcome to About us " });
});

app.get("/contactus", (req, res) => {
  res.send("Contact us at: work.kartikgarg@gmail.com");
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
