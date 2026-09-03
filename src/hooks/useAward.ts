"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiAward {
  AwardID?: string;
  CompanyID?: string;
  Title: string;
  Photo: string;
  Details: string;
  IsActive: boolean;
  SetDate?: string;
}

export function useAward() {
  const [awards, setAwards] = useState<ApiAward[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Fetch All Awards: GET /api/Award/GetAllAward
  const fetchAwards = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get<ApiAward[]>("/Award/GetAllAward");
      const list = Array.isArray(data) ? data : [];
      setAwards(list);
      return list;
    } catch (err: any) {
      const msg = err.message || "Failed to load awards.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Error", text: msg });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Fetch Award By ID: GET /api/Award/GetAwardById?awardId={id}
  const fetchAwardById = useCallback(async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get<ApiAward | ApiAward[]>(
        `/Award/GetAwardById?awardId=${encodeURIComponent(id)}`
      );
      const item = Array.isArray(res) ? res[0] : res;
      return item || null;
    } catch (err: any) {
      const msg = err.message || "Failed to fetch award details.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Save or Update Award: POST /api/Award/SaveUpdateAward
  const saveOrUpdateAward = async (payload: ApiAward) => {
    setSubmitting(true);
    setError("");
    try {
      await api.post("/Award/SaveUpdateAward", {
        ...payload,
        SetDate: payload.SetDate || new Date().toISOString(),
      });

      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Award saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg = err.message || "Failed to save award.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Save Failed", text: msg });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Delete Award: POST /api/Award/DeleteAward?awardId={id}
  const deleteAward = async (award: ApiAward) => {
    const awardId = award.AwardID || "";

    if (!awardId) {
      Swal.fire({ icon: "error", title: "Error", text: "Invalid Award ID." });
      return false;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete "${award.Title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f86048",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.post(
          `/Award/DeleteAward?awardId=${encodeURIComponent(awardId)}`,
          {}
        );
        Swal.fire({
          title: "Deleted!",
          text: "Award has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        await fetchAwards();
        return true;
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.message || "Could not delete award.",
        });
        return false;
      }
    }
    return false;
  };

  return {
    awards,
    loading,
    submitting,
    error,
    fetchAwards,
    fetchAwardById,
    saveOrUpdateAward,
    deleteAward,
  };
}