"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiUser {
  UserId?: string;
  CompanyID?: string;
  UserName?: string;
  EmployeeID?: string;
  EmployeeName?: string;
  UserFullName: string;
  Password?: string;
  OldPassword?: string;
  AccessLevel?: string;
  ConfirmPassword?: string;
  Email: string;
  RoleID: string;
  IsAdmin?: boolean;
  IsHead?: boolean;
  RoleName?: string;
  ChangePassword?: boolean;
  IsActive: boolean;
  IsLockedOut?: boolean;
  AccessToken?: string;
}

export function useUsers() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Fetch All Users: GET /api/User/get-all-user
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get<ApiUser[]>("/User/get-all-user");
      const list = Array.isArray(data) ? data : [];
      setUsers(list);
      return list;
    } catch (err: any) {
      const msg = err.message || "Failed to load users.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Error", text: msg });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Create User: POST /api/User/create-user
  const createUser = async (payload: ApiUser) => {
    setSubmitting(true);
    setError("");
    try {
      await api.post("/User/create-user", payload);
      Swal.fire({
        icon: "success",
        title: "Created!",
        text: "User created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg = err.message || "Failed to create user.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Creation Failed", text: msg });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Update User: POST /api/User/update-user
  const updateUser = async (payload: Partial<ApiUser>) => {
    setSubmitting(true);
    setError("");
    try {
      await api.post("/User/update-user", {
        UserId: payload.UserId,
        UserFullName: payload.UserFullName,
        RoleID: payload.RoleID,
        Email: payload.Email,
        IsAdmin: payload.IsAdmin ?? false,
        IsActive: payload.IsActive ?? true,
        IsLockedOut: payload.IsLockedOut ?? false,
      });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "User updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg = err.message || "Failed to update user.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Update Failed", text: msg });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    users,
    loading,
    submitting,
    error,
    fetchUsers,
    createUser,
    updateUser,
  };
}