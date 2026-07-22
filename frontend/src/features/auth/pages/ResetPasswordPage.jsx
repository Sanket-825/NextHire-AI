import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import Button from "../../../components/ui/Button";
import { resetPassword } from "../../../services/authService";
import getErrorMessage from "../../../lib/getErrorMessage";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { password: "", confirmPassword: "" } });

  const password = watch("password");

  const onSubmit = async ({ password }) => {
    setIsSubmitting(true);
    try {
      await resetPassword(token, password);
      toast.success("Password reset. Please log in with your new password.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "This reset link is invalid or has expired"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Choose a new password for your account."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="text-accent-green hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <PasswordInput
          label="New password"
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
            pattern: {
              value: /\d/,
              message: "Password must contain at least one number",
            },
          })}
        />

        <PasswordInput
          label="Confirm new password"
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />

        <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
          Reset password
        </Button>
      </form>
    </AuthLayout>
  );
}