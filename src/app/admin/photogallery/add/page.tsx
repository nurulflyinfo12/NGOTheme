"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, Plus, AlertCircle, Heading } from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";
import StatusSelect from "@/components/Admin/StatusSelect";
import { TextField } from "@/components/Admin/TextField";
import { usePhotoGallery, ApiPhotoGallery } from "@/hooks/usePhotoGallery";

interface GalleryFormData {
  photoGalleryId?: string;
  companyId?: string;
  categoryId?: string;
  title: string;
  images: { image: string; caption?: string }[];
  status: "Active" | "Inactive";
  isStory: boolean;
  publishedDate?: string;
}

export default function AddEditGalleryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const galleryId = searchParams.get("id");
  const isEditMode = Boolean(galleryId);

  const { submitting, fetchGalleryById, saveOrUpdateGallery } = usePhotoGallery();

  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [formData, setFormData] = useState<GalleryFormData>({
    title: "",
    images: [],
    status: "Active",
    isStory: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof GalleryFormData, string>>
  >({});

  useEffect(() => {
    let isMounted = true;

    if (isEditMode && galleryId) {
      const raw = localStorage.getItem("tempGalleryData");
      if (raw) {
        try {
          const data: ApiPhotoGallery = JSON.parse(raw);
          if (isMounted) {
            setFormData({
              photoGalleryId: data.PhotoGalleryID || galleryId,
              companyId: data.CompanyID || "0011",
              categoryId: data.CategoryID || "",
              title: data.GalleryTitle || "",
              images: Array.isArray(data.Photos)
                ? data.Photos.map((p) => ({
                    image: p.PhotoUrl || "",
                    caption: p.Caption || "",
                  })).filter((img) => img.image !== "")
                : [],
              status: data.Status ? "Active" : "Inactive",
              isStory: data.isStory ?? false,
              publishedDate: data.PublishedDate,
            });
            setInitialLoading(false);
          }
        } catch (err) {
          console.error("Error parsing gallery data:", err);
          if (isMounted) setInitialLoading(false);
        }
      } else {
        fetchGalleryById(galleryId).then((data) => {
          if (isMounted) {
            if (data) {
              setFormData({
                photoGalleryId: data.PhotoGalleryID || galleryId,
                companyId: data.CompanyID || "0011",
                categoryId: data.CategoryID || "",
                title: data.GalleryTitle || "",
                images: Array.isArray(data.Photos)
                  ? data.Photos.map((p) => ({
                      image: p.PhotoUrl || "",
                      caption: p.Caption || "",
                    })).filter((img) => img.image !== "")
                  : [],
                status: data.Status ? "Active" : "Inactive",
                isStory: data.isStory ?? false,
                publishedDate: data.PublishedDate,
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
  }, [isEditMode, galleryId, fetchGalleryById]);

  const validate = () => {
    const newErrors: Partial<Record<keyof GalleryFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = "Gallery Title is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one gallery image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    const payload: ApiPhotoGallery = {
      CompanyID: formData.companyId || currentUser?.CompanyID || "0011",
      ...(formData.photoGalleryId
        ? { PhotoGalleryID: formData.photoGalleryId }
        : {}),
      GalleryTitle: formData.title,
      Status: formData.status === "Active",
      isStory: formData.isStory,
      CategoryID: formData.categoryId || "",
      PublishedDate: formData.publishedDate || new Date().toLocaleString(),
      Photos: formData.images.map((img) => ({
        PhotoUrl: img.image,
        Caption: img.caption || "",
      })),
    };

    const success = await saveOrUpdateGallery(payload);

    if (success) {
      localStorage.removeItem("tempGalleryData");
      router.push("/admin/photogallery");
    }
  };

  const handleClear = () => {
    setFormData({
      photoGalleryId: isEditMode ? formData.photoGalleryId : undefined,
      companyId: formData.companyId,
      categoryId: formData.categoryId,
      title: "",
      images: [],
      status: "Active",
      isStory: false,
    });
    setErrors({});
  };

  if (initialLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <span className="text-sm font-semibold text-slate-500 animate-pulse">
          Loading gallery data...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <FormCard
        title={isEditMode ? "Edit Gallery" : "Add New Gallery"}
        description="Manage gallery images and details"
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
          isEditMode ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />
        }
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <TextField
          label="Gallery Title"
          icon={Heading}
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
            if (errors.title) setErrors({ ...errors, title: "" });
          }}
          error={errors.title}
        />

        {/* Status Select */}
        <StatusSelect
          label="Status"
          value={formData.status}
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, status: val }))
          }
          error={errors.status}
        />

        {/* Images Upload */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
            Gallery Images <span className="text-red-500">*</span>
          </label>

          <ImageUpload
            initialImages={formData.images}
            onImagesChange={(imgs) => {
              setFormData((prev) => ({
                ...prev,
                images: imgs.map((i) => ({
                  image: i.image,
                  caption: i.caption || "",
                })),
              }));
              if (errors.images) setErrors((prev) => ({ ...prev, images: "" }));
            }}
            allowMultiple={true}
            showCaption={false}
          />

          {errors.images && (
            <p className="text-xs text-red-600 flex items-center gap-1 ml-1 mt-1">
              <AlertCircle size={12} /> {errors.images}
            </p>
          )}
        </div>
      </FormCard>
    </div>
  );
}