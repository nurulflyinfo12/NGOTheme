"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, PlusCircle, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

import FormCard from "@/components/Admin/FormCard";
import StatusSelect from "@/components/Admin/StatusSelect";

interface CategoryFormData {
  name: string;
  description: string;
  status: "Active" | "Inactive";
}

export default function AddEditCategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("id");
  const isEditMode = Boolean(categoryId);

  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    status: "Active",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CategoryFormData, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const raw = localStorage.getItem("tempCategoryData");
      if (raw) {
        try {
          const cat = JSON.parse(raw);
          setFormData({
            name: cat.name || "",
            description: cat.description || "",
            status: cat.status === "Active" ? "Active" : "Inactive",
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
  }, [isEditMode]);

  const validate = () => {
    const newErrors: Partial<Record<keyof CategoryFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Category name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: keyof CategoryFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      console.log("Payload:", formData);

      localStorage.removeItem("tempCategoryData");

      Swal.fire({
        icon: "success",
        title: isEditMode ? "Updated!" : "Created!",
        text: `Category ${isEditMode ? "updated" : "created"} successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/admin/category");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      description: "",
      status: "Active",
    });
    setErrors({});
  };

  const inputClass = (field: keyof CategoryFormData) => `
    w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all text-black
    ${
      errors[field]
        ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
        : "border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10"
    }
  `;

  return (
    <div className="min-h-screen">
      <FormCard
        title={isEditMode ? "Edit Category" : "Add New Category"}
        description={
          isEditMode ? "Update category details." : "Create a new category."
        }
        onBack={() => {
          localStorage.removeItem("tempCategoryData");
          router.push("/admin/category");
        }}
        backButtonLabel="Back to List"
        onClear={handleClear}
        clearButtonLabel="Clear"
        submitLabel={
          submitting
            ? "Submitting..."
            : isEditMode
              ? "Save Changes"
              : "Create Category"
        }
        submitIcon={
          isEditMode ? (
            <Save className="h-4 w-4" />
          ) : (
            <PlusCircle className="h-4 w-4" />
          )
        }
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={inputClass("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-600 flex items-center gap-1 ml-1">
              <AlertCircle size={12} /> {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className={inputClass("description")}
          />
        </div>

        <div className="space-y-2">
          <StatusSelect
            label="Status"
            required
            value={formData.status}
            onChange={(val) =>
              setFormData((prev) => ({
                ...prev,
                status: val,
              }))
            }
          />
        </div>
      </FormCard>
    </div>
  );
}
