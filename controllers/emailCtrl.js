const nodemailer = require("nodemailer");
const asyncHandle = require("express-async-handler");

let sendEmail = async (data) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MP,
      },
    });
    console.log("data", data);
    var mailOptions = {
      from: "DEV ANH",
      to: "anhnguyen.100499@gmail.com",
      subject: "DEV ANH",
      html: `<h1>${data.html}</h1>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return "Email sent";
  } catch (e) {
    throw new Error(e);
  }
};

// module.exports = { sendEmail, sendEmailOrder };
module.exports = sendEmail;
