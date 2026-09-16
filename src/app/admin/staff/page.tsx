"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { ImageCell } from "@/components/Admin/TableCells";
import { useStaff, ApiStaff } from "@/hooks/useStaff";
import { api } from "@/utility/api";

export default function StaffList() {
  const router = useRouter();
  const { staffList, loading, fetchStaff, deleteStaff } = useStaff();

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const columns: Column<ApiStaff>[] = [
    {
      key: "Photo",
      header: "Photo",
      render: (s) => (
        <ImageCell
          src={api.getFileUrl(s.Photo || "")}
          alt={s.Name}
        />
      ),
    },
    { key: "Name", header: "Name", className: "font-medium text-black" },
    { key: "Position", header: "Position" },
    { key: "Type", header: "Type" },
    {
      key: "IsExecutive",
      header: "Executive",
      render: (s) => (s.IsExecutive ? "Yes" : "No"),
    },
    { key: "Email", header: "Email", render: (s) => s.Email || "-" },
  ];

  return (
    <DataTable<ApiStaff>
      title="Our Staff"
      description="Manage all staff records"
      data={staffList}
      columns={columns}
      searchKeys={["Name", "Position", "Type", "Email"]}
      addButtonLabel="Add Staff"
      onAdd={() => router.push("/admin/staff/add")}
      onEdit={(s) => {
        const staffId = s.StaffID || s.ID || "";
        localStorage.setItem("tempStaffData", JSON.stringify(s));
        router.push(`/admin/staff/add?id=${encodeURIComponent(staffId)}`);
      }}
      onDelete={deleteStaff}
      getRowId={(s) => String(s.StaffID || s.ID || s.Name)}
      showActions
    />
  );
}