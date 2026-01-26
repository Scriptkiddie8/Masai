const mongoose = require("mongoose");

const SupportTicketSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open",
    },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    closedAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("SupportTicket", SupportTicketSchema);
