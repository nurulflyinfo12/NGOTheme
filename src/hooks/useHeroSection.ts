"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiHeroSection {
  HeroSectionID?: string;
  HeroTitle: string;
  HeroDetails?: string;
  Quote?: string;
  SetDate?: string;
  ImageUrls: string[];
}

// Utility: Recursively unpacks multi-layer JSON strings and array structures
export const parseImageUrls = (imageUrls?: any): string[] => {
  if (!imageUrls) return [];
  const parsedUrls: string[] = [];

  const extractString = (val: any) => {
    if (val === null || val === undefined) return;

    if (Array.isArray(val)) {
      val.forEach(extractString);
      return;
    }

    if (typeof val === "string") {
      const trimmed = val.trim();
      // Check if stringified JSON array or string
      if (
        (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
        (trimmed.startsWith('"') && trimmed.endsWith('"'))
      ) {
        try {
          const parsed = JSON.parse(trimmed);
          extractString(parsed);
          return;
        } catch {
          // If JSON parse fails, process as raw string below
        }
      }

      // Clean up escaped backslashes and surrounding double quotes
      const cleanUrl = trimmed.replace(/^["']|["']$/g, "").replace(/\\/g, "");
      if (cleanUrl.startsWith("http") || cleanUrl.startsWith("/")) {
        parsedUrls.push(cleanUrl);
      }
    }
  };

  extractString(imageUrls);

  return parsedUrls.map((url) => {
    if (url.startsWith("http")) return url;
    return api.getFileUrl(url);
  });
};

export function useHeroSection() {
  const [heroSections, setHeroSections] = useState<ApiHeroSection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Fetch Hero Section: GET /api/Public/GetHeroSection
  const fetchHeroSections = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get<ApiHeroSection[] | ApiHeroSection>(
        "/Public/GetHeroSection"
      );
      const list = Array.isArray(data) ? data : data ? [data] : [];
      setHeroSections(list);
      return list;
    } catch (err: any) {
      const msg = err.message || "Failed to load hero banner.";
      setError(msg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Save or Update Hero Section: POST /api/HeroSectionSetup/CreateUpdateHeroSection
  const saveOrUpdateHeroSection = async (payload: ApiHeroSection) => {
    setSubmitting(true);
    setError("");
    try {
      const res: any = await api.post(
        "/HeroSectionSetup/CreateUpdateHeroSection",
        {
          ...payload,
          SetDate: payload.SetDate || new Date().toISOString(),
        }
      );

      if (
        res?.MessageType === 3 ||
        (res?.MessageType && res.MessageType !== 1)
      ) {
        const msg = res?.CurrentMessage || "Failed to save hero banner.";
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
        title: "Saved!",
        text: res?.CurrentMessage || "Hero banner saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg =
        err?.response?.data?.CurrentMessage ||
        err?.message ||
        "Failed to save hero banner.";
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

  // 3. Delete Hero Section
  const deleteHeroSection = async (banner: ApiHeroSection) => {
    const bannerId = banner.HeroSectionID || "";

    if (!bannerId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid Hero Banner ID.",
      });
      return false;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete hero banner "${banner.HeroTitle}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e86958",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.post(
          `/HeroSectionSetup/DeleteHeroSection?heroSectionId=${encodeURIComponent(
            bannerId
          )}`,
          {}
        );
        Swal.fire({
          title: "Deleted!",
          text: "Hero banner has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        await fetchHeroSections();
        return true;
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.message || "Could not delete hero banner.",
        });
        return false;
      }
    }
    return false;
  };

  return {
    heroSections,
    loading,
    submitting,
    error,
    fetchHeroSections,
    saveOrUpdateHeroSection,
    deleteHeroSection,
  };
}