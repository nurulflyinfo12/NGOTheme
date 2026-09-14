"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Save,
  Plus,
  AlertCircle,
  Heading,
  Link as LinkIcon,
} from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";
import StatusSelect from "@/components/Admin/StatusSelect";
import { TextField } from "@/components/Admin/TextField";
import { useVideoGallery, ApiVideoGallery } from "@/hooks/useVideoGallery";

interface VideoFormData {
  videoId?: string;
  companyId?: string;
  categoryId?: string;
  headline: string;
  videoLink: string;
  thumbnail: string;
  status: "Active" | "Inactive";
  isStory: boolean;
  publishedTime?: string;
}

export default function AddEditVideoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditMode = Boolean(id);

  const { submitting, fetchVideoById, saveOrUpdateVideo } = useVideoGallery();

  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [formData, setFormData] = useState<VideoFormData>({
    headline: "",
    videoLink: "",
    thumbnail: "",
    status: "Active",
    isStory: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof VideoFormData, string>>
  >({});

  useEffect(() => {
    let isMounted = true;

    if (isEditMode && id) {
      const raw = localStorage.getItem("tempVideoData");
      if (raw) {
        try {
          const data: ApiVideoGallery = JSON.parse(raw);
          if (isMounted) {
            setFormData({
              videoId: data.VideoID || id,
              companyId: data.CompanyID || "0011",
              categoryId: data.CategoryID || "",
              headline: data.VideoHeadline || "",
              videoLink: data.VideoLink || "",
              thumbnail: data.VideoImage || "",
              status: data.Status ? "Active" : "Inactive",
              isStory: data.isStory ?? false,
              publishedTime: data.PublishedTime,
            });
            setInitialLoading(false);
          }
        } catch (err) {
          console.error("Error parsing video data:", err);
          if (isMounted) setInitialLoading(false);
        }
      } else {
        fetchVideoById(id).then((data) => {
          if (isMounted) {
            if (data) {
              setFormData({
                videoId: data.VideoID || id,
                companyId: data.CompanyID || "0011",
                categoryId: data.CategoryID || "",
                headline: data.VideoHeadline || "",
                videoLink: data.VideoLink || "",
                thumbnail: data.VideoImage || "",
                status: data.Status ? "Active" : "Inactive",
                isStory: data.isStory ?? false,
                publishedTime: data.PublishedTime,
              });
            }
            setInitialLoading(false);
          }
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [isEditMode, id, fetchVideoById]);

  const validate = () => {
    const newErrors: Partial<Record<keyof VideoFormData, string>> = {};
    if (!formData.headline.trim()) newErrors.headline = "Headline is required";
    if (!formData.videoLink.trim())
      newErrors.videoLink = "Video Link is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    const payload: ApiVideoGallery = {
      CompanyID: formData.companyId || currentUser?.CompanyID || "0011",
      ...(formData.videoId ? { VideoID: formData.videoId } : {}),
      VideoHeadline: formData.headline,
      VideoLink: formData.videoLink,
      VideoImage: formData.thumbnail,
      Status: formData.status === "Active",
      isStory: formData.isStory,
      CategoryID: formData.categoryId || "",
      PublishedTime: formData.publishedTime || new Date().toLocaleString(),
    };

    const success = await saveOrUpdateVideo(payload);

    if (success) {
      localStorage.removeItem("tempVideoData");
      router.push("/admin/videogallery");
    }
  };

  const handleClear = () => {
    setFormData({
      videoId: isEditMode ? formData.videoId : undefined,
      companyId: formData.companyId,
      categoryId: formData.categoryId,
      headline: "",
      videoLink: "",
      thumbnail: "",
      status: "Active",
      isStory: false,
    });
    setErrors({});
  };

  if (initialLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <span className="text-sm font-semibold text-slate-500 animate-pulse">
          Loading video details...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <FormCard
        title={isEditMode ? "Edit Video" : "Add New Video"}
        description="Manage video gallery details"
        onBack={() => {
          localStorage.removeItem("tempVideoData");
          router.push("/admin/videogallery");
        }}
        backButtonLabel="Back to List"
        onClear={handleClear}
        clearButtonLabel="Clear"
        submitLabel={
          submitting
            ? "Saving..."
            : isEditMode
              ? "Save Changes"
              : "Create Video"
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
        {/* Headline */}
        <TextField
          label="Video Headline*"
          icon={Heading}
          value={formData.headline}
          onChange={(e) => {
            setFormData({ ...formData, headline: e.target.value });
            if (errors.headline) setErrors({ ...errors, headline: "" });
          }}
          error={errors.headline}
        />

        {/* Video Link */}
        <TextField
          label="Video Link / URL*"
          icon={LinkIcon}
          placeholder="https://youtube.com/..."
          value={formData.videoLink}
          onChange={(e) => {
            setFormData({ ...formData, videoLink: e.target.value });
            if (errors.videoLink) setErrors({ ...errors, videoLink: "" });
          }}
          error={errors.videoLink}
        />

        {/* Status */}
        <StatusSelect
          label="Status"
          value={formData.status}
          onChange={(val) => setFormData((prev) => ({ ...prev, status: val }))}
          error={errors.status}
        />

        {/* Thumbnail Upload */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
            Video Thumbnail Image
          </label>

          <ImageUpload
            initialImages={
              formData.thumbnail ? [{ image: formData.thumbnail }] : []
            }
            onImagesChange={(imgs) =>
              setFormData((prev) => ({
                ...prev,
                thumbnail: imgs[0]?.image || "",
              }))
            }
            allowMultiple={false}
            showCaption={false}
          />
        </div>
      </FormCard>
    </div>
  );
}
