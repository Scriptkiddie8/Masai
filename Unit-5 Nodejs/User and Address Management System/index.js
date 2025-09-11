const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/user-address", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
