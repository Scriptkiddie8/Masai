const mongoose = require("mongoose");
const addressSchema = require("./Address");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  addresses: [addressSchema],
});

module.exports = mongoose.model("User", userSchema);
