"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus, Save, User as UserIcon, Mail, Shield, Lock } from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import StatusSelect from "@/components/Admin/StatusSelect";
import { TextField } from "@/components/Admin/TextField";
import { useUsers, ApiUser } from "@/hooks/useUsers";
import { useRoles, ApiRole } from "@/hooks/useRoles";

export interface UserFormData {
  userId?: string;
  userName: string;
  userFullName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  roleId: string;
  roleName?: string;
  isAdmin: boolean;
  isActive: boolean;
  isLockedOut: boolean;
}

export default function AddEditUserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get("id");
  const isEditMode = Boolean(userIdParam);

  const { submitting, createUser, updateUser } = useUsers();
  const { roles, fetchRoles } = useRoles();

  const [formData, setFormData] = useState<UserFormData>({
    userName: "",
    userFullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleId: "",
    isAdmin: false,
    isActive: true,
    isLockedOut: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormData, string>>
  >({});

  // Populate roles dropdown on component load
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // Load user data when editing an existing user
  useEffect(() => {
    if (isEditMode) {
      const rawData = localStorage.getItem("tempUserData");
      if (rawData) {
        try {
          const user: ApiUser = JSON.parse(rawData);
          setFormData({
            userId: user.UserId || userIdParam || "0",
            userName: user.UserName || "",
            userFullName: user.UserFullName || user.EmployeeName || "",
            email: user.Email || "",
            roleId: user.RoleID || "",
            roleName: user.RoleName || "",
            isAdmin: user.IsAdmin ?? false,
            isActive: user.IsActive ?? true,
            isLockedOut: user.IsLockedOut ?? false,
          });
        } catch (err) {
          console.error("Error parsing user data:", err);
        }
      }
    }
  }, [isEditMode, userIdParam]);

  const validate = () => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    if (!formData.userFullName.trim())
      newErrors.userFullName = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.roleId) newErrors.roleId = "Role selection is required";

    if (!isEditMode) {
      if (!formData.password) newErrors.password = "Password is required";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof UserFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
    const companyIdValue = currentUser?.CompanyID || "0";

    const selectedRole = roles.find(
      (r: ApiRole) => String(r.RoleID) === formData.roleId
    );

    let success = false;

    if (isEditMode) {
      success = await updateUser({
        UserId: formData.userId || userIdParam || "0",
        UserFullName: formData.userFullName,
        RoleID: formData.roleId,
        Email: formData.email,
        IsAdmin: formData.isAdmin,
        IsActive: formData.isActive,
        IsLockedOut: formData.isLockedOut,
      });
    } else {
      const createPayload: ApiUser = {
        UserId: "0",
        CompanyID: companyIdValue,
        UserName: formData.userName || formData.email,
        UserFullName: formData.userFullName,
        EmployeeID: "0",
        EmployeeName: formData.userFullName,
        Password: formData.password || "",
        ConfirmPassword: formData.confirmPassword || "",
        OldPassword: "",
        AccessLevel: "User",
        Email: formData.email,
        RoleID: formData.roleId,
        RoleName: selectedRole ? selectedRole.RoleName : "",
        IsAdmin: formData.isAdmin,
        IsHead: false,
        ChangePassword: false,
        IsActive: formData.isActive,
        IsLockedOut: formData.isLockedOut,
        AccessToken: "",
      };

      success = await createUser(createPayload);
    }

    if (success) {
      localStorage.removeItem("tempUserData");
      router.push("/admin/user");
    }
  };

  const handleClear = () => {
    setFormData({
      userId: isEditMode ? formData.userId : undefined,
      userName: "",
      userFullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      roleId: "",
      isAdmin: false,
      isActive: true,
      isLockedOut: false,
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen">
      <FormCard
        title={isEditMode ? "Edit User" : "Add New User"}
        description={
          isEditMode
            ? "Update user profile and assigned roles."
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
          isEditMode ? (
            <Save className="h-4 w-4" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )
        }
        onSubmit={handleSubmit}
      >
        <TextField
          label="Full Name"
          icon={UserIcon}
          placeholder="e.g. John Doe"
          value={formData.userFullName}
          onChange={(e) => handleChange("userFullName", e.target.value)}
          error={errors.userFullName}
          required
        />

        <TextField
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
          required
        />

        {/* Dynamic Role Dropdown from useRoles */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
            Role <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.roleId}
              onChange={(e) => handleChange("roleId", e.target.value)}
              className={`w-full py-3 px-4 pl-10 text-sm sm:text-base border-2 rounded-2xl text-slate-800 outline-none bg-white/70 focus:bg-white transition-all shadow-sm appearance-none ${
                errors.roleId
                  ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
                  : "border-slate-200/80 focus:border-[#e86958]"
              }`}
            >
              <option value="">Select Role</option>
              {roles.map((role: ApiRole) => (
                <option key={role.RoleID} value={String(role.RoleID)}>
                  {role.RoleName}
                </option>
              ))}
            </select>
            <Shield className="absolute left-3 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
          {errors.roleId && (
            <p className="text-xs text-red-600 flex items-center gap-1 ml-1 mt-1">
              {errors.roleId}
            </p>
          )}
        </div>

        <StatusSelect
          label="Status"
          required
          value={formData.isActive ? "Active" : "Inactive"}
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, isActive: val === "Active" }))
          }
        />

        {!isEditMode && (
          <>
            <TextField
              label="Password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
              required
            />

            <TextField
              label="Confirm Password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
              required
            />
          </>
        )}
      </FormCard>
    </div>
  );
}