import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { cloudinary, uploadBufferToCloudinary } from "../config/cloudinary.js";

/**
 * @desc    Update logged-in user's profile fields
 * @route   PUT /api/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ["name", "bio", "skills", "github", "linkedin", "resumeUrl", "theme"];
  const updates = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, user });
});

/**
 * @desc    Upload / replace profile image via Cloudinary
 * @route   POST /api/profile/image
 * @access  Private
 */
export const uploadProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No image file provided");
  }

  const user = await User.findById(req.user._id);

  // Remove old image from Cloudinary if one exists
  if (user.profileImage?.publicId) {
    await cloudinary.uploader.destroy(user.profileImage.publicId);
  }

  // Upload the new image buffer (held in memory by multer) to Cloudinary
  const result = await uploadBufferToCloudinary(req.file.buffer);

  user.profileImage = {
    url: result.secure_url,
    publicId: result.public_id,
  };

  await user.save();

  res.status(200).json({ success: true, profileImage: user.profileImage });
});

/**
 * @desc    Delete logged-in user's account
 * @route   DELETE /api/profile
 * @access  Private
 */
export const deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user.profileImage?.publicId) {
    await cloudinary.uploader.destroy(user.profileImage.publicId);
  }

  await user.deleteOne();

  res.status(200).json({ success: true, message: "Account deleted successfully" });
});
