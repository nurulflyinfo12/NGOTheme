"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiCategory {
  CompanyID?: string;
  CategoryID?: string;
  CategoryCode?: string;
  CategoryName: string;
  CategoryViewType?: number;
  CategoryNameNative?: string;
  CategorySlug?: string;
  Description?: string;
  IsActive: boolean;
  IsOpinion?: boolean;
  Priority?: number;
  SetDate?: string;
  UserId?: string;
  isNavView?: boolean;
  isVideo?: boolean;
  isPhotos?: boolean;
  isHomeView?: boolean;
  SectionLevel?: string;
  BannerImage?: string;
  GalleryImages?: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Fetch All Categories: GET /api/Category/get-all-category
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.get<ApiCategory[]>("/Category/get-all-category");
      const list = Array.isArray(data) ? data : [];
      setCategories(list);
      return list;
    } catch (err: any) {
      const msg = err.message || "Failed to load categories.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Error", text: msg });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Create or Update Category: POST /api/Category/create-category
  const saveCategory = async (payload: ApiCategory) => {
    setSubmitting(true);
    setError("");
    try {
      await api.post("/Category/create-category", {
        ...payload,
        SetDate: payload.SetDate || new Date().toISOString(),
      });

      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Category record saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg = err.message || "Failed to save category.";
      setError(msg);
      Swal.fire({ icon: "error", title: "Save Failed", text: msg });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Delete Category: POST /api/Category/delete-category?companyId={companyId}&categoryId={categoryId}
  const deleteCategory = async (category: ApiCategory) => {
    const categoryId = category.CategoryID || "";
    const companyId = category.CompanyID || "";

    if (!categoryId) {
      Swal.fire({ icon: "error", title: "Error", text: "Invalid Category ID." });
      return false;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete category "${category.CategoryName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e86958",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.post(
          `/Category/delete-category?companyId=${encodeURIComponent(
            companyId
          )}&categoryId=${encodeURIComponent(categoryId)}`,
          {}
        );
        Swal.fire({
          title: "Deleted!",
          text: "Category removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        await fetchCategories();
        return true;
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.message || "Could not delete category.",
        });
        return false;
      }
    }
    return false;
  };

  return {
    categories,
    loading,
    submitting,
    error,
    fetchCategories,
    saveCategory,
    deleteCategory,
  };
}