import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import AuthLayout from "../components/AuthLayout";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAuth } from "../../../context/AuthContext";
import { resendOtp } from "../../../services/authService";
import getErrorMessage from "../../../lib/getErrorMessage";

const RESEND_COOLDOWN_SECONDS = 30;

export default function VerifyOtpPage() {
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { otp: "" } });

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  if (!email) {
    return (
      <AuthLayout
        title="Nothing to verify"
        subtitle="Please register first to receive a verification code."
      >
        <Link to="/register" className="text-sm text-accent-green hover:underline">
          Go to register
        </Link>
      </AuthLayout>
    );
  }

  const onSubmit = async ({ otp }) => {
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
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not resend code"));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle={`Enter the 6-digit code sent to ${email}`}
      footer={
        <button
          onClick={handleResend}
          disabled={isResending || cooldown > 0}
          className="text-sm text-accent-green hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
        >
          {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
        </button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Input
          label="Verification code"
          inputMode="numeric"
          maxLength={6}
          placeholder="123456"
          autoComplete="one-time-code"
          error={errors.otp?.message}
          {...register("otp", {
            required: "Code is required",
            pattern: { value: /^\d{6}$/, message: "Code must be 6 digits" },
          })}
        />

        <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
          Verify
        </Button>
      </form>
    </AuthLayout>
  );
}