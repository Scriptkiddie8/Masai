const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  let account = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const info = await transporter.sendMail({
    from: "try.kartikgarg@gmail.com",
    to: options.email,
    subject: options.subject,
    html: "<p><b>Hello</b> to myself!</p>",
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;
