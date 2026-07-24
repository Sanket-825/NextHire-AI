import mongoose from "mongoose";

const pendingRegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 50 },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  otpHash: { type: String, required: true },
  otpExpiresAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
});

// TTL index — MongoDB automatically removes the document once expiresAt passes.
pendingRegistrationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("PendingRegistration", pendingRegistrationSchema);