"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { ImageCell } from "@/components/Admin/TableCells";
import { useProjects, ApiProject } from "@/hooks/useProjects";
import { api } from "@/utility/api";

export default function AllProjects() {
  const router = useRouter();
  const { projects, loading, fetchProjects, deleteProject } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const columns: Column<ApiProject>[] = [
    {
      key: "Photo",
      header: "Photo",
      render: (p) => (
        <ImageCell src={api.getFileUrl(p.Photo || "")} alt={p.Title} />
      ),
    },
    { key: "Title", header: "Title", className: "font-medium text-black" },
    { key: "Subtitle", header: "Subtitle", render: (p) => p.Subtitle || "-" },
    { key: "Location", header: "Location", render: (p) => p.Location || "N/A" },
    { key: "Time", header: "Time", render: (p) => p.Time || "-" },
  ];

  return (
    <DataTable<ApiProject>
      title="Projects"
      description="Manage ongoing and past projects"
      data={projects}
      columns={columns}
      searchKeys={["Title", "Subtitle", "CategoryName", "Location"]}
      addButtonLabel="Add Project"
      onAdd={() => router.push("/admin/projects/add")}
      onEdit={(p) => {
        const projectId = p.ProjectID || "";
        localStorage.setItem("tempProjectData", JSON.stringify(p));
        router.push(`/admin/projects/add?id=${encodeURIComponent(projectId)}`);
      }}
      onDelete={deleteProject}
      getRowId={(p) => p.ProjectID || p.Title}
      showActions
    />
  );
}
