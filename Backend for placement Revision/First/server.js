const express = require("express");
const app = express();

app.use(express.json());

const users = [{ id: 1, name: "John Doe" }];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).send("User not found");

  user.name = req.body.name || user.name;
  res.json(user);
});

app.delete("users/:id", (req, res) => {
  const user = users.filter((u) => u.id != req.params.id);

  res.send("User deleted successfully");
});

app.listen(3000, () => {
  console.log("server is running ...");
});
