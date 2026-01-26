const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointmentDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["booked", "completed", "cancelled"],
      default: "booked",
    },
    symptoms: String,
    prescription: String,
  },
  { timestamps: true },
);

AppointmentSchema.index({ doctorId: 1, appointmentDate: 1 });

module.exports = mongoose.model("Appointment", AppointmentSchema);
