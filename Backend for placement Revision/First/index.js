const express = require("express");
const app = express();
const routes = require("./userRoutes.js");

app.use(express.json());

app.use("/users", routes);

app.listen(3000, () => {
  console.log("Server is running at 3000....");
});
