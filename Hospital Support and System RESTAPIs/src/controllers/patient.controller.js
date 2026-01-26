const Appointment = require("../models/Appointment");
const SupportTicket = require("../models/SupportTicket");
const mongoose = require("mongoose");

exports.bookAppointment = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { doctorId, appointmentDate, symptoms } = req.body;

    const conflict = await Appointment.findOne({
      doctorId,
      appointmentDate,
    });

    if (conflict) throw new Error("Doctor not available");

    const appointment = await Appointment.create(
      [
        {
          patientId: req.user.id,
          doctorId,
          appointmentDate,
          symptoms,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    res.status(201).json(appointment);
  } catch (err) {
    await session.abortTransaction();
    next(err);
  }
};

exports.myAppointments = async (req, res) => {
  const appointments = await Appointment.find({ patientId: req.user.id });
  res.json(appointments);
};

exports.raiseTicket = async (req, res) => {
  const ticket = await SupportTicket.create({
    ...req.body,
    patientId: req.user.id,
  });
  res.status(201).json(ticket);
};
