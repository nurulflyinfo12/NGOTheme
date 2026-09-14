"use client";

import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface ApiSubCategory {
  CompanyID?: string;
  SubCategoryID?: string;
  CategoryID: string;
  CategoryName?: string;
  SubCategoryCode?: string;
  SubCategoryName: string;
  SubCategoryNameNative?: string;
  SubCategorySlug?: string;
  Description?: string;
  IsActive: boolean;
  SetDate?: string;
  Priority?: number;
  UserId?: string;
  BannerImage?: string;
  GalleryImages?: string;
}

export function useSubCategory() {
  const [subCategories, setSubCategories] = useState<ApiSubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1. Get All SubCategories: GET /api/Category/get-all-subcategory
  const fetchSubCategories = useCallback(async (categoryId?: string) => {
    setLoading(true);
    setError("");
    try {
      const queryParam = categoryId ? `?categoryId=${encodeURIComponent(categoryId)}` : "";
      const data = await api.get<ApiSubCategory[]>(`/Category/get-all-subcategory${queryParam}`);
      const list = Array.isArray(data) ? data : [];
      setSubCategories(list);
      return list;
    } catch (err: any) {
      const msg = err.message || "Failed to fetch subcategories.";
      setError(msg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Get SubCategory By ID
  const fetchSubCategoryById = useCallback(async (subCategoryId: string) => {
    setLoading(true);
    setError("");
    try {
      const list = await fetchSubCategories();
      const item = list.find((s) => String(s.SubCategoryID) === String(subCategoryId));
      return item || null;
    } catch (err: any) {
      setError(err.message || "Failed to fetch subcategory details.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchSubCategories]);

  // 3. Create or Update SubCategory: POST /api/Category/create-sub-category
  const saveOrUpdateSubCategory = async (payload: ApiSubCategory) => {
    setSubmitting(true);
    setError("");
    try {
      const isEdit = Boolean(payload.SubCategoryID);
      const res: any = await api.post("/Category/create-sub-category", payload);

      if (res?.MessageType === 3 || (res?.MessageType && res.MessageType !== 1)) {
        const msg = res?.CurrentMessage || "Failed to save subcategory.";
        setError(msg);
        Swal.fire({
          icon: "error",
          title: "Save Failed",
          text: msg,
          confirmButtonColor: "#f86048",
        });
        return false;
      }

      Swal.fire({
        icon: "success",
        title: isEdit ? "Updated!" : "Saved!",
        text: res?.CurrentMessage || "Subcategory saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      return true;
    } catch (err: any) {
      const msg =
        err?.response?.data?.CurrentMessage ||
        err?.message ||
        "Failed to save subcategory.";
      setError(msg);
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: msg,
        confirmButtonColor: "#f86048",
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Delete SubCategory: POST /api/Category/delete-subcategory?subCategoryId={id}
  const deleteSubCategory = async (item: ApiSubCategory) => {
    const subCatId = item.SubCategoryID;
    if (!subCatId) {
      Swal.fire({ icon: "error", title: "Error", text: "Invalid Subcategory ID." });
      return false;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete "${item.SubCategoryName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f86048",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.post(`/Category/delete-subcategory?subCategoryId=${encodeURIComponent(subCatId)}`, {});
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Subcategory has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
        await fetchSubCategories();
        return true;
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.message || "Could not delete subcategory.",
        });
        return false;
      }
    }
    return false;
  };

  return {
    subCategories,
    loading,
    submitting,
    error,
    fetchSubCategories,
    fetchSubCategoryById,
    saveOrUpdateSubCategory,
    deleteSubCategory,
  };
}