"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiStaff {
  StaffID?: string;
  ID?: string;
  Type: string;
  Name: string;
  Photo: string;
  Position: string;
  Email: string;
  IsActive: boolean;
  SetDate?: string;
}

export function useStaff() {
  const [staffList, setStaffList] = useState<ApiStaff[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Get All Staff: GET /api/Staff/GetAllStaff
  const fetchStaff = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get<ApiStaff[]>("/Staff/GetAllStaff");
      const list = Array.isArray(data) ? data : [];
      setStaffList(list);
      return list;
    } catch (err: any) {
      const msg = err.message || "Failed to load staff records.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Error", text: msg });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Get Staff By ID: GET /api/Staff/GetStaffById?staffId={id}
  const fetchStaffById = useCallback(async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get<ApiStaff | ApiStaff[]>(
        `/Staff/GetStaffById?staffId=${encodeURIComponent(id)}`
      );
      const member = Array.isArray(res) ? res[0] : res;
      return member || null;
    } catch (err: any) {
      const msg = err.message || "Failed to fetch staff details.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Save or Update Staff: POST /api/Staff/SaveUpdateStaff
  const saveOrUpdateStaff = async (payload: Partial<ApiStaff>) => {
    setSubmitting(true);
    setError("");
    try {
      await api.post("/Staff/SaveUpdateStaff", {
        ...payload,
        SetDate: payload.SetDate || new Date().toISOString(),
      });

      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Staff record saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg = err.message || "Failed to save staff record.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Save Failed", text: msg });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Delete Staff: POST /api/Staff/DeleteStaff?staffId={id}
  const deleteStaff = async (staffMember: ApiStaff) => {
    const staffId = staffMember.StaffID || staffMember.ID || "";
    
    if (!staffId) {
      Swal.fire({ icon: "error", title: "Error", text: "Invalid Staff ID." });
      return false;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Remove ${staffMember.Name}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f86048",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      try {
        await api.post(`/Staff/DeleteStaff?staffId=${encodeURIComponent(staffId)}`, {});
        Swal.fire({
          title: "Deleted!",
          text: "Staff member has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        await fetchStaff();
        return true;
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.message || "Could not delete staff record.",
        });
        return false;
      }
    }
    return false;
  };

  return {
    staffList,
    loading,
    submitting,
    error,
    fetchStaff,
    fetchStaffById,
    saveOrUpdateStaff,
    deleteStaff,
  };
}