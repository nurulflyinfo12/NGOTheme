"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiKeyInitiative {
  InitiativeID?: string;
  CompanyID?: string;
  Title: string;
  Photo: string;
  Details: string;
  IsActive: boolean;
  SetDate?: string;
}

export function useKeyInitiatives() {
  const [initiatives, setInitiatives] = useState<ApiKeyInitiative[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Fetch All Key Initiatives using Public API
  const fetchInitiatives = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get<ApiKeyInitiative[]>("/Public/GetAllKeyInitiatives");
      const list = Array.isArray(data) ? data : [];
      setInitiatives(list);
      return list;
    } catch (err: any) {
      const msg = err.message || "Failed to load key initiatives.";
      setError(msg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Fetch Single Key Initiative by ID
  const fetchInitiativeById = useCallback(async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get<ApiKeyInitiative | ApiKeyInitiative[]>(
        `/Public/GetKeyInitiativesById?initiativeId=${encodeURIComponent(id)}`
      );
      const item = Array.isArray(res) ? res[0] : res;
      return item || null;
    } catch (err: any) {
      const msg = err.message || "Failed to fetch initiative details.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Save or Update Key Initiative (Admin)
  const saveOrUpdateInitiative = async (payload: ApiKeyInitiative) => {
    setSubmitting(true);
    setError("");
    try {
      await api.post("/KeyInitiatives/SaveUpdateKeyInitiatives", {
        ...payload,
        SetDate: payload.SetDate || new Date().toISOString(),
      });

      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Key initiative saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg = err.message || "Failed to save key initiative.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Save Failed", text: msg });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Delete Key Initiative (Admin)
  const deleteInitiative = async (item: ApiKeyInitiative) => {
    const initiativeId = item.InitiativeID || "";

    if (!initiativeId) {
      Swal.fire({ icon: "error", title: "Error", text: "Invalid Initiative ID." });
      return false;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete initiative "${item.Title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f86048",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.post(
          `/KeyInitiatives/DeleteKeyInitiatives?initiativeId=${encodeURIComponent(
            initiativeId
          )}`,
          {}
        );
        Swal.fire({
          title: "Deleted!",
          text: "Key initiative has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        await fetchInitiatives();
        return true;
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.message || "Could not delete key initiative.",
        });
        return false;
      }
    }
    return false;
  };

  return {
    initiatives,
    loading,
    submitting,
    error,
    fetchInitiatives,
    fetchInitiativeById,
    saveOrUpdateInitiative,
    deleteInitiative,
  };
}