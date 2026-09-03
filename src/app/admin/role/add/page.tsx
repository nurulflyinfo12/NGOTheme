"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus, Save, Shield } from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import StatusSelect from "@/components/Admin/StatusSelect";
import { TextField } from "@/components/Admin/TextField";
import { useRoles } from "@/hooks/useRoles";

export interface RoleFormData {
  RoleID?: number;
  RoleName: string;
  RoleDescription: string;
  IsActive: boolean;
  IsSelfService: number;
  Status: boolean;
}

export default function AddEditRolePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleIdParam = searchParams.get("id");
  const isEditMode = Boolean(roleIdParam);

  const { submitting, fetchRoleById, createRole, updateRole } = useRoles();

  const [formData, setFormData] = useState<RoleFormData>({
    RoleName: "",
    RoleDescription: "",
    IsActive: true,
    IsSelfService: 0,
    Status: true,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RoleFormData, string>>
  >({});

  useEffect(() => {
    if (isEditMode) {
      const rawData = localStorage.getItem("tempRoleData");
      if (rawData) {
        try {
          const role = JSON.parse(rawData);
          setFormData({
            RoleID: Number(role.RoleID),
            RoleName: role.RoleName || "",
            RoleDescription: role.RoleDescription || "",
            IsActive: Boolean(role.IsActive),
            IsSelfService: role.IsSelfService || 0,
            Status: role.Status ?? true,
          });
        } catch (e) {
          console.error("Failed to parse local role data:", e);
        }
      } else if (roleIdParam) {
        fetchRoleById(roleIdParam).then((role) => {
          if (role) {
            setFormData({
              RoleID: Number(role.RoleID),
              RoleName: role.RoleName || "",
              RoleDescription: role.RoleDescription || "",
              IsActive: Boolean(role.IsActive),
              IsSelfService: role.IsSelfService || 0,
              Status: role.Status ?? true,
            });
          }
        });
      }
    }
  }, [isEditMode, roleIdParam, fetchRoleById]);

  const validate = () => {
    const newErrors: Partial<Record<keyof RoleFormData, string>> = {};
    if (!formData.RoleName.trim()) newErrors.RoleName = "Role name is required";
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
    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    const payload = {
      CompanyID: currentUser?.CompanyID || "",
      RoleID: isEditMode ? Number(roleIdParam) : 0,
      RoleName: formData.RoleName,
      RoleDescription: formData.RoleDescription,
      IsSelfService: formData.IsSelfService,
      SetDate: new Date().toISOString(),
      UserId: currentUser?.UserId || "",
      IsActive: formData.IsActive,
      Status: formData.IsActive,
    };

    const success = isEditMode
      ? await updateRole(roleIdParam!, payload)
      : await createRole(payload);

    if (success) {
      localStorage.removeItem("tempRoleData");
      router.push("/admin/role");
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
        <TextField
          label="Role Name"
          icon={Shield}
          placeholder="e.g. Content Manager"
          value={formData.RoleName}
          onChange={(e) => handleChange("RoleName", e.target.value)}
          error={errors.RoleName}
          required
        />

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
            Description
          </label>
          <textarea
            rows={3}
            value={formData.RoleDescription}
            onChange={(e) => handleChange("RoleDescription", e.target.value)}
            className="w-full py-3 px-4 text-sm sm:text-base border-2 border-slate-200/80 rounded-2xl text-slate-800 placeholder-slate-400 outline-none bg-white/70 focus:bg-white focus:border-[#f86048] transition-all shadow-sm"
            placeholder="Provide a short description for this role..."
          />
        </div>

        <div className="space-y-2">
          <StatusSelect
            label="Status"
            required
            value={formData.IsActive ? "Active" : "Inactive"}
            onChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                IsActive: val === "Active",
                Status: val === "Active",
              }))
            }
          />
        </div>
      </FormCard>
    </div>
  );
}
