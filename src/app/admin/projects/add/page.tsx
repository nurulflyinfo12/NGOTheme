"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Save,
  Plus,
  AlertCircle,
  Layers,
  MapPin,
  Clock,
  Type,
  Heading,
} from "lucide-react";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";
import QuillEditor from "@/components/Admin/QuillEditor";
import { TextField } from "@/components/Admin/TextField";
import { DropdownSelect } from "@/components/Admin/DropdownSelect";
import { useProjects, ApiProject } from "@/hooks/useProjects";
import { useCategories } from "@/hooks/useCategories";

export interface ProjectFormData {
  projectId?: string;
  companyId?: string;
  title: string;
  subtitle: string;
  photo: string;
  categoryId: string;
  categoryName: string;
  details: string;
  location: string;
  time: string;
  isActive: boolean;
}

export default function AddEditProjectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectIdParam = searchParams.get("id");
  const isEditMode = Boolean(projectIdParam);

  const { submitting, fetchProjectById, saveOrUpdateProject } = useProjects();
  const { categories, fetchCategories } = useCategories();

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    subtitle: "",
    photo: "",
    categoryId: "",
    categoryName: "",
    details: "",
    location: "",
    time: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProjectFormData, string>>
  >({});

  // Fetch Category options for the dropdown
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (isEditMode && projectIdParam) {
      const rawData = localStorage.getItem("tempProjectData");
      if (rawData) {
        try {
          const item = JSON.parse(rawData);
          setFormData({
            projectId: item.ProjectID || projectIdParam,
            companyId: item.CompanyID || "",
            title: item.Title || "",
            subtitle: item.Subtitle || "",
            photo: item.Photo || "",
            categoryId: item.CategoryID || "",
            categoryName: item.CategoryName || "",
            details: item.Details || "",
            location: item.Location || "",
            time: item.Time || "",
            isActive: item.IsActive ?? true,
          });
        } catch (e) {
          console.error("Error parsing project data:", e);
        }
      } else {
        fetchProjectById(projectIdParam).then((item) => {
          if (item) {
            setFormData({
              projectId: item.ProjectID || projectIdParam,
              companyId: item.CompanyID || "",
              title: item.Title || "",
              subtitle: item.Subtitle || "",
              photo: item.Photo || "",
              categoryId: item.CategoryID || "",
              categoryName: item.CategoryName || "",
              details: item.Details || "",
              location: item.Location || "",
              time: item.Time || "",
              isActive: item.IsActive ?? true,
            });
          }
        });
      }
    }
  }, [isEditMode, projectIdParam, fetchProjectById]);

  const handleClear = () => {
    setFormData({
      projectId: isEditMode ? formData.projectId : undefined,
      companyId: formData.companyId,
      title: "",
      subtitle: "",
      photo: "",
      categoryId: "",
      categoryName: "",
      details: "",
      location: "",
      time: "",
      isActive: true,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof ProjectFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = "Title is Required. ";
    if (!formData.subtitle.trim())
      newErrors.subtitle = "SubTitle is Required. ";
    if (!formData.categoryId.trim())
      newErrors.categoryId = "Category selection is Required";
    if (!formData.photo.trim()) newErrors.photo = "Photo is Required. ";
    if (!formData.time.trim()) newErrors.time = "Time is ";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ProjectFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleCategorySelect = (selectedId: string) => {
    const selectedCat = categories.find(
      (c) => (c.CategoryID || "") === selectedId,
    );
    setFormData((prev) => ({
      ...prev,
      categoryId: selectedId,
      categoryName: selectedCat ? selectedCat.CategoryName : "",
    }));
    if (errors.categoryId) setErrors((prev) => ({ ...prev, categoryId: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    const projectIdValue = formData.projectId || projectIdParam || undefined;

    const payload: ApiProject = {
      ...(projectIdValue ? { ProjectID: projectIdValue } : {}),
      CompanyID: formData.companyId || currentUser?.CompanyID || "",
      Title: formData.title,
      Subtitle: formData.subtitle,
      Photo: formData.photo,
      CategoryID: formData.categoryId,
      CategoryName: formData.categoryName,
      Details: formData.details,
      Location: formData.location,
      Time: formData.time,
      IsActive: formData.isActive,
      SetDate: new Date().toISOString(),
    };

    const success = await saveOrUpdateProject(payload);

    if (success) {
      localStorage.removeItem("tempProjectData");
      router.push("/admin/projects");
    }
  };

  const categoryOptions = categories.map((cat) => ({
    label: cat.CategoryName || "",
    value: cat.CategoryID || "",
  }));

  return (
    <FormCard
      title={isEditMode ? "Edit Project" : "Add New Project"}
      description="Fill in the details for the project."
      onBack={() => {
        localStorage.removeItem("tempProjectData");
        router.push("/admin/projects");
      }}
      backButtonLabel="Back to List"
      onClear={handleClear}
      clearButtonLabel="Clear"
      submitLabel={
        submitting
          ? "Submitting..."
          : isEditMode
            ? "Save Changes"
            : "Create Project"
      }
      submitIcon={
        isEditMode ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />
      }
      onSubmit={handleSubmit}
    >
      <TextField
        label="Title*"
        icon={Heading}
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        error={errors.title}
      />

      <TextField
        label="Subtitle*"
        icon={Type}
        value={formData.subtitle}
        onChange={(e) => handleChange("subtitle", e.target.value)}
        error={errors.subtitle}
      />

      <DropdownSelect
        label="Category*"
        icon={Layers}
        placeholder="Select Category"
        options={categoryOptions}
        value={formData.categoryId}
        onChange={(e) => handleCategorySelect(e.target.value)}
        error={errors.categoryId}
      />

      <TextField
        label="Location"
        icon={MapPin}
        value={formData.location}
        onChange={(e) => handleChange("location", e.target.value)}
        error={errors.location}
      />

      {/* Datetime Picker Field */}
      {/* Time Picker Field */}
      <div className="sm:col-span-2 space-y-1.5">
        <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
          Time / Schedule
        </label>
        <div className="relative group w-full">
          <Clock
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors pointer-events-none z-10 ${
              errors.time
                ? "text-red-400 group-focus-within:text-red-500"
                : "text-slate-400 group-focus-within:text-[#f86048]"
            }`}
            size={18}
          />
          <input
            type="time"
            value={formData.time}
            onChange={(e) => handleChange("time", e.target.value)}
            className={`w-full py-3 text-black sm:py-3.5 pl-11 pr-4 text-sm sm:text-base border-2 rounded-2xl outline-none bg-white/70 focus:bg-white transition-all shadow-sm ${
              formData.time ? "text-slate-900 font-medium" : "text-slate-400"
            } ${
              errors.time
                ? "border-red-300 focus:border-red-500 text-red-900"
                : "border-slate-200/80 focus:border-[#f86048]"
            }`}
          />
        </div>
        {errors.time && (
          <span className="text-xs font-medium text-red-500 px-1 animate-in fade-in slide-in-from-top-1">
            {errors.time}
          </span>
        )}
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <label className="text-xs font-bold text-slate-700 tracking-wide uppercase px-1">
          Details*
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
          label="Drag & Drop Project Photo"
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
