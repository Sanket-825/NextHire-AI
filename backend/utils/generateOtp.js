import crypto from "crypto";

export const generateOtp = () => {
  const otp = crypto.randomInt(100000, 1000000).toString();
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
  return { otp, otpHash };
};

export const hashOtp = (otp) => crypto.createHash("sha256").update(otp).digest("hex");