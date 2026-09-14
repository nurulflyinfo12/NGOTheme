"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus, Save, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";
import StatusSelect from "@/components/Admin/StatusSelect";
import QuillEditor from "@/components/Admin/QuillEditor";

export interface ProgramFormData {
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  status: "Active" | "Inactive";
}

export default function AddEditProgramPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const programId = searchParams.get("id");
  const isEditMode = Boolean(programId);

  const [formData, setFormData] = useState<ProgramFormData>({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    status: "Active",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProgramFormData, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const rawData = localStorage.getItem("tempProgramData");
      if (rawData) {
        try {
          const program = JSON.parse(rawData);

          setFormData({
            title: program.title || "",
            description: program.description || "",
            category: program.category || "",
            thumbnail: program.thumbnail || "",
            status: program.status === "Active" ? "Active" : "Inactive",
          });
        } catch (err) {
          console.error("Error parsing program data:", err);
        }
      }
    }
  }, [isEditMode, programId]);

  const validate = () => {
    const newErrors: Partial<Record<keyof ProgramFormData, string>> = {};

    if (!formData.title.trim()) newErrors.title = "Title is Required. ";
    if (!formData.category.trim())
      newErrors.category = "Category is Required. ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: keyof ProgramFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      console.log("Payload:", formData);

      localStorage.removeItem("tempProgramData");

      Swal.fire({
        icon: "success",
        title: isEditMode ? "Updated!" : "Created!",
        text: `Program ${isEditMode ? "updated" : "created"} successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/admin/allprograms");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      thumbnail: "",
      status: "Active",
    });
    setErrors({});
  };

  const inputClass = (field: keyof ProgramFormData) => `
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
        title={isEditMode ? "Edit Program" : "Add New Program"}
        description={
          isEditMode
            ? "Update the program details below."
            : "Fill in the details to create a new program."
        }
        onBack={() => {
          localStorage.removeItem("tempProgramData");
          router.push("/admin/allprograms");
        }}
        backButtonLabel="Back to List"
        onClear={handleClear}
        clearButtonLabel="Clear"
        submitLabel={
          submitting
            ? "Submitting..."
            : isEditMode
              ? "Save Changes"
              : "Create Program"
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

        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className={inputClass("category")}
          />
          {errors.category && (
            <p className="text-xs text-red-600 flex items-center gap-1 ml-1">
              <AlertCircle size={12} /> {errors.category}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <StatusSelect
            label="Status"
            value={formData.status}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, status: val }))
            }
            error={errors.status}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold ml-1">Description</label>

          <QuillEditor
            value={formData.description}
            onChange={(value) => handleChange("description", value)}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold ml-1">Thumbnail</label>
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
