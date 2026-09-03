"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Trash2, UploadCloud, FileText, ExternalLink } from "lucide-react";
import Swal from "sweetalert2";
import { api } from "@/utility/api";

export interface FileData {
  image: string; // File path/URL returned from server
  caption?: string;
  name?: string;
}

interface FileUploadProps {
  onImagesChange: (files: FileData[]) => void;
  allowMultiple?: boolean;
  initialImages?: FileData[];
  showCaption?: boolean;
  label?: string;
  allowedTypes?: "image" | "pdf" | "all"; // Controls accepted file formats
}

const ImageUpload: React.FC<FileUploadProps> = ({
  onImagesChange,
  allowMultiple = false,
  initialImages = [],
  showCaption = false,
  label = "Drag & Drop Files",
  allowedTypes = "image",
}) => {
  const [photos, setPhotos] = useState<FileData[]>(initialImages);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Sync state when initialImages prop updates (e.g., during edit mode)
  useEffect(() => {
    if (JSON.stringify(initialImages) !== JSON.stringify(photos)) {
      setPhotos(initialImages);
    }
  }, [JSON.stringify(initialImages)]);

  const updatePhotos = (newPhotos: FileData[]) => {
    setPhotos(newPhotos);
    onImagesChange(newPhotos);
  };

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Upload file using centralized API wrapper
      const response = await api.upload("/FileServer/UploadFile", formData);

      const fileUrl =
        typeof response === "string"
          ? response
          : response?.CurrentMessage ||
            response?.filePath ||
            response?.fileName ||
            response?.Data;

      if (!fileUrl) {
        throw new Error("File URL was not returned from the server.");
      }
      return fileUrl;
    } catch (error: any) {
      Swal.fire(
        "Upload Failed",
        error.message || "Failed to upload file.",
        "error",
      );
      console.error("File upload error:", error);
      return null;
    }
  }, []);

  const isValidFileType = (file: File) => {
    if (allowedTypes === "image") return file.type.startsWith("image/");
    if (allowedTypes === "pdf") return file.type === "application/pdf";
    return file.type.startsWith("image/") || file.type === "application/pdf";
  };

  const processFiles = async (files: File[]) => {
    const validFiles = files.filter(isValidFileType);

    if (validFiles.length === 0) {
      const formatMsg =
        allowedTypes === "image"
          ? "images (PNG, JPG)"
          : allowedTypes === "pdf"
            ? "PDF documents"
            : "images or PDF documents";
      Swal.fire(
        "Invalid File Type",
        `Please select valid ${formatMsg} only.`,
        "error",
      );
      return;
    }

    if (!allowMultiple && validFiles.length > 1) {
      Swal.fire("Limit Exceeded", "Only one file is allowed.", "error");
      return;
    }

    setIsUploading(true);

    const selectedFiles = allowMultiple ? validFiles : [validFiles[0]];
    const newFiles: FileData[] = [];

    for (const file of selectedFiles) {
      const fileUrl = await uploadFile(file);
      if (fileUrl) {
        newFiles.push({
          image: fileUrl,
          caption: "",
          name: file.name,
        });
      }
    }

    if (newFiles.length > 0) {
      updatePhotos(allowMultiple ? [...photos, ...newFiles] : newFiles);
    }

    setIsUploading(false);
  };
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    await processFiles(files);
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    await processFiles(files);
    e.target.value = "";
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleCaptionChange = (index: number, value: string) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index] = { ...updatedPhotos[index], caption: value };
    updatePhotos(updatedPhotos);
  };

  const handleRemoveFile = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    updatePhotos(updatedPhotos);
  };

  const isPdf = (path: string) => path.toLowerCase().endsWith(".pdf");

  const getAcceptAttribute = () => {
    if (allowedTypes === "image") return "image/*";
    if (allowedTypes === "pdf") return "application/pdf";
    return "image/*,application/pdf";
  };

  return (
    <div className="w-full space-y-4 font-sans">
      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`p-6 border-2 border-dashed rounded-2xl text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
          dragActive
            ? "border-[#f86048] bg-[#f86048]/10"
            : "border-slate-300 hover:border-[#f86048] bg-slate-50/50 hover:bg-slate-50"
        }`}
      >
        <UploadCloud
          size={36}
          className={dragActive ? "text-[#f86048]" : "text-slate-400"}
        />
        <p className="text-[#f86048] font-bold text-base mt-2">
          {dragActive ? "Drop Your File(s) Here!" : label}
        </p>
        <span className="text-xs text-slate-400 my-1">or</span>

        <label className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#f86048] bg-white border-2 border-[#f86048] rounded-xl !hover:bg-[#f86048] hover:text-white transition-all shadow-sm cursor-pointer">
          <UploadCloud size={16} />
          {isUploading
            ? "Uploading..."
            : `Select ${allowedTypes === "pdf" ? "PDF" : "File"}${allowMultiple ? "(s)" : ""}`}
          <input
            type="file"
            accept={getAcceptAttribute()}
            multiple={allowMultiple}
            onChange={handleFileInputChange}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Uploaded Files List */}
      {photos.length > 0 && (
        <div className="space-y-3 pt-2">
          <p className="text-xs font-bold text-[#f86048] uppercase tracking-wider px-1">
            Uploaded File{photos.length > 1 ? "s" : ""}
          </p>

          <div className="space-y-3">
            {photos.map((file, index) => {
              const fileIsPdf = isPdf(file.image);
              const fullFileUrl = api.getFileUrl(file.image);

              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-white border-2 border-slate-100 rounded-2xl shadow-sm"
                >
                  {/* File Thumbnail or Icon Badge */}
                  <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                    {fileIsPdf ? (
                      <div className="flex flex-col items-center justify-center text-red-500">
                        <FileText size={28} />
                        <span className="text-[9px] font-black uppercase mt-0.5">
                          PDF
                        </span>
                      </div>
                    ) : (
                      <img
                        src={fullFileUrl}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
                        }}
                      />
                    )}
                  </div>

                  {/* PDF Details & Download Link */}
                  {fileIsPdf ? (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {file.name ||
                          file.image.split("/").pop() ||
                          "Document.pdf"}
                      </p>
                      <a
                        href={fullFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#f86048] hover:underline mt-1"
                      >
                        <ExternalLink size={12} /> View Document
                      </a>
                    </div>
                  ) : (
                    showCaption && (
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Caption"
                          value={file.caption || ""}
                          onChange={(e) =>
                            handleCaptionChange(index, e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border-2 border-slate-200/80 rounded-xl text-slate-800 placeholder-slate-400 focus:border-[#f86048] outline-none bg-white/70"
                        />
                      </div>
                    )
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors ml-auto"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
