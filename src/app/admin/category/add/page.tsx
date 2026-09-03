"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, PlusCircle, Tag, FileText } from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import StatusSelect from "@/components/Admin/StatusSelect";
import ImageUpload from "@/components/Admin/ImageUpload";
import { TextField } from "@/components/Admin/TextField";
import { useCategories, ApiCategory } from "@/hooks/useCategories";

export interface CategoryFormData {
  categoryId?: string;
  categoryCode?: string;
  name: string;
  nameNative?: string;
  slug?: string;
  description: string;
  bannerImage: string;
  isActive: boolean;
}

export default function AddEditCategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryIdParam = searchParams.get("id");
  const isEditMode = Boolean(categoryIdParam);

  const { submitting, saveCategory } = useCategories();

  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    bannerImage: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CategoryFormData, string>>
  >({});

  useEffect(() => {
    if (isEditMode) {
      const raw = localStorage.getItem("tempCategoryData");
      if (raw) {
        try {
          const cat = JSON.parse(raw);
          setFormData({
            categoryId: cat.CategoryID || categoryIdParam,
            categoryCode: cat.CategoryCode || "",
            name: cat.CategoryName || cat.name || "",
            nameNative: cat.CategoryNameNative || "",
            slug: cat.CategorySlug || "",
            description: cat.Description || cat.description || "",
            bannerImage: cat.BannerImage || "",
            isActive: cat.IsActive ?? (cat.status === "Active"),
          });
        } catch (err) {
          console.error("Error parsing category data:", err);
        }
      }
    }
  }, [isEditMode, categoryIdParam]);

  const validate = () => {
    const newErrors: Partial<Record<keyof CategoryFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Category name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof CategoryFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    const payload: ApiCategory = {
      CompanyID: currentUser?.CompanyID || "",
      CategoryID: formData.categoryId || (isEditMode ? categoryIdParam! : ""),
      CategoryCode: formData.categoryCode || "",
      CategoryName: formData.name,
      CategoryNameNative: formData.nameNative || "",
      CategorySlug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      Description: formData.description,
      BannerImage: formData.bannerImage,
      IsActive: formData.isActive,
      CategoryViewType: 0,
      IsOpinion: false,
      Priority: 0,
      UserId: currentUser?.UserId || "",
      isNavView: true,
      isVideo: false,
      isPhotos: false,
      isHomeView: true,
      SectionLevel: "1",
      SetDate: new Date().toISOString(),
    };

    const success = await saveCategory(payload);

    if (success) {
      localStorage.removeItem("tempCategoryData");
      router.push("/admin/category");
    }
  };

  const handleClear = () => {
    setFormData({
      categoryId: isEditMode ? formData.categoryId : undefined,
      categoryCode: formData.categoryCode,
      name: "",
      nameNative: "",
      slug: "",
      description: "",
      bannerImage: "",
      isActive: true,
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen">
      <FormCard
        title={isEditMode ? "Edit Category" : "Add New Category"}
        description={
          isEditMode ? "Update category details." : "Create a new category."
        }
        onBack={() => {
          localStorage.removeItem("tempCategoryData");
          router.push("/admin/category");
        }}
        backButtonLabel="Back to List"
        onClear={handleClear}
        clearButtonLabel="Clear"
        submitLabel={
          submitting
            ? "Submitting..."
            : isEditMode
            ? "Save Changes"
            : "Create Category"
        }
        submitIcon={
          isEditMode ? (
            <Save className="h-4 w-4" />
          ) : (
            <PlusCircle className="h-4 w-4" />
          )
        }
        onSubmit={handleSubmit}
      >
        <TextField
          label="Category Name"
          icon={Tag}
          placeholder="e.g. Technology"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={errors.name}
          required
        />

        <div className="space-y-[#f86048]">
          <StatusSelect
            label="Status"
            required
            value={formData.isActive ? "Active" : "Inactive"}
            onChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                isActive: val === "Active",
              }))
            }
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
            Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full py-3 px-4 text-sm sm:text-base border-2 border-slate-200/80 rounded-2xl text-slate-800 placeholder-slate-400 outline-none bg-white/70 focus:bg-white focus:border-[#f86048] transition-all shadow-sm"
            placeholder="Category description..."
          />
        </div>

       
      </FormCard>
    </div>
  );
}