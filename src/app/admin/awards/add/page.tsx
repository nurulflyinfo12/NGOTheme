"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, Plus, AlertCircle, Award as AwardIcon } from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";
import QuillEditor from "@/components/Admin/QuillEditor";
import { TextField } from "@/components/Admin/TextField";
import { useAward, ApiAward } from "@/hooks/useAward";

export interface AwardFormData {
  awardId?: string;
  companyId?: string;
  title: string;
  photo: string;
  details: string;
  isActive: boolean;
}

export default function AddEditAwardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const isEditMode = Boolean(idParam);

  const { submitting, fetchAwardById, saveOrUpdateAward } = useAward();

  const [formData, setFormData] = useState<AwardFormData>({
    title: "",
    photo: "",
    details: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof AwardFormData, string>>
  >({});

  useEffect(() => {
    if (isEditMode && idParam) {
      const rawData = localStorage.getItem("tempAwardData");
      if (rawData) {
        try {
          const item = JSON.parse(rawData);
          setFormData({
            awardId: item.AwardID || idParam,
            companyId: item.CompanyID || "",
            title: item.Title || "",
            photo: item.Photo || "",
            details: item.Details || "",
            isActive: item.IsActive ?? true,
          });
        } catch (e) {
          console.error("Error parsing award data:", e);
        }
      } else {
        fetchAwardById(idParam).then((item) => {
          if (item) {
            setFormData({
              awardId: item.AwardID || idParam,
              companyId: item.CompanyID || "",
              title: item.Title || "",
              photo: item.Photo || "",
              details: item.Details || "",
              isActive: item.IsActive ?? true,
            });
          }
        });
      }
    }
  }, [isEditMode, idParam, fetchAwardById]);

  const handleClear = () => {
    setFormData({
      awardId: isEditMode ? formData.awardId : undefined,
      companyId: formData.companyId,
      title: "",
      photo: "",
      details: "",
      isActive: true,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof AwardFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = "Title is Required. ";
    if (!formData.photo.trim()) newErrors.photo = "Photo is Required. ";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof AwardFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    // Resolve IDs defaulting to "0" to prevent nvarchar to int SQL conversion errors
    const awardIdValue = formData.awardId || idParam || "0";
    const companyIdValue = currentUser?.CompanyID || formData.companyId || "0";

    const payload: ApiAward = {
      AwardID: awardIdValue,
      CompanyID: companyIdValue,
      Title: formData.title,
      Photo: formData.photo,
      Details: formData.details,
      IsActive: formData.isActive,
      SetDate: new Date().toISOString(),
    };

    const success = await saveOrUpdateAward(payload);

    if (success) {
      localStorage.removeItem("tempAwardData");
      router.push("/admin/awards");
    }
  };

  return (
    <FormCard
      title={isEditMode ? "Edit Award" : "Add New Award"}
      description="Add details of awarded honor."
      onBack={() => {
        localStorage.removeItem("tempAwardData");
        router.push("/admin/awards");
      }}
      backButtonLabel="Back to List"
      onClear={handleClear}
      clearButtonLabel="Clear"
      submitLabel={
        submitting
          ? "Submitting..."
          : isEditMode
            ? "Save Changes"
            : "Create Award"
      }
      submitIcon={
        isEditMode ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />
      }
      onSubmit={handleSubmit}
    >
      <div className="sm:col-span-2">
        <TextField
          label="Title*"
          icon={AwardIcon}
          placeholder="e.g. Best NGO Award 2025"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={errors.title}
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
          Details
        </label>
        <QuillEditor
          value={formData.details}
          onChange={(val) => handleChange("details", val)}
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
          Photo <span className="text-red-500">*</span>
        </label>
        <ImageUpload
          label="Drag & Drop Award Photo"
          allowedTypes="image"
          allowMultiple={false}
          showCaption={false}
          initialImages={formData.photo ? [{ image: formData.photo }] : []}
          onImagesChange={(files) =>
            handleChange("photo", files[0]?.image || "")
          }
        />
        {errors.photo && (
          <p className="text-xs text-red-600 flex items-center gap-1 ml-1 mt-1">
            <AlertCircle size={12} /> {errors.photo}
          </p>
        )}
      </div>
    </FormCard>
  );
}
