const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "try.kartikgarg@gmail.com",
    pass: "Kartik@123",
  },
});

app.get("/sendemail", async (req, res) => {
  const mailOptions = {
    from: "try.kartikgarg@gmail.com",
    to: ["kartikgarg0071@gmail.com", "venugopal.burli@masaischool.com"],
    subject: "Test Email from NEM Student",
    text: "This is a testing Mail sent by NEM student, no need to reply.",
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Email sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
