"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiRole {
  CompanyID?: string;
  RoleID: number;
  RoleName: string;
  RoleDescription?: string;
  IsSelfService?: number;
  SetDate?: string;
  UserId?: string;
  IsActive: boolean;
  Status?: boolean;
}

export interface RolePayload {
  CompanyID: string;
  RoleID: number;
  RoleName: string;
  RoleDescription: string;
  IsSelfService: number;
  SetDate: string;
  UserId: string;
  IsActive: boolean;
  Status: boolean;
}

export function useRoles() {
  const [roles, setRoles] = useState<ApiRole[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Get All Roles
  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get<ApiRole[]>("/Permission/get-all-role");
      const roleList = Array.isArray(data) ? data : [];
      setRoles(roleList);
      return roleList;
    } catch (err: any) {
      const msg = err.message || "Failed to load roles.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Error", text: msg });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Get Single Role by ID
  const fetchRoleById = useCallback(async (id: string | number) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get<ApiRole | ApiRole[]>(`/Permission/get-user-role/${id}`);
      const role = Array.isArray(res) ? res[0] : res;
      return role || null;
    } catch (err: any) {
      const msg = err.message || "Failed to fetch role details.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Create Role
  const createRole = async (payload: RolePayload) => {
    setSubmitting(true);
    setError("");
    try {
      await api.post("/Permission/create-user-role", payload);
      Swal.fire({
        icon: "success",
        title: "Created!",
        text: "Role created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg = err.message || "Failed to create role.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Creation Failed", text: msg });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Update Role
  const updateRole = async (id: string | number, payload: RolePayload) => {
    setSubmitting(true);
    setError("");
    try {
      await api.post(`/Permission/update-role?id=${id}`, payload);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Role updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg = err.message || "Failed to update role.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Update Failed", text: msg });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 5. Delete Role
  const deleteRole = async (role: ApiRole) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${role.RoleName}". This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e86958",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.post(`/Permission/remove-role?roleId=${role.RoleID}`, {});
        Swal.fire({
          title: "Deleted!",
          text: "Role has been removed successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        await fetchRoles(); // Auto-refresh table
        return true;
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.message || "Could not delete role.",
        });
        return false;
      }
    }
    return false;
  };

  return {
    roles,
    loading,
    submitting,
    error,
    fetchRoles,
    fetchRoleById,
    createRole,
    updateRole,
    deleteRole,
  };
}