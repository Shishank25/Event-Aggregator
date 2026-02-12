import jwt from "jsonwebtoken";
import crypto from "crypto";
import Otp from "../models/Otp.js";
import { sendOtpEmail } from "../services/email.services.js";
import User from "../models/User.js";

export const googleCallback = async (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const frontendURL = process.env.FRONTEND_URL;
  console.log("Redirecting to: ", frontendURL);

  res.redirect(
    `${frontendURL}/login/success?token=${token}`
  );
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const hashedOtp = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  await Otp.deleteMany({ email });

  await Otp.create({
    email,
    otp: hashedOtp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
  });

  // TODO: send email here
  sendOtpEmail(email, otp);
  console.log("OTP Sent Successfully!");

  res.json({ message: "OTP sent" });
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await Otp.findOne({ email });

    if (!record) {
      return res.status(400).json({ message: "No OTP found" });
    }

    if (record.expiresAt < Date.now()) {
      await Otp.deleteMany({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (hashedOtp !== record.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 🔥 Find or Create User
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name: email.split("@")[0], // simple fallback name
        authProvider: "otp", // optional but smart
      });
    }

    // 🔐 Standardized JWT payload
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await Otp.deleteMany({ email });

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getUser = async (req, res) => {
  try {
    // Find user by ID from the decoded token
    const user = await User.findById(req.userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data
    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar || null,
        createdAt: user.createdAt,
        // Add any other fields you want to send to frontend
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};