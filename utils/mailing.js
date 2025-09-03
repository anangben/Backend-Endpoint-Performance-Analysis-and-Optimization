import nodemailer from "nodemailer";
import config from "./config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: config.SMPT_PORT,
  secure: false,
  auth: {
    user: config.SMPT_EMAIL,
    pass: config.SMPT_PASSWORD,
  },
});

export const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
