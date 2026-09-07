"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, Plus, AlertCircle, Briefcase, Layers, Type } from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";
import { TextField } from "@/components/Admin/TextField";
import { useCareer, ApiCareer } from "@/hooks/useCareer";

export interface CareerFormData {
  careerId?: string;
  companyId?: string;
  title: string;
  subtitle: string;
  category: string;
  fileUpload: string;
  isActive: boolean;
}

export default function AddEditCareerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const isEditMode = Boolean(idParam);

  const { submitting, fetchCareerById, saveOrUpdateCareer } = useCareer();

  const [formData, setFormData] = useState<CareerFormData>({
    title: "",
    subtitle: "",
    category: "",
    fileUpload: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CareerFormData, string>>
  >({});

  useEffect(() => {
    if (isEditMode && idParam) {
      const rawData = localStorage.getItem("tempCareerData");
      if (rawData) {
        try {
          const item = JSON.parse(rawData);
          setFormData({
            careerId: item.CareerID || idParam,
            companyId: item.CompanyID || "",
            title: item.Title || "",
            subtitle: item.Subtitle || "",
            category: item.Category || "",
            fileUpload: item.FileUpload || "",
            isActive: item.IsActive ?? true,
          });
        } catch (e) {
          console.error("Error parsing career data:", e);
        }
      } else {
        fetchCareerById(idParam).then((item) => {
          if (item) {
            setFormData({
              careerId: item.CareerID || idParam,
              companyId: item.CompanyID || "",
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
  }, [isEditMode, idParam, fetchCareerById]);

  const handleClear = () => {
    setFormData({
      careerId: isEditMode ? formData.careerId : undefined,
      companyId: formData.companyId,
      title: "",
      subtitle: "",
      category: "",
      fileUpload: "",
      isActive: true,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof CareerFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = "Job Title is Required. ";
    if (!formData.category.trim())
      newErrors.category = "Category is Required. ";
    if (!formData.fileUpload.trim())
      newErrors.fileUpload = "Circular file is Required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof CareerFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    const careerIdValue = formData.careerId || idParam || undefined;

    const payload: ApiCareer = {
      ...(careerIdValue ? { CareerID: careerIdValue } : {}),
      CompanyID: formData.companyId || currentUser?.CompanyID || "",
      Title: formData.title,
      Subtitle: formData.subtitle,
      Category: formData.category,
      FileUpload: formData.fileUpload,
      IsActive: formData.isActive,
      SetDate: new Date().toISOString(),
    };

    const success = await saveOrUpdateCareer(payload);

    if (success) {
      localStorage.removeItem("tempCareerData");
      router.push("/admin/careers");
    }
  };

  return (
    <FormCard
      title={isEditMode ? "Edit Career Opening" : "Add Career Opening"}
      description="Create job opportunities circular"
      onBack={() => {
        localStorage.removeItem("tempCareerData");
        router.push("/admin/careers");
      }}
      backButtonLabel="Back to List"
      onClear={handleClear}
      clearButtonLabel="Clear"
      submitLabel={
        submitting
          ? "Submitting..."
          : isEditMode
            ? "Save Changes"
            : "Create Career"
      }
      submitIcon={
        isEditMode ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />
      }
      onSubmit={handleSubmit}
    >
      <TextField
        label="Job Title*"
        icon={Briefcase}
        placeholder="e.g. Project Manager"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        error={errors.title}
      />

      <TextField
        label="Subtitle"
        icon={Type}
        placeholder="e.g. Full-Time Position"
        value={formData.subtitle}
        onChange={(e) => handleChange("subtitle", e.target.value)}
        error={errors.subtitle}
      />

      <div className="sm:col-span-2">
        <TextField
          label="Category*"
          icon={Layers}
          placeholder="e.g. Management, IT, Field Operations"
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          error={errors.category}
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
          Circular / Application File (PDF or Image){" "}
          <span className="text-red-500">*</span>
        </label>
        <ImageUpload
          label="Drag & Drop Circular PDF or Image"
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
          <p className="text-xs text-red-600 flex items-center gap-1 ml-1 mt-1">
            <AlertCircle size={12} /> {errors.fileUpload}
          </p>
        )}
      </div>
    </FormCard>
  );
}
