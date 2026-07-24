import { body } from "express-validator";

export const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required")
    .isLength({ max: 50 }).withMessage("Name cannot exceed 50 characters"),
  body("email").trim().isEmail().withMessage("Please provide a valid email").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/\d/).withMessage("Password must contain at least one number"),
];

export const loginValidation = [
  body("email").trim().isEmail().withMessage("Please provide a valid email").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

export const verifyOtpValidation = [
  body("email").trim().isEmail().withMessage("Please provide a valid email").normalizeEmail(),
  body("otp").trim().isLength({ min: 6, max: 6 }).withMessage("Code must be 6 digits")
    .isNumeric().withMessage("Code must contain only digits"),
];

export const resendOtpValidation = [
  body("email").trim().isEmail().withMessage("Please provide a valid email").normalizeEmail(),
];

export const forgotPasswordValidation = [
  body("email").trim().isEmail().withMessage("Please provide a valid email").normalizeEmail(),
];

export const resetPasswordValidation = [
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/\d/).withMessage("Password must contain at least one number"),
];