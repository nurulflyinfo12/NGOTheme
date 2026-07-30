"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus, Save, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";
import StatusSelect from "@/components/Admin/StatusSelect";

interface GalleryFormData {
  title: string;
  images: string[];
  status: "Active" | "Inactive";
}

export default function AddEditGalleryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const galleryId = searchParams.get("id");
  const isEditMode = Boolean(galleryId);

  const [formData, setFormData] = useState<GalleryFormData>({
    title: "",
    images: [],
    status: "Active",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof GalleryFormData, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const raw = localStorage.getItem("tempGalleryData");
      if (raw) {
        try {
          const data = JSON.parse(raw);
          setFormData({
            title: data.title || "",
            images: data.images || [],
            status: data.status === "Active" ? "Active" : "Inactive",
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
  }, [isEditMode, galleryId]);

  const validate = () => {
    const newErrors: Partial<Record<keyof GalleryFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one image required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      console.log("Gallery Payload:", formData);

      localStorage.removeItem("tempGalleryData");

      Swal.fire({
        icon: "success",
        title: isEditMode ? "Updated!" : "Created!",
        text: `Gallery ${isEditMode ? "updated" : "created"} successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/admin/photogallery");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      title: "",
      images: [],
      status: "Active",
    });
    setErrors({});
  };

  const inputClass = `
    w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all text-black
    border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10
  `;

  return (
    <div className="min-h-screen">
      <FormCard
        title={isEditMode ? "Edit Gallery" : "Add New Gallery"}
        description="Manage gallery images"
        onBack={() => {
          localStorage.removeItem("tempGalleryData");
          router.push("/admin/photogallery");
        }}
        backButtonLabel="Back to List"
        onClear={handleClear}
        clearButtonLabel="Clear"
        submitLabel={
          submitting
            ? "Submitting..."
            : isEditMode
              ? "Save Changes"
              : "Create Gallery"
        }
        submitIcon={
          isEditMode ? (
            <Save className="h-4 w-4" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )
        }
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">
            Gallery Title <span className="text-red-500">*</span>
          </label>
          <input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={inputClass}
          />
          {errors.title && (
            <p className="text-xs text-red-600 flex items-center gap-1 ml-1">
              <AlertCircle size={12} /> {errors.title}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <StatusSelect
            label="Status"
            required
            value={formData.status}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, status: val }))
            }
            error={errors.status}
          />
        </div>

        {/* Images Upload */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold ml-1">
            Gallery Images <span className="text-red-500">*</span>
          </label>

          <ImageUpload
            initialImages={formData.images.map((img) => ({ image: img }))}
            onImagesChange={(imgs) =>
              setFormData({
                ...formData,
                images: imgs.map((i) => i.image),
              })
            }
            allowMultiple={true}
            showCaption={false}
          />

          {errors.images && (
            <p className="text-xs text-red-600 flex items-center gap-1 ml-1">
              <AlertCircle size={12} /> {errors.images}
            </p>
          )}
        </div>

        {/* Status */}
      </FormCard>
    </div>
  );
}
