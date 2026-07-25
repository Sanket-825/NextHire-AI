import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiShieldCheck, HiOutlineSparkles, HiOutlineChartBar, HiOutlineLightBulb, HiOutlineCheckCircle } from "react-icons/hi2";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Logo from "../../../components/brand/Logo";
import OtpInput from "../components/OtpInput";
import { useAuth } from "../../../context/AuthContext";
import { resendOtp } from "../../../services/authService";
import getErrorMessage from "../../../lib/getErrorMessage";
import maskEmail from "../../../lib/maskEmail";

const OTP_TTL_SECONDS = 10 * 60;
const RESEND_COOLDOWN_SECONDS = 30;

const FEATURES = [
  { icon: HiOutlineSparkles, title: "AI Mock Interviews", desc: "Questions generated for your role & level" },
  { icon: HiOutlineCheckCircle, title: "AI Feedback & Scoring", desc: "Scored answers with improvement tips" },
  { icon: HiOutlineChartBar, title: "Performance Dashboard", desc: "Track your progress over time" },
  { icon: HiOutlineLightBulb, title: "Topic Recommendations", desc: "Know exactly what to practice next" },
];

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function VerifyOtpPage() {
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [expirySeconds, setExpirySeconds] = useState(OTP_TTL_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);

  useEffect(() => {
    if (!email) return;
    const timer = setInterval(() => {
      setExpirySeconds((s) => Math.max(s - 1, 0));
      setResendCooldown((s) => Math.max(s - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [email]);

  if (!email) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <Card className="max-w-sm text-center">
          <h1 className="text-lg font-semibold text-text mb-2">Nothing to verify</h1>
          <p className="text-sm text-text-secondary mb-4">
            Please register first to receive a verification code.
          </p>
          <Link to="/register" className="text-sm text-accent-green hover:underline">
            Go to register
          </Link>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError("Enter the full 6-digit code");
      return;
    }
    setOtpError("");
    setIsSubmitting(true);
    try {
      await verifyOtp(email, otp);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Invalid or expired code"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendOtp(email);
      toast.success("A new code has been sent");
      setExpirySeconds(OTP_TTL_SECONDS);
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
      setOtp("");
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not resend code"));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left brand panel — hidden on small screens */}
      <div className="hidden lg:flex lg:w-[420px] shrink-0 flex-col justify-center px-10 border-r border-border">
        <Link to="/" className="flex items-center gap-2 text-text font-semibold text-lg mb-8">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-green/10 border border-accent-green/30">
            <Logo className="w-4 h-4 text-accent-green" />
          </span>
          NextHire AI
        </Link>

        <h1 className="text-2xl font-semibold text-text leading-snug">
          AI-Powered Interviews.<br />
          <span className="text-accent-green">Real</span> Careers.
        </h1>
        <p className="text-sm text-text-secondary mt-3 mb-8">
          Practice, get scored, and know exactly what to work on next.
        </p>

        <div className="flex flex-col gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface border border-border shrink-0">
                <Icon className="w-4 h-4 text-accent-green" />
              </span>
              <div>
                <p className="text-sm text-text font-medium">{title}</p>
                <p className="text-xs text-text-secondary">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: verification card */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-md bg-surface border border-border rounded-xl p-5 sm:p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-green/10 border border-accent-green/30 mb-4">
              <HiShieldCheck className="w-6 h-6 text-accent-green" />
            </span>
            <h1 className="text-xl font-semibold text-text">Verify your email</h1>
            <p className="text-sm text-text-secondary mt-1.5">
              We've sent a 6-digit verification code to
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-text">{maskEmail(email)}</span>
              <Link to="/register" className="text-xs text-accent-green hover:underline">
                Edit
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <OtpInput value={otp} onChange={setOtp} error={otpError} disabled={isSubmitting} />

            <p className="text-xs text-text-secondary text-center">
              This code expires in{" "}
              <span className={expirySeconds === 0 ? "text-error" : "text-accent-green"}>
                {formatTime(expirySeconds)}
              </span>
            </p>

            <div className="border-t border-border pt-4 text-center">
              <p className="text-xs text-text-secondary mb-1">Didn't receive the code?</p>
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending || resendCooldown > 0}
                className="text-sm text-accent-green hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
              >
                {resendCooldown > 0 ? `Resend code in ${formatTime(resendCooldown)}` : "Resend code"}
              </button>
            </div>

            <Button type="submit" isLoading={isSubmitting} className="w-full">
              Verify & Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}