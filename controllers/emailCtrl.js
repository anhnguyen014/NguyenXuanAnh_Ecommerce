const nodemailer = require("nodemailer");
const asyncHandle = require("express-async-handler");

const sendEmail = asyncHandle(async (sub, mess, sent_to, sent_from, reply) => {
  const trans = nodemailer.createTransport({
    host: process.env.HOST,
    port: "587",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MP,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const options = {
    from: sent_from,
    to: sent_to,
    replyTo: reply,
    subject: sub,
    html: mess,
  };
  //send email
  trans.sendMail(options, function async(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info.response);
    }
  });
});

module.exports = sendEmail;
