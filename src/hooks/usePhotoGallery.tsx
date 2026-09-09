"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface GalleryPhoto {
  PhotoUrl: string;
  Caption?: string;
}

export interface ApiPhotoGallery {
  CompanyID?: string;
  PhotoGalleryID?: string;
  GalleryTitle: string;
  Status: boolean;
  isStory?: boolean;
  CategoryID?: string;
  PublishedDate?: string;
  Photos: GalleryPhoto[];
}

export function usePhotoGallery() {
  const [galleries, setGalleries] = useState<ApiPhotoGallery[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Fetch Galleries: GET /api/News/GetPhotoGallery
  const fetchGalleries = useCallback(async (photoGalleryID?: string) => {
    setLoading(true);
    setError("");
    try {
      const url = photoGalleryID
        ? `/News/GetPhotoGallery?photoGalleryID=${encodeURIComponent(photoGalleryID)}`
        : "/News/GetPhotoGallery";

      const data = await api.get<ApiPhotoGallery[] | ApiPhotoGallery>(url);
      const list = Array.isArray(data) ? data : data ? [data] : [];
      setGalleries(list);
      return list;
    } catch (err: any) {
      const msg = err.message || "Failed to load photo galleries.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Error", text: msg });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Fetch Single Gallery by ID
  const fetchGalleryById = useCallback(
    async (id: string) => {
      const list = await fetchGalleries(id);
      return list[0] || null;
    },
    [fetchGalleries]
  );

  // 3. Save or Update Photo Gallery (Single POST Endpoint: /api/News/CreatePhotoGallery)
  const saveOrUpdateGallery = async (payload: ApiPhotoGallery) => {
    setSubmitting(true);
    setError("");
    try {
      const isEdit = Boolean(payload.PhotoGalleryID);
      const res: any = await api.post("/News/CreatePhotoGallery", payload);

      if (res?.MessageType === 3 || (res?.MessageType && res.MessageType !== 1)) {
        const msg = res?.CurrentMessage || "Failed to save photo gallery.";
        setError(msg);
        Swal.fire({
          icon: "error",
          title: "Save Failed",
          text: msg,
          confirmButtonColor: "#e86958",
        });
        return false;
      }

      Swal.fire({
        icon: "success",
        title: isEdit ? "Updated!" : "Saved!",
        text: res?.CurrentMessage || "Photo gallery saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg =
        err?.response?.data?.CurrentMessage ||
        err?.message ||
        "Failed to save photo gallery.";
      setError(msg);
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: msg,
        confirmButtonColor: "#e86958",
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    galleries,
    loading,
    submitting,
    error,
    fetchGalleries,
    fetchGalleryById,
    saveOrUpdateGallery,
  };
}