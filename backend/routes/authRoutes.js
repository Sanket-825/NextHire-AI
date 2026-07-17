import express from "express";
import {
  registerUser,
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
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../utils/validators.js";

const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);
router.post("/logout", protect, logoutUser);
router.get("/me", protect, getMe);
router.post("/refresh", refreshAccessToken);
router.post("/forgot-password", forgotPasswordValidation, validate, forgotPassword);
router.put("/reset-password/:token", resetPasswordValidation, validate, resetPassword);

export default router;
