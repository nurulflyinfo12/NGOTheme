"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus, Save, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";
import StatusSelect from "@/components/Admin/StatusSelect";

export interface HeroBannerFormData {
  title: string;
  subtitle: string;
  link: string;
  image: string;
  status: "Active" | "Inactive";
}

export default function AddEditHeroBannerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bannerId = searchParams.get("id");
  const isEditMode = Boolean(bannerId);

  const [formData, setFormData] = useState<HeroBannerFormData>({
    title: "",
    subtitle: "",
    link: "",
    image: "",
    status: "Active",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof HeroBannerFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  // Load dummy data for edit mode
  useEffect(() => {
    if (isEditMode) {
      const rawData = localStorage.getItem("tempHeroBannerData");
      if (rawData) {
        try {
          const banner = JSON.parse(rawData);
          setFormData({
            title: banner.title || "",
            subtitle: banner.subtitle || "",
            link: banner.link || "",
            image: banner.image || "",
            status: banner.status === "Active" ? "Active" : "Inactive",
          });
        } catch (err) {
          console.error("Error parsing banner data:", err);
        }
      }
    }
  }, [isEditMode, bannerId]);

  const validate = () => {
    const newErrors: Partial<Record<keyof HeroBannerFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.image.trim()) newErrors.image = "Banner image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: keyof HeroBannerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      console.log("Payload:", formData);

      localStorage.removeItem("tempHeroBannerData");

      Swal.fire({
        icon: "success",
        title: isEditMode ? "Updated!" : "Created!",
        text: `Hero Banner ${isEditMode ? "updated" : "created"} successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/admin/herobanner");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      title: "",
      subtitle: "",
      link: "",
      image: "",
      status: "Active",
    });
    setErrors({});
  };

  const inputClass = (field: keyof HeroBannerFormData) => `
    w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all text-black
    ${
      errors[field]
        ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
        : "border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
    }
  `;

  return (
    <div className="min-h-screen">
      <FormCard
        title={isEditMode ? "Edit Hero Banner" : "Add New Hero Banner"}
        description={
          isEditMode
            ? "Update the hero banner details below."
            : "Fill in the details to create a new hero banner."
        }
        onBack={() => {
          localStorage.removeItem("tempHeroBannerData");
          router.push("/admin/herobanner");
        }}
        backButtonLabel="Back to List"
        onClear={handleClear}
        clearButtonLabel="Clear"
        submitLabel={submitting ? "Submitting..." : isEditMode ? "Save Changes" : "Create Banner"}
        submitIcon={isEditMode ? <Save className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={inputClass("title")}
          />
          {errors.title && (
            <p className="text-xs text-red-600 flex items-center gap-1 ml-1">
              <AlertCircle size={12} /> {errors.title}
            </p>
          )}
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Subtitle</label>
          <input
            value={formData.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            className={inputClass("subtitle")}
          />
        </div>

        {/* Link */}
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Link</label>
          <input
            value={formData.link}
            onChange={(e) => handleChange("link", e.target.value)}
            placeholder="/some-page"
            className={inputClass("link")}
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <StatusSelect
            label="Status"
            required
            value={formData.status}
            onChange={(val) => setFormData((prev) => ({ ...prev, status: val }))}
            error={errors.status}
          />
        </div>

        {/* Image */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold ml-1">
            Banner Image <span className="text-red-500">*</span>
          </label>
          <ImageUpload
            initialImages={formData.image ? [{ image: formData.image }] : []}
            onImagesChange={(imgs) =>
              setFormData((prev) => ({ ...prev, image: imgs[0]?.image || "" }))
            }
            allowMultiple={false}
            showCaption={false}
          />
          {errors.image && (
            <p className="text-xs text-red-600 flex items-center gap-1 ml-1">
              <AlertCircle size={12} /> {errors.image}
            </p>
          )}
        </div>
      </FormCard>
    </div>
  );
}