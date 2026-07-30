"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus, Save, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

import FormCard from "@/components/Admin/FormCard";
import ImageUpload from "@/components/Admin/ImageUpload";
import StatusSelect from "@/components/Admin/StatusSelect";
import QuillEditor from "@/components/Admin/QuillEditor";

export interface BlogFormData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  status: "Active" | "Inactive";
}

export default function AddEditBlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const isEditMode = Boolean(blogId);

  const [formData, setFormData] = useState<BlogFormData>({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    status: "Active",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BlogFormData, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const rawData = localStorage.getItem("tempBlogData");
      if (rawData) {
        const blog = JSON.parse(rawData);
        setFormData({ ...blog });
      }
    } else {
      setFormData({ ...formData, id: Date.now().toString() });
    }
  }, [isEditMode, blogId]);

  const validate = () => {
    const newErrors: Partial<Record<keyof BlogFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.image.trim()) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: keyof BlogFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const raw = localStorage.getItem("blogsData");
    const blogs: BlogFormData[] = raw ? JSON.parse(raw) : [];

    let updatedBlogs;
    if (isEditMode) {
      updatedBlogs = blogs.map((b) => (b.id === formData.id ? formData : b));
    } else {
      updatedBlogs = [...blogs, formData];
    }

    localStorage.setItem("blogsData", JSON.stringify(updatedBlogs));

    Swal.fire({
      icon: "success",
      title: isEditMode ? "Updated!" : "Created!",
      text: `Blog ${isEditMode ? "updated" : "created"} successfully.`,
      timer: 1500,
      showConfirmButton: false,
    });

    localStorage.removeItem("tempBlogData");
    router.push("/admin/blogs");
    setSubmitting(false);
  };

  const handleClear = () => {
    setFormData({
      id: Date.now().toString(),
      title: "",
      excerpt: "",
      content: "",
      category: "",
      image: "",
      status: "Active",
    });
    setErrors({});
  };

  const inputClass = (field: keyof BlogFormData) => `
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
        title={isEditMode ? "Edit Blog" : "Add New Blog"}
        description={
          isEditMode
            ? "Update the blog details below."
            : "Fill in the details to create a new blog."
        }
        onBack={() => {
          localStorage.removeItem("tempBlogData");
          router.push("/admin/blogs");
        }}
        backButtonLabel="Back to List"
        onClear={handleClear}
        clearButtonLabel="Clear"
        submitLabel={
          submitting
            ? "Submitting..."
            : isEditMode
              ? "Save Changes"
              : "Create Blog"
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
            Excerpt <span className="text-red-500">*</span>
          </label>
          <input
            value={formData.excerpt}
            onChange={(e) => handleChange("title", e.target.value)}
            className={inputClass("title")}
          />
          {errors.title && (
            <p className="text-xs text-red-600 flex items-center gap-1 ml-1">
              <AlertCircle size={12} /> {errors.title}
            </p>
          )}
        </div>

        {/* Category */}
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

        {/* Status */}
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
        {/* Content */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold ml-1">Content</label>

          <QuillEditor
            value={formData.content}
            onChange={(value) => handleChange("content", value)}
          />
        </div>

        {/* Image */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold ml-1">
            Blog Image <span className="text-red-500">*</span>
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
