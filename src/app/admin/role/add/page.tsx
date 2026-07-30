"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus, Save, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

import FormCard from "@/components/Admin/FormCard";
import StatusSelect from "@/components/Admin/StatusSelect";

export interface RoleFormData {
  name: string;
  description: string;
  permissions: string[];
  status: "Active" | "Inactive";
}

const ALL_PERMISSIONS = ["users", "programs", "blogs", "settings"];

export default function AddEditRolePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleId = searchParams.get("id");
  const isEditMode = Boolean(roleId);

  const [formData, setFormData] = useState<RoleFormData>({
    name: "",
    description: "",
    permissions: [],
    status: "Active",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RoleFormData, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const rawData = localStorage.getItem("tempRoleData");
      if (rawData) {
        try {
          const role = JSON.parse(rawData);
          setFormData({
            name: role.name || "",
            description: role.description || "",
            permissions: role.permissions || [],
            status: role.status === "Active" ? "Active" : "Inactive",
          });
        } catch (err) {
          console.error("Error parsing role data:", err);
        }
      }
    }
  }, [isEditMode, roleId]);

  const validate = () => {
    const newErrors: Partial<Record<keyof RoleFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Role name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: keyof RoleFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      console.log("Payload:", formData);
      localStorage.removeItem("tempRoleData");

      Swal.fire({
        icon: "success",
        title: isEditMode ? "Updated!" : "Created!",
        text: `Role ${isEditMode ? "updated" : "created"} successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/admin/role");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      description: "",
      permissions: [],
      status: "Active",
    });
    setErrors({});
  };

  const inputClass = (field: keyof RoleFormData) => `
    w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all text-black
    ${
      errors[field]
        ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
        : "border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
    }
  `;

  const togglePermission = (perm: string) => {
    if (formData.permissions.includes(perm)) {
      handleChange(
        "permissions",
        formData.permissions.filter((p) => p !== perm),
      );
    } else {
      handleChange("permissions", [...formData.permissions, perm]);
    }
  };

  return (
    <div className="min-h-screen">
      <FormCard
        title={isEditMode ? "Edit Role" : "Add New Role"}
        description={
          isEditMode
            ? "Update the role details below."
            : "Fill in the details to create a new role."
        }
        onBack={() => {
          localStorage.removeItem("tempRoleData");
          router.push("/admin/role");
        }}
        backButtonLabel="Back to List"
        onClear={handleClear}
        clearButtonLabel="Clear"
        submitLabel={
          submitting
            ? "Submitting..."
            : isEditMode
              ? "Save Changes"
              : "Create Role"
        }
        submitIcon={
          isEditMode ? (
            <Save className="h-4 w-4" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )
        }
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">
            Role Name <span className="text-red-500">*</span>
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

        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className={inputClass("description")}
            placeholder="Role description..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Permissions</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {ALL_PERMISSIONS.map((perm) => (
              <button
                key={perm}
                type="button"
                onClick={() => togglePermission(perm)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                  formData.permissions.includes(perm)
                    ? "bg-[#e86958] text-white border-[#e86958]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-[#fde1de] hover:border-[#e86958] hover:text-[#e86958]"
                }`}
              >
                {perm}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <StatusSelect
            label="Status"
            required
            value={formData.status}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, status: val }))
            }
            error={errors.status}
          />
        </div>
      </FormCard>
    </div>
  );
}
