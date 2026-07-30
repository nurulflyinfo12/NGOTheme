"use client";

import React, { useEffect, useRef, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

interface ImageData {
  image: string;
  caption?: string;
}

interface ImageUploadProps {
  initialImages?: ImageData[];
  onImagesChange: (images: ImageData[]) => void;
  allowMultiple?: boolean;
  showCaption?: boolean;
  label?: string;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  initialImages = [],
  onImagesChange,
  allowMultiple = false,
  showCaption = false,
  label = "Click or drag to upload",
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
}) => {
  const [images, setImages] = useState<ImageData[]>(initialImages);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => setImages(initialImages), [initialImages]);

  const updateImages = (updated: ImageData[]) => {
    setImages(updated);
    onImagesChange(updated);
  };

  const validateDimensions = (file: File): Promise<boolean> =>
    new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const { width, height } = img;
        const invalid =
          (minWidth && width < minWidth) ||
          (minHeight && height < minHeight) ||
          (maxWidth && width > maxWidth) ||
          (maxHeight && height > maxHeight);

        if (invalid) {
          Swal.fire({
            title: "Size Mismatch",
            html: `<div class="text-sm">Current: <b>${width}x${height}</b><br/>Required: <b>${minWidth ?? "any"}x${minHeight ?? "any"}</b> to <b>${maxWidth ?? "∞"}x${maxHeight ?? "∞"}</b></div>`,
            icon: "warning",
          });
          resolve(false);
        } else resolve(true);
      };

      img.onerror = () => resolve(false);
    });

  const processFiles = async (files: File[]) => {
    if (!files.length) return;
    setIsUploading(true);

    const selected = allowMultiple ? files : [files[0]];
    const validFiles = selected.filter((f) => f.type.startsWith("image/"));

    const newImages: ImageData[] = [];
    for (const file of validFiles) {
      const valid = await validateDimensions(file);
      if (!valid) continue;

      const previewUrl = URL.createObjectURL(file);
      newImages.push({ image: previewUrl, caption: "" });
    }

    if (newImages.length > 0) {
      const updated = allowMultiple ? [...images, ...newImages] : newImages;
      updateImages(updated);
    }

    setIsUploading(false);
  };

  const handleRemove = async (index: number) => {
    const result = await Swal.fire({
      title: "Remove Image?",
      text: "Are you sure you want to remove this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      updateImages(images.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="w-full space-y-6">
      <div
        className={`grid gap-4 ${
          allowMultiple ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"
        }`}
      >
        <AnimatePresence>
          {images.map((photo, index) => (
            <motion.div
              key={photo.image + index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`relative group rounded-2xl overflow-hidden border bg-gray-100 dark:bg-gray-900 ${
                allowMultiple ? "aspect-square" : "h-52 w-full"
              }`}
            >
              <img
                src={photo.image}
                className="w-full h-full object-contain"
                alt="Upload"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <button
                  onClick={() => handleRemove(index)}
                  className="bg-red-500 text-white p-2 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}

          {(allowMultiple || images.length === 0) && (
            <motion.div
              layout
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                processFiles(Array.from(e.dataTransfer.files));
              }}
              className={`rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                allowMultiple ? "aspect-square" : "h-52 w-full"
              } ${
                dragActive
                  ? "border-[#e86958] bg-[#fde1de]"
                  : "border-gray-300 hover:border-[#e86958]"
              }`}
            >
              {isUploading ? (
                <span className="text-sm font-medium">Uploading...</span>
              ) : (
                <>
                  <Plus size={28} />
                  <span className="text-sm mt-2 font-semibold">
                    {images.length ? "Replace Image" : "Upload Image"}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG up to 10MB
                  </span>
                </>
              )}
              <input
                type="file"
                className="hidden"
                multiple={allowMultiple}
                ref={inputRef}
                onChange={(e) => {
                  if (!e.target.files) return;
                  processFiles(Array.from(e.target.files));
                  e.target.value = "";
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageUpload;