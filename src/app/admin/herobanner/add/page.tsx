"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Save,
  Plus,
  AlertCircle,
  Heading,
  FileText,
  Quote as QuoteIcon,
} from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";
import { TextField } from "@/components/Admin/TextField";
import { useHeroSection, ApiHeroSection } from "@/hooks/useHeroSection";

export interface HeroBannerFormData {
  heroSectionId?: string;
  heroTitle: string;
  heroDetails: string;
  quote: string;
  imageUrls: string[];
}

export default function AddEditHeroBannerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bannerId = searchParams.get("id");
  const isEditMode = Boolean(bannerId);

  const { submitting, saveOrUpdateHeroSection } = useHeroSection();

  const [formData, setFormData] = useState<HeroBannerFormData>({
    heroTitle: "",
    heroDetails: "",
    quote: "",
    imageUrls: [],
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof HeroBannerFormData, string>>
  >({});

  useEffect(() => {
    if (isEditMode) {
      const rawData = localStorage.getItem("tempHeroBannerData");
      if (rawData) {
        try {
          const banner = JSON.parse(rawData);
          setFormData({
            heroSectionId: banner.HeroSectionID || bannerId || undefined,
            heroTitle: banner.HeroTitle || "",
            heroDetails: banner.HeroDetails || "",
            quote: banner.Quote || "",
            imageUrls: Array.isArray(banner.ImageUrls) ? banner.ImageUrls : [],
          });
        } catch (err) {
          console.error("Error parsing banner data:", err);
        }
      }
    }
  }, [isEditMode, bannerId]);

  const validate = () => {
    const newErrors: Partial<Record<keyof HeroBannerFormData, string>> = {};
    if (!formData.heroTitle.trim()) newErrors.heroTitle = "Title is Required. ";
    if (formData.imageUrls.length === 0 || !formData.imageUrls[0]) {
      newErrors.imageUrls = "Banner image is Required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof HeroBannerFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: ApiHeroSection = {
      ...(formData.heroSectionId
        ? { HeroSectionID: formData.heroSectionId }
        : {}),
      HeroTitle: formData.heroTitle,
      HeroDetails: formData.heroDetails,
      Quote: formData.quote,
      SetDate: new Date().toISOString(),
      ImageUrls: formData.imageUrls,
    };

    const success = await saveOrUpdateHeroSection(payload);

    if (success) {
      localStorage.removeItem("tempHeroBannerData");
      router.push("/admin/herobanner");
    }
  };

  const handleClear = () => {
    setFormData({
      heroSectionId: isEditMode ? formData.heroSectionId : undefined,
      heroTitle: "",
      heroDetails: "",
      quote: "",
      imageUrls: [],
    });
    setErrors({});
  };

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
        submitLabel={
          submitting
            ? "Submitting..."
            : isEditMode
              ? "Save Changes"
              : "Create Banner"
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
        {/* Title */}
        <TextField
          label="Title*"
          icon={Heading}
          value={formData.heroTitle}
          onChange={(e) => handleChange("heroTitle", e.target.value)}
          error={errors.heroTitle}
        />

        {/* Quote */}
        <TextField
          label="Quote"
          icon={QuoteIcon}
          value={formData.quote}
          onChange={(e) => handleChange("quote", e.target.value)}
          error={errors.quote}
        />

        {/* Details */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
            Details
          </label>
          <div className="relative group w-full">
            <textarea
              rows={4}
              value={formData.heroDetails}
              onChange={(e) => handleChange("heroDetails", e.target.value)}
              placeholder="Enter hero section description details..."
              className="w-full p-4 text-sm border-2 rounded-2xl outline-none bg-white/70 focus:bg-white transition-all shadow-sm border-slate-200/80 focus:border-[#f86048]"
            />
          </div>
        </div>

        {/* Banner Images */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
            Banner Image <span className="text-red-500">*</span>
          </label>
          <ImageUpload
            label="Drag & Drop Banner Image"
            allowedTypes="image"
            allowMultiple={false}
            showCaption={false}
            initialImages={
              formData.imageUrls.length > 0
                ? [{ image: formData.imageUrls[0] }]
                : []
            }
            onImagesChange={(files) =>
              handleChange(
                "imageUrls",
                files.map((f) => f.image).filter(Boolean),
              )
            }
          />
          {errors.imageUrls && (
            <p className="text-xs text-red-600 flex items-center gap-1 ml-1 mt-1">
              <AlertCircle size={12} /> {errors.imageUrls}
            </p>
          )}
        </div>
      </FormCard>
    </div>
  );
}
