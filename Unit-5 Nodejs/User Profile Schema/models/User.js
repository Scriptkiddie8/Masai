const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    profileName: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    hobbies: { type: [String], default: [] },
    profession: { type: String },
    isPublic: { type: Boolean, default: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  profiles: [profileSchema],
});

module.exports = mongoose.model("User", userSchema);
