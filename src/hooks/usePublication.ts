"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiPublication {
  PublicationID?: string;
  CompanyID?: string;
  Title: string;
  Subtitle?: string;
  Category: string;
  FileUpload: string;
  IsActive: boolean;
  SetDate?: string;
}

export function usePublication() {
  const [publications, setPublications] = useState<ApiPublication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Fetch all publications: GET /api/Publication/GetAllPublication
  const fetchPublications = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get<ApiPublication[]>("/Publication/GetAllPublication");
      const list = Array.isArray(data) ? data : [];
      setPublications(list);
      return list;
    } catch (err: any) {
      const msg = err.message || "Failed to load publications.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Error", text: msg });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Fetch single publication: GET /api/Publication/GetPublicationById?publicationId={id}
  const fetchPublicationById = useCallback(async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get<ApiPublication | ApiPublication[]>(
        `/Publication/GetPublicationById?publicationId=${encodeURIComponent(id)}`
      );
      const pub = Array.isArray(res) ? res[0] : res;
      return pub || null;
    } catch (err: any) {
      const msg = err.message || "Failed to fetch publication details.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Save or Update publication: POST /api/Publication/SaveUpdatePublication
  const saveOrUpdatePublication = async (payload: Partial<ApiPublication>) => {
    setSubmitting(true);
    setError("");
    try {
      await api.post("/Publication/SaveUpdatePublication", {
        ...payload,
        SetDate: payload.SetDate || new Date().toISOString(),
      });

      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Publication saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg = err.message || "Failed to save publication.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Save Failed", text: msg });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Delete publication: POST /api/Publication/DeletePublication?publicationId={id}
  const deletePublication = async (pub: ApiPublication) => {
    const pubId = pub.PublicationID || "";
    if (!pubId) {
      Swal.fire({ icon: "error", title: "Error", text: "Invalid Publication ID." });
      return false;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete "${pub.Title}"? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f86048",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      try {
        await api.post(
          `/Publication/DeletePublication?publicationId=${encodeURIComponent(pubId)}`,
          {}
        );
        Swal.fire({
          title: "Deleted!",
          text: "Publication has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        await fetchPublications();
        return true;
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.message || "Could not delete publication.",
        });
        return false;
      }
    }
    return false;
  };

  return {
    publications,
    loading,
    submitting,
    error,
    fetchPublications,
    fetchPublicationById,
    saveOrUpdatePublication,
    deletePublication,
  };
}