"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus, Save, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

import FormCard from "@/components/Admin/FormCard";
import StatusSelect from "@/components/Admin/StatusSelect";

export interface UserFormData {
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Subscriber";
  status: "Active" | "Inactive";
}

export default function AddEditUserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const isEditMode = Boolean(userId);

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "Subscriber",
    status: "Active",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  // Load existing user data if editing
  useEffect(() => {
    if (isEditMode) {
      const rawData = localStorage.getItem("tempUserData");
      if (rawData) {
        try {
          const user = JSON.parse(rawData);
          setFormData({
            name: user.name || "",
            email: user.email || "",
            role: user.role || "Subscriber",
            status: user.status === "Active" ? "Active" : "Inactive",
          });
        } catch (err) {
          console.error("Error parsing user data:", err);
        }
      }
    }
  }, [isEditMode, userId]);

  const validate = () => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      console.log("Payload:", formData);

      localStorage.removeItem("tempUserData");

      Swal.fire({
        icon: "success",
        title: isEditMode ? "Updated!" : "Created!",
        text: `User ${isEditMode ? "updated" : "created"} successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/admin/user");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      role: "Subscriber",
      status: "Active",
    });
    setErrors({});
  };

  const inputClass = (field: keyof UserFormData) => `
    w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all text-black
    ${
      errors[field]
        ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
        : "border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
    }
  `;

  return (
    <div className="min-h-screen">
      <FormCard
        title={isEditMode ? "Edit User" : "Add New User"}
        description={
          isEditMode
            ? "Update the user details below."
            : "Fill in the details to create a new user."
        }
        onBack={() => {
          localStorage.removeItem("tempUserData");
          router.push("/admin/user");
        }}
        backButtonLabel="Back to List"
        onClear={handleClear}
        clearButtonLabel="Clear"
        submitLabel={
          submitting
            ? "Submitting..."
            : isEditMode
            ? "Save Changes"
            : "Create User"
        }
        submitIcon={
          isEditMode ? <Save className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />
        }
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={inputClass("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-600 flex items-center gap-1 ml-1">
              <AlertCircle size={12} /> {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-600 flex items-center gap-1 ml-1">
              <AlertCircle size={12} /> {errors.email}
            </p>
          )}
        </div>

        {/* Role */}
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Role</label>
          <select
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className={inputClass("role")}
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Subscriber">Subscriber</option>
          </select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <StatusSelect
            label="Status"
            required
            value={formData.status}
            onChange={(val) => setFormData((prev) => ({ ...prev, status: val }))}
            error={errors.status}
          />
        </div>
      </FormCard>
    </div>
  );
}