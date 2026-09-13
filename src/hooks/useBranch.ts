"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiBranch {
  BranchID?: string;
  CompanyID?: string;
  BranchName: string;
  Village?: string;
  PostOffice?: string;
  Union?: string;
  Thana?: string;
  Upazilla?: string;
  District: string;
  Phone?: string;
  Email?: string;
  Lat?: string;
  Long?: string;
  CreditOfficer?: string;
  IsActive: boolean;
  SetDate?: string;
}

export function useBranch() {
  const [branches, setBranches] = useState<ApiBranch[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Fetch All Public Branches: GET /api/Public/GetAllBranch
  const fetchBranches = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get<ApiBranch[]>("/Public/GetAllBranch");
      const list = Array.isArray(data) ? data : [];
      setBranches(list);
      return list;
    } catch (err: any) {
      const msg = err.message || "Failed to load branch records.";
      setError(msg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Fetch Branch By ID: GET /api/Branch/GetBranchById?branchId={id}
  const fetchBranchById = useCallback(async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get<ApiBranch | ApiBranch[]>(
        `/Branch/GetBranchById?branchId=${encodeURIComponent(id)}`
      );
      const item = Array.isArray(res) ? res[0] : res;
      return item || null;
    } catch (err: any) {
      const msg = err.message || "Failed to fetch branch details.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Save or Update Branch: POST /api/Branch/SaveUpdateBranch
  const saveOrUpdateBranch = async (payload: ApiBranch) => {
    setSubmitting(true);
    setError("");
    try {
      await api.post("/Branch/SaveUpdateBranch", {
        ...payload,
        SetDate: payload.SetDate || new Date().toISOString(),
      });

      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Branch saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg = err.message || "Failed to save branch.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Save Failed", text: msg });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Delete Branch: POST /api/Branch/DeleteBranch?branchId={id}
  const deleteBranch = async (branch: ApiBranch) => {
    const branchId = branch.BranchID || "";

    if (!branchId) {
      Swal.fire({ icon: "error", title: "Error", text: "Invalid Branch ID." });
      return false;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Remove ${branch.BranchName}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f86048",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      try {
        await api.post(
          `/Branch/DeleteBranch?branchId=${encodeURIComponent(branchId)}`,
          {}
        );
        Swal.fire({
          title: "Deleted!",
          text: "Branch has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        await fetchBranches();
        return true;
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.message || "Could not delete branch.",
        });
        return false;
      }
    }
    return false;
  };

  return {
    branches,
    loading,
    submitting,
    error,
    fetchBranches,
    fetchBranchById,
    saveOrUpdateBranch,
    deleteBranch,
  };
}