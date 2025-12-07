const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shareAmount: { type: Number, default: 0 }, // final numeric share
    exactAmount: { type: Number }, // for EXACT
    percentage: { type: Number }, // for PERCENT
  },
  { _id: false }
);

const ExpenseSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true, min: 0.01 },
    currency: { type: String, default: "INR" },

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      default: null,
    },

    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    splitType: {
      type: String,
      enum: ["EQUAL", "EXACT", "PERCENT"],
      required: true,
    },

    participants: [ParticipantSchema],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
