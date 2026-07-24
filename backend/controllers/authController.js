import crypto from "crypto";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import PendingRegistration from "../models/PendingRegistration.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";
import sendEmail from "../utils/sendEmail.js";
import { generateOtp, hashOtp } from "../utils/generateOtp.js";

const OTP_TTL_MINUTES = 10;

/**
 * @desc    Start registration: store signup data + email an OTP.
 *          The real User account isn't created until the OTP is verified.
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("An account with this email already exists");
  }

  const { otp, otpHash } = generateOtp();
  const otpExpiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  // Upsert so re-registering the same (unverified) email just refreshes
  // the OTP instead of erroring on a duplicate-email unique index.
  await PendingRegistration.findOneAndUpdate(
    { email },
    { name, email, password, otpHash, otpExpiresAt, expiresAt: otpExpiresAt },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  try {
    await sendEmail({
      to: email,
      subject: "Verify your NextHire AI account",
      html: `<p>Your verification code is:</p>
             <h2>${otp}</h2>
             <p>This code expires in ${OTP_TTL_MINUTES} minutes.</p>`,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Could not send verification email, please try again");
  }

  res.status(201).json({
    success: true,
    message: "Verification code sent to your email",
    email,
  });
});

/**
 * @desc    Verify the OTP emailed at registration and create the real User
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const pending = await PendingRegistration.findOne({ email });
  if (!pending) {
    res.status(400);
    throw new Error("No pending registration found for this email. Please register again.");
  }

  if (pending.otpExpiresAt < new Date()) {
    await PendingRegistration.deleteOne({ _id: pending._id });
    res.status(400);
    throw new Error("This code has expired. Please register again to get a new one.");
  }

  const otpHash = hashOtp(otp);
  if (otpHash !== pending.otpHash) {
    res.status(400);
    throw new Error("Invalid verification code");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    await PendingRegistration.deleteOne({ _id: pending._id });
    res.status(400);
    throw new Error("An account with this email already exists");
  }

  const user = await User.create({
    name: pending.name,
    email: pending.email,
    password: pending.password, // pre-save hook hashes this on create
  });

  await PendingRegistration.deleteOne({ _id: pending._id });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.status(201).json({
    success: true,
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      theme: user.theme,
    },
  });
});

/**
 * @desc    Resend a fresh OTP for a pending (unverified) registration
 * @route   POST /api/auth/resend-otp
 * @access  Public
 */
export const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const pending = await PendingRegistration.findOne({ email });
  if (!pending) {
    res.status(400);
    throw new Error("No pending registration found for this email. Please register again.");
  }

  const { otp, otpHash } = generateOtp();
  const otpExpiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  pending.otpHash = otpHash;
  pending.otpExpiresAt = otpExpiresAt;
  pending.expiresAt = otpExpiresAt;
  await pending.save();

  try {
    await sendEmail({
      to: email,
      subject: "Your new NextHire AI verification code",
      html: `<p>Your new verification code is:</p>
             <h2>${otp}</h2>
             <p>This code expires in ${OTP_TTL_MINUTES} minutes.</p>`,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Could not send verification email, please try again");
  }

  res.status(200).json({ success: true, message: "A new verification code has been sent" });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @acces  Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json({
    success: true,
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      theme: user.theme,
    },
  });
});

/**
 * @desc    Logout user (invalidate refresh token)
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { refreshToken: "" });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

/**
 * @desc    Get currently logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

/**
 * @desc    Issue a new access token using a valid refresh token
 * @route   POST /api/auth/refresh
 * @access  Public
 */
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401);
    throw new Error("Refresh token required");
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    res.status(401);
    throw new Error("Invalid or expired refresh token");
  }

  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== refreshToken) {
    res.status(401);
    throw new Error("Refresh token not recognized, please log in again");
  }

  const newAccessToken = generateAccessToken(user._id);
  res.status(200).json({ success: true, accessToken: newAccessToken });
});

/**
 * @desc    Send password reset email
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  // Always respond with success to avoid leaking which emails are registered
  if (!user) {
    return res.status(200).json({
      success: true,
      message: "If that email is registered, a reset link has been sent",
    });
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Click the link below (valid for 15 minutes):</p>
             <a href="${resetUrl}">${resetUrl}</a>`,
    });
    res.status(200).json({
      success: true,
      message: "If that email is registered, a reset link has been sent",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500);
    throw new Error("Email could not be sent, please try again later");
  }
});

/**
 * @desc    Reset password using token from email
 * @route   PUT /api/auth/reset-password/:token
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Reset token is invalid or has expired");
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ success: true, message: "Password reset successful" });
});