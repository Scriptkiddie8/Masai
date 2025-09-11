const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    tripId: { type: String, required: true, unique: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    distance: { type: Number, min: 0 },
    date: { type: Date, required: true },
  },
  { _id: false }
);

const vehicleSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  type: { type: String, enum: ["car", "truck", "bike"], required: true },
  trips: [tripSchema],
});

vehicleSchema.methods.totalDistance = function () {
  return this.trips.reduce((acc, t) => acc + (t.distance || 0), 0);
};

module.exports = mongoose.model("Vehicle", vehicleSchema);
