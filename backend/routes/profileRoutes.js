import express from "express";
import { upload } from "../config/cloudinary.js";
import { updateProfile, uploadProfileImage, deleteAccount } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.put("/", updateProfile);
router.post("/image", upload.single("image"), uploadProfileImage);
router.delete("/", deleteAccount);

export default router;
