"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, Plus, BookOpen, Tag, Heading } from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import StatusSelect from "@/components/Admin/StatusSelect";
import ImageUpload from "@/components/Admin/ImageUpload";
import { TextField } from "@/components/Admin/TextField";
import { DropdownSelect } from "@/components/Admin/DropdownSelect";
import { usePublication, ApiPublication } from "@/hooks/usePublication";

export interface PublicationFormData {
  publicationId?: string;
  title: string;
  subtitle: string;
  category: string;
  fileUpload: string;
  isActive: boolean;
}

const PUBLICATION_CATEGORIES = [
  "Annual Reports",
  "Brochures & Leaflets",
  "Newsletters",
  "Others",
];

export default function AddEditPublicationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const isEditMode = Boolean(idParam);

  const { submitting, fetchPublicationById, saveOrUpdatePublication } =
    usePublication();

  const [formData, setFormData] = useState<PublicationFormData>({
    title: "",
    subtitle: "",
    category: "",
    fileUpload: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PublicationFormData, string>>
  >({});

  useEffect(() => {
    if (isEditMode && idParam) {
      const rawData = localStorage.getItem("tempPublicationData");
      if (rawData) {
        try {
          const item = JSON.parse(rawData);
          setFormData({
            publicationId: String(item.PublicationID || idParam),
            title: item.Title || "",
            subtitle: item.Subtitle || "",
            category: item.Category || "",
            fileUpload: item.FileUpload || "",
            isActive: item.IsActive ?? true,
          });
        } catch (e) {
          console.error("Error parsing publication data:", e);
        }
      } else {
        fetchPublicationById(idParam).then((item) => {
          if (item) {
            setFormData({
              publicationId: String(item.PublicationID || idParam),
              title: item.Title || "",
              subtitle: item.Subtitle || "",
              category: item.Category || "",
              fileUpload: item.FileUpload || "",
              isActive: item.IsActive ?? true,
            });
          }
        });
      }
    }
  }, [isEditMode, idParam, fetchPublicationById]);

  const handleClear = () => {
    setFormData({
      publicationId: isEditMode ? formData.publicationId : undefined,
      title: "",
      subtitle: "",
      category: "",
      fileUpload: "",
      isActive: true,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof PublicationFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = "Title is Required.";
    if (!formData.category.trim())
      newErrors.category = "Category is Required.";
    if (!formData.fileUpload.trim())
      newErrors.fileUpload = "Publication file is Required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof PublicationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
    const pubIdValue = formData.publicationId || idParam || undefined;

    const payload: Partial<ApiPublication> = {
      ...(pubIdValue ? { PublicationID: pubIdValue } : {}),
      CompanyID: currentUser?.CompanyID || "",
      Title: formData.title,
      Subtitle: formData.subtitle,
      Category: formData.category,
      FileUpload: formData.fileUpload,
      IsActive: formData.isActive,
      SetDate: new Date().toISOString(),
    };

    const success = await saveOrUpdatePublication(payload);

    if (success) {
      localStorage.removeItem("tempPublicationData");
      router.push("/admin/publication");
    }
  };

  return (
    <div className="min-h-screen">
      <FormCard
        title={isEditMode ? "Edit Publication" : "Add New Publication"}
        description={
          isEditMode
            ? "Update publication details below."
            : "Fill in details to upload a new document or publication."
        }
        onBack={() => {
          localStorage.removeItem("tempPublicationData");
          router.push("/admin/publication");
        }}
        backButtonLabel="Back to List"
        onClear={handleClear}
        clearButtonLabel="Clear"
        submitLabel={
          submitting
            ? "Submitting..."
            : isEditMode
              ? "Save Changes"
              : "Create Publication"
        }
        submitIcon={
          isEditMode ? (
            <Save className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )
        }
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <TextField
          label="Title*"
          icon={BookOpen}
          placeholder="e.g. Annual Report 2025"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={errors.title}
        />

        {/* Subtitle */}
        <TextField
          label="Subtitle"
          icon={Heading}
          placeholder="e.g. Financial & Operational Summary"
          value={formData.subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
          error={errors.subtitle}
        />

        {/* Category Dropdown */}
        <DropdownSelect
          label="Category*"
          icon={Tag}
          placeholder="Select a category"
          options={PUBLICATION_CATEGORIES}
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          error={errors.category}
        />

        {/* Status Select */}
        <div className="space-y-2">
          <StatusSelect
            label="Status"
            value={formData.isActive ? "Active" : "Inactive"}
            onChange={(val) => handleChange("isActive", val === "Active")}
          />
        </div>

        {/* PDF / File Upload Component */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1 flex items-center justify-between">
            <span>
              Publication File (PDF or Image){" "}
              <span className="text-red-500">*</span>
            </span>
          </label>
          <ImageUpload
            label="Drag & drop PDF document or file"
            allowedTypes="all"
            allowMultiple={false}
            showCaption={false}
            initialImages={
              formData.fileUpload ? [{ image: formData.fileUpload }] : []
            }
            onImagesChange={(files) =>
              handleChange("fileUpload", files[0]?.image || "")
            }
          />
          {errors.fileUpload && (
            <p className="text-xs text-red-600 mt-1 px-1">
              {errors.fileUpload}
            </p>
          )}
        </div>
      </FormCard>
    </div>
  );
}