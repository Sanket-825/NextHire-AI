import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import AuthLayout from "../components/AuthLayout";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { forgotPassword } from "../../../services/authService";
import getErrorMessage from "../../../lib/getErrorMessage";

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { email: "" } });

  const onSubmit = async ({ email }) => {
    setIsSubmitting(true);
    try {
      await forgotPassword(email);
      setIsSent(true);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not send reset link"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle={`We've sent a password reset link to ${getValues("email")}.`}
        footer={
          <>
            Remembered it?{" "}
            <Link to="/login" className="text-accent-green hover:underline">
              Log in
            </Link>
          </>
        }
      >
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setIsSent(false)}
        >
          Didn&apos;t get it? Try again
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a reset link."
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
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
        />

        <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
          Send reset link
        </Button>
      </form>
    </AuthLayout>
  );
}