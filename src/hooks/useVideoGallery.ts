"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiVideoGallery {
  CompanyID?: string;
  VideoID?: string;
  VideoHeadline: string;
  VideoLink: string;
  Status: boolean;
  PublishedTime?: string;
  VideoImage?: string;
  isStory?: boolean;
  CategoryID?: string;
}

export function useVideoGallery() {
  const [videos, setVideos] = useState<ApiVideoGallery[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Fetch Videos: GET /api/News/GetVideoGallery
  const fetchVideos = useCallback(async (videoID?: string) => {
    setLoading(true);
    setError("");
    try {
      const url = videoID
        ? `/News/GetVideoGallery?videoID=${encodeURIComponent(videoID)}`
        : "/News/GetVideoGallery";

      const data = await api.get<ApiVideoGallery[] | ApiVideoGallery>(url);
      const list = Array.isArray(data) ? data : data ? [data] : [];
      setVideos(list);
      return list;
    } catch (err: any) {
      const msg = err.message || "Failed to load video gallery.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Error", text: msg });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Fetch Single Video by ID
  const fetchVideoById = useCallback(
    async (id: string) => {
      const list = await fetchVideos(id);
      return list[0] || null;
    },
    [fetchVideos]
  );

  // 3. Save or Update Video Gallery Item (Single Endpoint: POST /api/News/CreateVideoGallery)
  const saveOrUpdateVideo = async (payload: ApiVideoGallery) => {
    setSubmitting(true);
    setError("");
    try {
      const isEdit = Boolean(payload.VideoID);
      const res: any = await api.post("/News/CreateVideoGallery", payload);

      if (res?.MessageType === 3 || (res?.MessageType && res.MessageType !== 1)) {
        const msg = res?.CurrentMessage || "Failed to save video item.";
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
        text: res?.CurrentMessage || "Video gallery saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg =
        err?.response?.data?.CurrentMessage ||
        err?.message ||
        "Failed to save video item.";
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
    videos,
    loading,
    submitting,
    error,
    fetchVideos,
    fetchVideoById,
    saveOrUpdateVideo,
  };
}