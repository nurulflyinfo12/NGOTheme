"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, PlusCircle, Tag, Layers, FileText, Hash } from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import StatusSelect from "@/components/Admin/StatusSelect";
import { TextField } from "@/components/Admin/TextField";
import { DropdownSelect } from "@/components/Admin/DropdownSelect";

import { useSubCategory, ApiSubCategory } from "@/hooks/useSubCategory";
import { useCategories } from "@/hooks/useCategories";

export interface SubCategoryFormData {
  subCategoryId?: string;
  categoryId: string;
  subCategoryName: string;
  subCategoryNameNative?: string;
  subCategoryCode?: string;
  subCategorySlug?: string;
  description: string;
  priority: number;
  bannerImage?: string;
  isActive: boolean;
}

export default function AddEditSubCategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subCategoryIdParam = searchParams.get("id");
  const isEditMode = Boolean(subCategoryIdParam);

  const { submitting, fetchSubCategoryById, saveOrUpdateSubCategory } =
    useSubCategory();
  const { categories, fetchCategories } = useCategories();

  const [formData, setFormData] = useState<SubCategoryFormData>({
    categoryId: "",
    subCategoryName: "",
    subCategoryNameNative: "",
    subCategoryCode: "",
    subCategorySlug: "",
    description: "",
    priority: 0,
    bannerImage: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SubCategoryFormData, string>>
  >({});

  // Fetch Parent Categories for Dropdown
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Load Edit Data
  useEffect(() => {
    if (isEditMode) {
      const raw = localStorage.getItem("tempSubCategoryData");
      if (raw) {
        try {
          const item: ApiSubCategory = JSON.parse(raw);
          setFormData({
            subCategoryId: item.SubCategoryID || subCategoryIdParam || undefined,
            categoryId: item.CategoryID || "",
            subCategoryName: item.SubCategoryName || "",
            subCategoryNameNative: item.SubCategoryNameNative || "",
            subCategoryCode: item.SubCategoryCode || "",
            subCategorySlug: item.SubCategorySlug || "",
            description: item.Description || "",
            priority: item.Priority || 0,
            bannerImage: item.BannerImage || "",
            isActive: item.IsActive ?? true,
          });
        } catch (err) {
          console.error("Error parsing subcategory data:", err);
        }
      } else if (subCategoryIdParam) {
        fetchSubCategoryById(subCategoryIdParam).then((item) => {
          if (item) {
            setFormData({
              subCategoryId: item.SubCategoryID || subCategoryIdParam,
              categoryId: item.CategoryID || "",
              subCategoryName: item.SubCategoryName || "",
              subCategoryNameNative: item.SubCategoryNameNative || "",
              subCategoryCode: item.SubCategoryCode || "",
              subCategorySlug: item.SubCategorySlug || "",
              description: item.Description || "",
              priority: item.Priority || 0,
              bannerImage: item.BannerImage || "",
              isActive: item.IsActive ?? true,
            });
          }
        });
      }
    }
  }, [isEditMode, subCategoryIdParam, fetchSubCategoryById]);

  const validate = () => {
    const newErrors: Partial<Record<keyof SubCategoryFormData, string>> = {};

    if (!formData.categoryId)
      newErrors.categoryId = "Parent Category is Required.";
    if (!formData.subCategoryName.trim())
      newErrors.subCategoryName = "Subcategory Name is Required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof SubCategoryFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    const selectedCategory = categories.find(
      (c) => String(c.CategoryID) === String(formData.categoryId)
    );

    const payload: ApiSubCategory = {
      CompanyID: currentUser?.CompanyID || "",
      SubCategoryID:
        formData.subCategoryId || (isEditMode ? subCategoryIdParam! : ""),
      CategoryID: formData.categoryId,
      CategoryName: selectedCategory?.CategoryName || "",
      SubCategoryCode: formData.subCategoryCode || "",
      SubCategoryName: formData.subCategoryName,
      SubCategoryNameNative: formData.subCategoryNameNative || "",
      SubCategorySlug:
        formData.subCategorySlug ||
        formData.subCategoryName.toLowerCase().replace(/\s+/g, "-"),
      Description: formData.description,
      IsActive: formData.isActive,
      Priority: Number(formData.priority) || 0,
      UserId: currentUser?.UserId || "",
      BannerImage: formData.bannerImage || "",
      GalleryImages: "",
      SetDate: new Date().toISOString(),
    };

    const success = await saveOrUpdateSubCategory(payload);

    if (success) {
      localStorage.removeItem("tempSubCategoryData");
      router.push("/admin/subcategory");
    }
  };

  const handleClear = () => {
    setFormData({
      subCategoryId: isEditMode ? formData.subCategoryId : undefined,
      categoryId: "",
      subCategoryName: "",
      subCategoryNameNative: "",
      subCategoryCode: "",
      subCategorySlug: "",
      description: "",
      priority: 0,
      bannerImage: "",
      isActive: true,
    });
    setErrors({});
  };

  const categoryOptions = categories.map((cat) => ({
    label: cat.CategoryName,
    value: String(cat.CategoryID),
  }));

  return (
    <div className="min-h-screen">
      <FormCard
        title={isEditMode ? "Edit Subcategory" : "Add New Subcategory"}
        description={
          isEditMode
            ? "Update subcategory details."
            : "Create a new subcategory."
        }
        onBack={() => {
          localStorage.removeItem("tempSubCategoryData");
          router.push("/admin/subcategory");
        }}
        backButtonLabel="Back to List"
        onClear={handleClear}
        clearButtonLabel="Clear"
        submitLabel={
          submitting
            ? "Submitting..."
            : isEditMode
              ? "Save Changes"
              : "Create Subcategory"
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
        {/* Parent Category Dropdown */}
        <DropdownSelect
          label="Parent Category*"
          icon={Layers}
          placeholder="Select Category"
          options={categoryOptions}
          value={formData.categoryId}
          onChange={(e) => handleChange("categoryId", e.target.value)}
          error={errors.categoryId}
        />

        {/* Subcategory Name */}
        <TextField
          label="Subcategory Name*"
          icon={Tag}
          placeholder="e.g. Smart Phones"
          value={formData.subCategoryName}
          onChange={(e) => handleChange("subCategoryName", e.target.value)}
          error={errors.subCategoryName}
        />

        {/* Status Select */}
        <div className="space-y-[#f86048]">
          <StatusSelect
            label="Status"
            value={formData.isActive ? "Active" : "Inactive"}
            onChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                isActive: val === "Active",
              }))
            }
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
            Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full py-3 px-4 text-sm sm:text-base border-2 border-slate-200/80 rounded-2xl text-slate-800 placeholder-slate-400 outline-none bg-white/70 focus:bg-white focus:border-[#f86048] transition-all shadow-sm"
            placeholder="Subcategory description..."
          />
        </div>
      </FormCard>
    </div>
  );
}