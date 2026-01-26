const Appointment = require("../models/Appointment");
const SupportTicket = require("../models/SupportTicket");
const User = require("../models/User");

exports.myAppointments = async (req, res) => {
  const data = await Appointment.find({ doctorId: req.user.id });
  res.json(data);
};

exports.addPrescription = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  appointment.prescription = req.body.prescription;
  appointment.status = "completed";
  await appointment.save();

  await User.findByIdAndUpdate(appointment.patientId, {
    $push: {
      medicalHistory: {
        appointmentId: appointment._id,
        notes: appointment.prescription,
        date: new Date(),
      },
    },
  });

  res.json(appointment);
};

exports.resolveTicket = async (req, res) => {
  const ticket = await SupportTicket.findById(req.params.id);
  if (ticket.status === "resolved") throw new Error("Ticket already resolved");

  ticket.status = "resolved";
  ticket.closedAt = new Date();
  await ticket.save();

  res.json(ticket);
};
