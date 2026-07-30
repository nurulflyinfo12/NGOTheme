"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { StatusCell } from "@/components/Admin/TableCells";

// ---------------------------
// Dummy Data for Roles
// ---------------------------
interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  status: "Active" | "Inactive";
}

const dummyRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full access to all modules",
    permissions: ["users", "programs", "blogs", "settings"],
    status: "Active",
  },
  {
    id: "2",
    name: "Editor",
    description: "Can edit content but not manage users",
    permissions: ["programs", "blogs"],
    status: "Active",
  },
  {
    id: "3",
    name: "Subscriber",
    description: "Read-only access",
    permissions: [],
    status: "Inactive",
  },
];

// ---------------------------
// AllRoles Component
// ---------------------------
export default function AllRoles() {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>(dummyRoles);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRoles = useMemo(
    () =>
      roles.filter(
        (role) => statusFilter === "All" || role.status === statusFilter
      ),
    [roles, statusFilter]
  );

  const handleDelete = async (role: Role) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${role.name}". This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e86958",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setRoles((prev) => prev.filter((r) => r.id !== role.id));
      Swal.fire({
        title: "Deleted!",
        text: "Role has been removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Table Columns
  const columns: Column<Role>[] = [
    { key: "name", header: "Role Name", className: "font-medium text-black" },
    { key: "description", header: "Description" },
    {
      key: "permissions",
      header: "Permissions",
      render: (r) => r.permissions.join(", ") || "-",
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusCell status={r.status} showIcon={false} />,
    },
  ];

  return (
    <div className="">
      <DataTable<Role>
        title="Roles"
        description="Manage user roles and permissions"
        data={filteredRoles}
        columns={columns}
        searchKeys={["name", "description", "permissions"]}
        filters={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "All", label: "All Status" },
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ],
            value: statusFilter,
            onChange: setStatusFilter,
          },
        ]}
        addButtonLabel="Add Role"
        onAdd={() => router.push("/admin/role/add")}
        onEdit={(role) => router.push(`/admin/role/add?id=${role.id}`)}
        onDelete={handleDelete}
        getRowId={(r) => r.id}
        showActions
      />
    </div>
  );
}