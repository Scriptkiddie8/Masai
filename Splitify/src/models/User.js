const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, unique: true, required: true },
    name: { type: String },
    email: { type: String, index: true },
    fcmTokens: [String], // optional (for future notifications)
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
