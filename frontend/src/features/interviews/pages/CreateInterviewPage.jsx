import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import { createInterviewSession } from "../../../services/interviewService";
import { useInterviewOptions } from "../hooks/useInterviewOptions";
import getErrorMessage from "../../../lib/getErrorMessage";

export default function CreateInterviewPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: options, isLoading: isLoadingOptions, isError: isOptionsError } = useInterviewOptions();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { role: "", experienceLevel: "", difficulty: "Medium", interviewType: "" },
  });

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const session = await createInterviewSession(formData);
      navigate(`/interviews/${session._id}/session`);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not create interview session"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text">Start a new interview</h1>
        <p className="text-sm text-text-secondary mt-1">
          Tell us what you'd like to practice and we'll generate questions for you.
        </p>
      </div>

      <Card>
        {isLoadingOptions && (
          <p className="text-sm text-text-secondary py-4 text-center">Loading options...</p>
        )}

        {isOptionsError && (
          <p className="text-sm text-error py-4 text-center">
            Couldn't load interview options. Please refresh the page.
          </p>
        )}

        {options && (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <Input
              label="Job role"
              placeholder="e.g. Frontend Developer"
              error={errors.role?.message}
              {...register("role", { required: "Role is required" })}
            />

            <Select
              label="Experience level"
              placeholder="Select experience level"
              options={options.experienceLevels}
              error={errors.experienceLevel?.message}
              {...register("experienceLevel", { required: "Experience level is required" })}
            />

            <Select
              label="Difficulty"
              options={options.difficulties}
              error={errors.difficulty?.message}
              {...register("difficulty", { required: "Difficulty is required" })}
            />

            <Select
              label="Interview type"
              placeholder="Select interview type"
              groups={options.interviewTypeCategories}
              error={errors.interviewType?.message}
              {...register("interviewType", { required: "Interview type is required" })}
            />

            <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
              Create interview
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}