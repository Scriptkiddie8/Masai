const mongoose = require("mongoose");

const SettlementSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      default: null,
    },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // payer
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // receiver
    amount: { type: Number, required: true, min: 0.01 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settlement", SettlementSchema);
