"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { ImageCell } from "@/components/Admin/TableCells";
import { useAward, ApiAward } from "@/hooks/useAward";
import { api } from "@/utility/api";

export default function AwardsList() {
  const router = useRouter();
  const { awards, loading, fetchAwards, deleteAward } = useAward();

  useEffect(() => {
    fetchAwards();
  }, [fetchAwards]);

  const columns: Column<ApiAward>[] = [
    {
      key: "Photo",
      header: "Photo",
      render: (a) => (
        <ImageCell
          src={api.getFileUrl(a.Photo || "")}
          alt={a.Title}
        />
      ),
    },
    { key: "Title", header: "Title", className: "font-medium text-black" },
  ];

  return (
    <DataTable<ApiAward>
      title="Awards"
      description="Manage awards and recognition"
      data={awards}
      columns={columns}
      searchKeys={["Title"]}
      addButtonLabel="Add Award"
      onAdd={() => router.push("/admin/awards/add")}
      onEdit={(a) => {
        const awardId = a.AwardID || "";
        localStorage.setItem("tempAwardData", JSON.stringify(a));
        router.push(`/admin/awards/add?id=${encodeURIComponent(awardId)}`);
      }}
      onDelete={deleteAward}
      getRowId={(a) => a.AwardID || a.Title}
      showActions
    />
  );
}