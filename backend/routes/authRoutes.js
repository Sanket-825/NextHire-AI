import express from "express";
import {
  registerUser,
  verifyOtp,
  resendOtp,
  loginUser,
  logoutUser,
  getMe,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import {
  registerValidation,
  verifyOtpValidation,
  resendOtpValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../utils/validators.js";

const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post("/verify-otp", verifyOtpValidation, validate, verifyOtp);
router.post("/resend-otp", resendOtpValidation, validate, resendOtp);
router.post("/login", loginValidation, validate, loginUser);
router.post("/logout", protect, logoutUser);
router.get("/me", protect, getMe);
router.post("/refresh", refreshAccessToken);
router.post("/forgot-password", forgotPasswordValidation, validate, forgotPassword);
router.put("/reset-password/:token", resetPasswordValidation, validate, resetPassword);

export default router;