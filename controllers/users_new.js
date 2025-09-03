import { registerUserValidator } from "../validators/users.js";
import { UserModel } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/mailing.js";
import config from "../utils/config.js";
import crypto from "crypto";

//User registration for new optimized code
export const registerUser_new = async (req, res) => {
  console.time("registerUser_new_total");

  // Validate user input
  const { error, value } = registerUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }

  // Check if email already exists in the database
  console.time("DB: check existing user new");
  const existingUser = await UserModel.findOne({ email: value.email });
  console.timeEnd("DB: check existing user new");

  if (existingUser) {
    return res.status(422).json("User already exists!");
  }

  // Hash plaintext password
  console.time("CPU: hash password new");
  const hashedPassword = await bcrypt.hash(value.password, 10);
  console.timeEnd("CPU: hash password new");

  //creating a token
  console.time("CPU + DB: token generation & save new");
  const verificationToken = crypto.randomBytes(8).toString("hex");
  console.timeEnd("CPU + DB: token generation & save new");

  // Create user with password and assign token in a single DB write
  console.time("DB: create user new");
  const user = await UserModel.create({
    ...value,
    password: hashedPassword,
    verificationToken: verificationToken,
  });
  console.timeEnd("DB: create user new");

  // Send email verification to user via their email address
  console.time("I/O: send email new");
  await sendEmail({
    from: config.SMPT_EMAIL,
    to: user.email,
    subject: "Verify your Test Arena account",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333;
    }
    .button {
      display: inline-block;
      padding: 12px 25px;
      background-color: #007bff;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      text-align: center;
      border: none;
    }
    .button:hover {
      background-color: #0056b3;
      color: #ffffff !important;
    }
    .fallback-url {
      margin-top: 20px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h2>Hello ${user.firstname},</h2>
    <p>Welcome to Test Arena! We’re excited to have you on board.</p>
    <p>To get started, please verify your email address by clicking the button below:</p>

    <!-- Verification button -->
    <a href="https://localhost:3000/verify-email?token=${verificationToken}" class="button">Verify Email Address</a>

    <!-- Expiry Note -->
    <p class="expiry-note">Note: This verification link will expire in an hour.</p>

    <p class="fallback-url">
      If you’re having trouble with the button above, copy and paste the URL below into your web browser:
    </p>
    <p>
      <a href="https://localhost:3000/verify-email?token=${verificationToken}">https://localhost:3000/verify-email?token=${verificationToken}</a>
    </p>

    <p>Cheers,</p>
    <p>- Test Arena</p>
  </div>
</body>
</html>
`,
  });
  console.timeEnd("I/O: send email new");

  console.timeEnd("registerUser_new_total");
  res.status(201).json({
    message:
      "Registration successful. Please check your email to verify your account.",
  });
};
