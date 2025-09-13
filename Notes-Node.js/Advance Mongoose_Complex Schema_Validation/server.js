const express = require("express");
const ConnectToDB = require("./configs/mongodb.config");
const UserRouter = require("./routes/user.routes");

const app = express();

app.use(express.json({ limit: "1mb" })); //By default the size is 100kb's and we can modify it like this
ConnectToDB();

app.get("/test", (req, res) => {
  res.status(200).json({ msg: "This is a test route" });
});

app.use("/user", UserRouter);
app.use((req, res) => {
  res.status(404).json({ msg: "This request is not found..." });
});

app.listen(3000, () => {
  console.log("Server Started...");
});
