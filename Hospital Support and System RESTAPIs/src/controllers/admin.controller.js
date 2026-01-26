const User = require("../models/User");
const Appointment = require("../models/Appointment");
const SupportTicket = require("../models/SupportTicket");

exports.getUsers = async (req, res) => {
  const users = await User.find({ isActive: true });
  res.json(users);
};

exports.getStats = async (req, res) => {
  const stats = {};

  stats.totalPatients = await User.countDocuments({ role: "patient" });
  stats.totalDoctors = await User.countDocuments({ role: "doctor" });

  stats.appointmentsPerDoctor = await Appointment.aggregate([
    { $group: { _id: "$doctorId", count: { $sum: 1 } } },
  ]);

  stats.ticketPriority = await SupportTicket.aggregate([
    { $group: { _id: "$priority", count: { $sum: 1 } } },
  ]);

  res.json(stats);
};
