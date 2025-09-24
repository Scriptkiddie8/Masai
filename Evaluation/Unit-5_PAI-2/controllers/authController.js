const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const crypto = require("cryto");
const User = require("../model/userModel");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    res.status(201).json({ msg: "User registered Successfully..." });
  } catch (error) {
    res.status(404).json({ msg: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "User Not Found" });
    }

    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    res.status(404).json({ msg: "Something went wrong" });
  }
};

exports.forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ msg: "Send email to the user" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    const resetURL = `http://localhost:${process.env.PORT}/api/auth/reset-password/${resetToken}`;
    const message = `<p>Reset your password using the link :</p> <a href="${resetURL}">${resetURL}</a>`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message,
    });

    res.status(200).json({ msg: "Reset email sent" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong..." });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Token expired or invalid" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ msg: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
};
