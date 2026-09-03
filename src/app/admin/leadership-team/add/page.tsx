"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, Plus, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";

export interface LeadershipFormData {
  id: string;
  name: string;
  photo: string;
  position: string;
}

export default function AddEditLeadershipPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<LeadershipFormData>({
    id: "",
    name: "",
    photo: "",
    position: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof LeadershipFormData, string>>
  >({});

  useEffect(() => {
    if (isEditMode) {
      const rawData = localStorage.getItem("tempLeadershipData");
      if (rawData) setFormData(JSON.parse(rawData));
    } else {
      setFormData((prev) => ({ ...prev, id: Date.now().toString() }));
    }
  }, [isEditMode]);

  const validate = () => {
    const newErrors: Partial<Record<keyof LeadershipFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.photo.trim()) newErrors.photo = "Photo is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    Swal.fire({
      icon: "success",
      title: "Saved!",
      timer: 1500,
      showConfirmButton: false,
    });
    localStorage.removeItem("tempLeadershipData");
    router.push("/admin/leadership-team");
  };

  const inputClass = (field: keyof LeadershipFormData) => `
    w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all text-black
    ${errors[field] ? "border-red-500 focus:ring-4 focus:ring-red-500/10" : "border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"}
  `;

  return (
    <FormCard
      title={isEditMode ? "Edit Leadership Member" : "Add Leadership Member"}
      description="Provide board member or executive info."
      onBack={() => {
        localStorage.removeItem("tempLeadershipData");
        router.push("/admin/leadership-team");
      }}
      backButtonLabel="Back to List"
      submitLabel={isEditMode ? "Save Changes" : "Add Member"}
      submitIcon={
        isEditMode ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />
      }
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label className="text-sm font-semibold ml-1">Name *</label>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClass("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-600 flex items-center gap-1 ml-1">
            <AlertCircle size={12} /> {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold ml-1">Position *</label>
        <input
          value={formData.position}
          onChange={(e) =>
            setFormData({ ...formData, position: e.target.value })
          }
          className={inputClass("position")}
        />
        {errors.position && (
          <p className="text-xs text-red-600 flex items-center gap-1 ml-1">
            <AlertCircle size={12} /> {errors.position}
          </p>
        )}
      </div>

      <div className="space-y-2 sm:col-span-2">
        <label className="text-sm font-semibold ml-1">Photo *</label>
        <ImageUpload
          initialImages={formData.photo ? [{ image: formData.photo }] : []}
          onImagesChange={(imgs) =>
            setFormData((prev) => ({ ...prev, photo: imgs[0]?.image || "" }))
          }
          allowMultiple={false}
          showCaption={false}
        />
        {errors.photo && (
          <p className="text-xs text-red-600 flex items-center gap-1 ml-1">
            <AlertCircle size={12} /> {errors.photo}
          </p>
        )}
      </div>
    </FormCard>
  );
}
