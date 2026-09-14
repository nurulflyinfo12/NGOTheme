"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { ImageCell } from "@/components/Admin/TableCells";
import { useKeyInitiatives, ApiKeyInitiative } from "@/hooks/useKeyInitiatives";
import { api } from "@/utility/api";

export default function KeyInitiativesList() {
  const router = useRouter();
  const { initiatives, loading, fetchInitiatives, deleteInitiative } =
    useKeyInitiatives();

  useEffect(() => {
    fetchInitiatives();
  }, [fetchInitiatives]);

  const columns: Column<ApiKeyInitiative>[] = [
    {
      key: "Photo",
      header: "Photo",
      render: (i) => (
        <ImageCell src={api.getFileUrl(i.Photo || "")} alt={i.Title} />
      ),
    },
    { key: "Title", header: "Title", className: "font-medium text-black" },
  ];

  return (
    <DataTable<ApiKeyInitiative>
      title="Key Initiatives"
      description="Manage organization key initiatives"
      data={initiatives}
      columns={columns}
      searchKeys={["Title"]}
      addButtonLabel="Add Initiative"
      onAdd={() => router.push("/admin/key-initiatives/add")}
      onEdit={(i) => {
        const initiativeId = i.InitiativeID || "";
        localStorage.setItem("tempInitiativeData", JSON.stringify(i));
        router.push(
          `/admin/key-initiatives/add?id=${encodeURIComponent(initiativeId)}`,
        );
      }}
      onDelete={deleteInitiative}
      getRowId={(i) => i.InitiativeID || i.Title}
      showActions
    />
  );
}
