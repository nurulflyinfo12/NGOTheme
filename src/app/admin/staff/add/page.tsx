"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, Plus, User, Briefcase, Mail, BadgeCheck } from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";
import { TextField } from "@/components/Admin/TextField";
import { useStaff, ApiStaff } from "@/hooks/useStaff";

export interface StaffFormData {
  staffId?: string;
  type: string;
  name: string;
  photo: string;
  position: string;
  email: string;
  isActive: boolean;
}

export default function AddEditStaffPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const isEditMode = Boolean(idParam);

  const { submitting, fetchStaffById, saveOrUpdateStaff } = useStaff();

  const [formData, setFormData] = useState<StaffFormData>({
    type: "",
    name: "",
    photo: "",
    position: "",
    email: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof StaffFormData, string>>
  >({});

  useEffect(() => {
    if (isEditMode && idParam) {
      const rawData = localStorage.getItem("tempStaffData");
      if (rawData) {
        try {
          const item = JSON.parse(rawData);
          setFormData({
            staffId: String(item.StaffID || item.ID || idParam),
            name: item.Name || "",
            type: item.Type || "",
            position: item.Position || "",
            email: item.Email || "",
            photo: item.Photo || "",
            isActive: item.IsActive ?? true,
          });
        } catch (e) {
          console.error("Error parsing staff data:", e);
        }
      } else {
        fetchStaffById(idParam).then((item) => {
          if (item) {
            setFormData({
              staffId: String(item.StaffID || item.ID || idParam),
              name: item.Name || "",
              type: item.Type || "",
              position: item.Position || "",
              email: item.Email || "",
              photo: item.Photo || "",
              isActive: item.IsActive ?? true,
            });
          }
        });
      }
    }
  }, [isEditMode, idParam, fetchStaffById]);

  // Clear Handler
  const handleClear = () => {
    setFormData({
      staffId: isEditMode ? formData.staffId : undefined,
      type: "",
      name: "",
      photo: "",
      position: "",
      email: "",
      isActive: true,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof StaffFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof StaffFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const staffIdValue = formData.staffId || idParam || undefined;

    const payload: Partial<ApiStaff> = {
      ...(staffIdValue ? { StaffID: staffIdValue } : {}),
      Type: formData.type,
      Name: formData.name,
      Photo: formData.photo || "nai",
      Position: formData.position,
      Email: formData.email,
      IsActive: formData.isActive,
      SetDate: new Date().toISOString(),
    };

    const success = await saveOrUpdateStaff(payload);

    if (success) {
      localStorage.removeItem("tempStaffData");
      router.push("/admin/staff");
    }
  };

  return (
    <FormCard
      title={isEditMode ? "Edit Staff" : "Add Staff"}
      description="Add details of staff member"
      onBack={() => {
        localStorage.removeItem("tempStaffData");
        router.push("/admin/staff");
      }}
      backButtonLabel="Back to List"
      onClear={handleClear} // Added onClear prop here!
      clearButtonLabel="Clear"
      submitLabel={
        submitting
          ? "Submitting..."
          : isEditMode
          ? "Save Changes"
          : "Create Staff"
      }
      submitIcon={
        isEditMode ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />
      }
      onSubmit={handleSubmit}
    >
      <TextField
        label="Name"
        icon={User}
        placeholder="e.g. Nurul"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        required
      />

      <TextField
        label="Staff Type"
        icon={BadgeCheck}
        placeholder="e.g. Permanent, Part-Time"
        value={formData.type}
        onChange={(e) => handleChange("type", e.target.value)}
        error={errors.type}
        required
      />

      <TextField
        label="Position"
        icon={Briefcase}
        placeholder="e.g. Engineer"
        value={formData.position}
        onChange={(e) => handleChange("position", e.target.value)}
        error={errors.position}
        required
      />

      <TextField
        label="Email"
        icon={Mail}
        type="email"
        placeholder="example@gmail.com"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
      />

      <div className="space-y-1.5 sm:col-span-2">
        <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
          Photo
        </label>
        <ImageUpload
          initialImages={formData.photo ? [{ image: formData.photo }] : []}
          onImagesChange={(imgs) =>
            handleChange("photo", imgs[0]?.image || "")
          }
          allowMultiple={false}
          showCaption={false}
        />
      </div>
    </FormCard>
  );
}