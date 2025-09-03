import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB;
const SMPT_EMAIL = process.env.SENDER_EMAIL;
const SMPT_PASSWORD = process.env.EMAIL_PASSWORD;
const SMPT_PORT = process.env.SMPT_PORT;

export default {
  PORT,
  MONGODB_URI,
  SMPT_EMAIL,
  SMPT_PASSWORD,
  SMPT_PORT,
};
