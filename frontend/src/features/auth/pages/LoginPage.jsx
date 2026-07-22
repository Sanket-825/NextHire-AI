import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAuth } from "../../../context/AuthContext";
import getErrorMessage from "../../../lib/getErrorMessage";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  // If the user was redirected here from a protected route, send them
  // back to where they were headed once login succeeds.
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await login(formData);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Invalid email or password"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue practicing."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-accent-green hover:underline">
            Sign up
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

        <PasswordInput
          label="Password"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />

        <div className="flex justify-end -mt-1">
          <Link
            to="/forgot-password"
            className="text-xs text-text-secondary hover:text-text transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
          Log in
        </Button>
      </form>
    </AuthLayout>
  );
}
