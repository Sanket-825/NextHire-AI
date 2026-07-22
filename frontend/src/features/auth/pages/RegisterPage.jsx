import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAuth } from "../../../context/AuthContext";
import getErrorMessage from "../../../lib/getErrorMessage";

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const password = watch("password");

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not create your account"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start practicing interviews with AI feedback."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-accent-green hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Input
          label="Name"
          autoComplete="name"
          placeholder="Jane Doe"
          error={errors.name?.message}
          {...register("name", {
            required: "Name is required",
            maxLength: { value: 50, message: "Name cannot exceed 50 characters" },
          })}
        />

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

        <PasswordInput
          label="Password"
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
          label="Confirm password"
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />

        <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
}
