"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { StatusCell } from "@/components/Admin/TableCells";
import { usePublication, ApiPublication } from "@/hooks/usePublication";
import { api } from "@/utility/api";
import { ExternalLink, FileText } from "lucide-react";

export default function PublicationList() {
  const router = useRouter();
  const { publications, loading, fetchPublications, deletePublication } =
    usePublication();

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  const columns: Column<ApiPublication>[] = [
    { key: "Title", header: "Title", className: "font-medium text-black" },
    { key: "Subtitle", header: "Subtitle", render: (p) => p.Subtitle || "-" },
    { key: "Category", header: "Category" },
    {
      key: "FileUpload",
      header: "Document",
      render: (p) => {
        if (!p.FileUpload)
          return <span className="text-gray-400">No File</span>;
        const fileUrl = api.getFileUrl(p.FileUpload);
        return (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f86048] hover:underline"
          >
            <FileText size={14} />
            <span>View File</span>
            <ExternalLink size={12} />
          </a>
        );
      },
    },
    {
      key: "IsActive",
      header: "Status",
      render: (p) => (
        <StatusCell
          status={p.IsActive ? "Active" : "Inactive"}
          showIcon={false}
        />
      ),
    },
  ];

  return (
    <DataTable<ApiPublication>
      title="Publications"
      description="Manage published documents and PDFs"
      data={publications}
      columns={columns}
      searchKeys={["Title", "Subtitle", "Category"]}
      addButtonLabel="Add Publication"
      onAdd={() => router.push("/admin/publication/add")}
      onEdit={(p) => {
        const pubId = p.PublicationID || "";
        localStorage.setItem("tempPublicationData", JSON.stringify(p));
        router.push(`/admin/publication/add?id=${encodeURIComponent(pubId)}`);
      }}
      onDelete={deletePublication}
      getRowId={(p) => String(p.PublicationID || p.Title)}
      showActions
    />
  );
}
