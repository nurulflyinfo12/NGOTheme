"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, UserPlus, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";
import StatusSelect from "@/components/Admin/StatusSelect";

interface VideoFormData {
  title: string;
  videoUrl: string;
  thumbnail: string;
  platform: "YouTube" | "Vimeo" | "Custom";
  status: "Active" | "Inactive";
}

export default function AddEditVideoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<VideoFormData>({
    title: "",
    videoUrl: "",
    thumbnail: "",
    platform: "YouTube",
    status: "Active",
  });

  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const raw = localStorage.getItem("tempVideoData");
      if (raw) {
        const data = JSON.parse(raw);
        setFormData(data);
      }
    }
  }, [isEditMode]);

  const validate = () => {
    const err: any = {};
    if (!formData.title) err.title = "Title required";
    if (!formData.videoUrl) err.videoUrl = "Video URL required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: isEditMode ? "Updated!" : "Created!",
        timer: 1500,
        showConfirmButton: false,
      });

      localStorage.removeItem("tempVideoData");
      router.push("/admin/videogallery");
    }, 800);
  };

  const inputClass = `
    w-full rounded-xl border px-4 py-2.5 text-sm outline-none text-black
    border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10
  `;

  return (
    <div className="min-h-screen">
      <FormCard
        title={isEditMode ? "Edit Video" : "Add Video"}
        description="Manage video content"
        onBack={() => router.push("/admin/videogallery")}
        backButtonLabel="Back"
        submitLabel={submitting ? "Saving..." : "Save"}
        submitIcon={isEditMode ? <Save size={16} /> : <UserPlus size={16} />}
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Title *</label>
          <input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={inputClass}
          />
          {errors.title && (
            <p className="text-xs text-red-500 flex gap-1">
              <AlertCircle size={12} /> {errors.title}
            </p>
          )}
        </div>

        {/* Video URL */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Video URL *</label>
          <input
            value={formData.videoUrl}
            onChange={(e) =>
              setFormData({ ...formData, videoUrl: e.target.value })
            }
            className={inputClass}
            placeholder="https://youtube.com/..."
          />
        </div>

        {/* Platform */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) =>
              setFormData({
                ...formData,
                platform: e.target.value as any,
              })
            }
            className={inputClass}
          >
            <option>YouTube</option>
            <option>Vimeo</option>
            <option>Custom</option>
          </select>
        </div>
        <div className="space-y-2">
          <StatusSelect
            label="Status"
            value={formData.status}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, status: val }))
            }
          />
        </div>

        {/* Thumbnail */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold">Thumbnail</label>
          <ImageUpload
            initialImages={
              formData.thumbnail ? [{ image: formData.thumbnail }] : []
            }
            onImagesChange={(imgs) =>
              setFormData({
                ...formData,
                thumbnail: imgs[0]?.image || "",
              })
            }
            allowMultiple={false}
          />
        </div>
      </FormCard>
    </div>
  );
}
