// models/Otp.js
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true }, // hashed
  expiresAt: { type: Date, required: true },
  verified: { type: Boolean, default: false },
});

export default mongoose.model("Otp", otpSchema);
