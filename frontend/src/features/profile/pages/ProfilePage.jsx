import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { HiOutlineUser, HiOutlineTrash } from "react-icons/hi2";

import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { useAuth } from "../../../context/AuthContext";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useUploadProfileImage } from "../hooks/useUploadProfileImage";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import getErrorMessage from "../../../lib/getErrorMessage";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const updateProfile = useUpdateProfile();
  const uploadImage = useUploadProfileImage();
  const deleteAccount = useDeleteAccount();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
      skills: (user.skills || []).join(", "),
      github: user.github || "",
      linkedin: user.linkedin || "",
      resumeUrl: user.resumeUrl || "",
    },
  });

  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    updateProfile.mutate(payload, {
      onSuccess: () => toast.success("Profile updated"),
      onError: (error) => toast.error(getErrorMessage(error, "Could not update profile")),
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadImage.mutate(file, {
      onSuccess: () => toast.success("Profile picture updated"),
      onError: (error) => toast.error(getErrorMessage(error, "Could not upload image")),
    });
  };

  const handleDeleteAccount = () => {
    deleteAccount.mutate(undefined, {
      onSuccess: async () => {
        setIsDeleteModalOpen(false);
        await logout();
        navigate("/login", { replace: true });
      },
      onError: (error) => toast.error(getErrorMessage(error, "Could not delete account")),
    });
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-text">Profile</h1>

      <Card className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-surface-hover border border-border overflow-hidden flex items-center justify-center shrink-0">
          {user.profileImage?.url ? (
            <img src={user.profileImage.url} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <HiOutlineUser className="w-6 h-6 text-text-secondary" />
          )}
        </div>
        <div>
          <label className="inline-block cursor-pointer text-sm text-accent-green hover:underline">
            {uploadImage.isPending ? "Uploading..." : "Change picture"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploadImage.isPending}
              className="hidden"
            />
          </label>
          <p className="text-xs text-text-secondary mt-1">JPG or PNG, up to a few MB.</p>
        </div>
      </Card>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <Input
            label="Name"
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required",
              maxLength: { value: 50, message: "Name cannot exceed 50 characters" },
            })}
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="bio" className="text-sm text-text-secondary">
              Bio
            </label>
            <textarea
              id="bio"
              rows={3}
              maxLength={300}
              placeholder="A short bio about yourself..."
              className="w-full resize-y bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-green/50 transition-colors duration-150"
              {...register("bio", {
                maxLength: { value: 300, message: "Bio cannot exceed 300 characters" },
              })}
            />
            {errors.bio && <p className="text-xs text-error">{errors.bio.message}</p>}
          </div>

          <Input
            label="Skills"
            placeholder="React, Node.js, MongoDB"
            error={errors.skills?.message}
            {...register("skills")}
          />

          <Input label="GitHub" placeholder="https://github.com/username" {...register("github")} />
          <Input label="LinkedIn" placeholder="https://linkedin.com/in/username" {...register("linkedin")} />
          <Input label="Resume URL" placeholder="https://..." {...register("resumeUrl")} />

          <Button type="submit" isLoading={updateProfile.isPending} className="w-full mt-2">
            Save changes
          </Button>
        </form>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text">Delete account</p>
            <p className="text-xs text-text-secondary mt-0.5">
              This permanently removes your account and all your data.
            </p>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <HiOutlineTrash className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <Modal open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} title="Delete account?">
        <p className="text-sm text-text-secondary mb-6">
          This action is permanent and cannot be undone. All your interview sessions,
          questions, and feedback will be deleted.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            isLoading={deleteAccount.isPending}
            onClick={handleDeleteAccount}
          >
            Delete account
          </Button>
        </div>
      </Modal>
    </div>
  );
}