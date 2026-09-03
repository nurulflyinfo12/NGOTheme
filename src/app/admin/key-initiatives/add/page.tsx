"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, Plus, AlertCircle, Layers } from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";
import QuillEditor from "@/components/Admin/QuillEditor";
import { TextField } from "@/components/Admin/TextField";
import { useKeyInitiatives, ApiKeyInitiative } from "@/hooks/useKeyInitiatives";

export interface KeyInitiativeFormData {
  initiativeId?: string;
  companyId?: string;
  title: string;
  photo: string;
  details: string;
  isActive: boolean;
}

export default function AddEditKeyInitiativePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const isEditMode = Boolean(idParam);

  const { submitting, fetchInitiativeById, saveOrUpdateInitiative } =
    useKeyInitiatives();

  const [formData, setFormData] = useState<KeyInitiativeFormData>({
    title: "",
    photo: "",
    details: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof KeyInitiativeFormData, string>>
  >({});

  useEffect(() => {
    if (isEditMode && idParam) {
      const rawData = localStorage.getItem("tempInitiativeData");
      if (rawData) {
        try {
          const item = JSON.parse(rawData);
          setFormData({
            initiativeId: item.InitiativeID || idParam,
            companyId: item.CompanyID || "",
            title: item.Title || "",
            photo: item.Photo || "",
            details: item.Details || "",
            isActive: item.IsActive ?? true,
          });
        } catch (e) {
          console.error("Error parsing initiative data:", e);
        }
      } else {
        fetchInitiativeById(idParam).then((item) => {
          if (item) {
            setFormData({
              initiativeId: item.InitiativeID || idParam,
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
  }, [isEditMode, idParam, fetchInitiativeById]);

  const handleClear = () => {
    setFormData({
      initiativeId: isEditMode ? formData.initiativeId : undefined,
      companyId: formData.companyId,
      title: "",
      photo: "",
      details: "",
      isActive: true,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof KeyInitiativeFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.photo.trim()) newErrors.photo = "Photo is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof KeyInitiativeFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    const initiativeIdValue = formData.initiativeId || idParam || undefined;

    const payload: ApiKeyInitiative = {
      ...(initiativeIdValue ? { InitiativeID: initiativeIdValue } : {}),
      CompanyID: formData.companyId || currentUser?.CompanyID || "",
      Title: formData.title,
      Photo: formData.photo,
      Details: formData.details,
      IsActive: formData.isActive,
      SetDate: new Date().toISOString(),
    };

    const success = await saveOrUpdateInitiative(payload);

    if (success) {
      localStorage.removeItem("tempInitiativeData");
      router.push("/admin/key-initiatives");
    }
  };

  return (
    <FormCard
      title={isEditMode ? "Edit Key Initiative" : "Add Key Initiative"}
      description="Fill in initiative details"
      onBack={() => {
        localStorage.removeItem("tempInitiativeData");
        router.push("/admin/key-initiatives");
      }}
      backButtonLabel="Back to List"
      onClear={handleClear}
      clearButtonLabel="Clear"
      submitLabel={
        submitting
          ? "Submitting..."
          : isEditMode
            ? "Save Changes"
            : "Create Initiative"
      }
      submitIcon={
        isEditMode ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />
      }
      onSubmit={handleSubmit}
    >
      <div className="sm:col-span-2">
        <TextField
          label="Title"
          icon={Layers}
          placeholder="e.g. Education for All"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={errors.title}
          required
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
          initialImages={formData.photo ? [{ image: formData.photo }] : []}
          onImagesChange={(files) =>
            handleChange("photo", files[0]?.image || "")
          }
          allowMultiple={false}
          showCaption={false}
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
