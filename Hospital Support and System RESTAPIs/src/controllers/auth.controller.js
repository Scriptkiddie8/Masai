const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, specialization } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      specialization,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw new Error("Invalid Credentials");
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
