"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiCareer {
  CareerID?: string;
  CompanyID?: string;
  Title: string;
  Subtitle: string;
  Category: string;
  FileUpload: string;
  IsActive: boolean;
  SetDate?: string;
}

export function useCareer() {
  const [careers, setCareers] = useState<ApiCareer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Fetch All Public Careers: GET /api/Public/GetAllCareer
  const fetchCareers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get<ApiCareer[]>("/Public/GetAllCareer");
      const list = Array.isArray(data) ? data : [];
      setCareers(list);
      return list;
    } catch (err: any) {
      const msg = err.message || "Failed to load career openings.";
      setError(msg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Fetch Single Career by ID: GET /api/Public/GetCareerById?careerId={id}
  const fetchCareerById = useCallback(async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get<ApiCareer | ApiCareer[]>(
        `/Public/GetCareerById?careerId=${encodeURIComponent(id)}`
      );
      const item = Array.isArray(res) ? res[0] : res;
      return item || null;
    } catch (err: any) {
      const msg = err.message || "Failed to fetch career details.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Save or Update Career (Admin): POST /api/Career/SaveUpdateCareer
  const saveOrUpdateCareer = async (payload: ApiCareer) => {
    setSubmitting(true);
    setError("");
    try {
      await api.post("/Career/SaveUpdateCareer", {
        ...payload,
        SetDate: payload.SetDate || new Date().toISOString(),
      });

      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Career opening saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg = err.message || "Failed to save career opening.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Save Failed", text: msg });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Delete Career (Admin): POST /api/Career/DeleteCareer?careerId={id}
  const deleteCareer = async (item: ApiCareer) => {
    const careerId = item.CareerID || "";

    if (!careerId) {
      Swal.fire({ icon: "error", title: "Error", text: "Invalid Career ID." });
      return false;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Remove job opening "${item.Title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f86048",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.post(
          `/Career/DeleteCareer?careerId=${encodeURIComponent(careerId)}`,
          {}
        );
        Swal.fire({
          title: "Deleted!",
          text: "Career opening has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        await fetchCareers();
        return true;
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.message || "Could not delete career opening.",
        });
        return false;
      }
    }
    return false;
  };

  return {
    careers,
    loading,
    submitting,
    error,
    fetchCareers,
    fetchCareerById,
    saveOrUpdateCareer,
    deleteCareer,
  };
}