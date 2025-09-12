const mongoose = require("mongoose");

//create Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  isMarried: Boolean,
  location: String,
});

//create MOdel

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
