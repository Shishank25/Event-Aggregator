import express from "express";
import passport from "passport";
import { getUser, googleCallback, sendOtp, verifyOtp } from "../controllers/auth.controller.js";
import { authenticateToken } from "../services/email.services.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleCallback
);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get('/me', authenticateToken, getUser);

export default router;
