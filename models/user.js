import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";
const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    verificationToken: { type: String },
  },
  { timestamps: true }
);

userSchema.plugin(normalize);
export const UserModel = model("User", userSchema);
