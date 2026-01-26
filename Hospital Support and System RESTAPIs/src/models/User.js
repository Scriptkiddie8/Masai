const mongoose = require("mongoose");

const MedicalHistorySchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
  diagnosis: String,
  notes: String,
  date: Date,
});

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      required: true,
    },
    specialization: {
      type: String,
      required: function () {
        return this.role === "doctor";
      },
    },
    medicalHistory: [MedicalHistorySchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
