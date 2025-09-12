//step:1 create basic express setup
//step:2 connect MongoDB with nodejs Using Mongoose
//step:3 create Schema and Model
//step:4 Import model and create route and perform CRUD operation

const express = require("express");
const ConnectToDB = require("./configs/mongodb.config");
const UserRouter = require("./routes/user.routes");
ConnectToDB();
const app = express();

app.use(express.json());
app.use("/users", UserRouter);

app.listen(3000, () => {
  console.log("Server Started...");
});
