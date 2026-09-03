"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, FileText } from "lucide-react";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { useCareer, ApiCareer } from "@/hooks/useCareer";
import { api } from "@/utility/api";

export default function CareerList() {
  const router = useRouter();
  const { careers, loading, fetchCareers, deleteCareer } = useCareer();

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  const columns: Column<ApiCareer>[] = [
    { key: "Title", header: "Title", className: "font-medium text-black" },
    { key: "Subtitle", header: "Subtitle", render: (c) => c.Subtitle || "-" },
    { key: "Category", header: "Category" },
    {
      key: "FileUpload",
      header: "Job Circular File",
      render: (c) =>
        c.FileUpload ? (
          <a
            href={api.getFileUrl(c.FileUpload)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f86048] hover:underline bg-[#f86048]/10 px-3 py-1.5 rounded-lg"
          >
            <FileText size={14} />
            View Document
            <ExternalLink size={12} />
          </a>
        ) : (
          <span className="text-gray-400 text-xs">No File</span>
        ),
    },
  ];

  return (
    <DataTable<ApiCareer>
      title="Careers"
      description="Manage job circulars and open positions"
      data={careers}
      columns={columns}
      searchKeys={["Title", "Subtitle", "Category"]}
      addButtonLabel="Add Career Opening"
      onAdd={() => router.push("/admin/careers/add")}
      onEdit={(c) => {
        const careerId = c.CareerID || "";
        localStorage.setItem("tempCareerData", JSON.stringify(c));
        router.push(`/admin/careers/add?id=${encodeURIComponent(careerId)}`);
      }}
      onDelete={deleteCareer}
      getRowId={(c) => c.CareerID || c.Title}
      showActions
    />
  );
}