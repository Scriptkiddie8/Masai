const express = require("express");
const ConnectToDb = require("./configs/mongodb.congif");
const UserRouter = require("./routes/user.routes");
const TodoRouter = require("./routes/todo.routes");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

ConnectToDb();
app.use(express.json());

app.get("/test", (req, res) => {
  try {
    res.status(200).json({ msg: "This is a test route" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

//user ROuter
app.use("/users", UserRouter);

//todoRouter
app.use("/todos", TodoRouter);

//Handling undefined routes
app.use((req, res) => {
  try {
    res.status(200).json({ msg: "This request is undefined" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log("Server Started...");
});
