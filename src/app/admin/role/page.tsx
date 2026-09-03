"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { StatusCell } from "@/components/Admin/TableCells";
import { useRoles, ApiRole } from "@/hooks/useRoles";

export default function AllRoles() {
  const router = useRouter();
  const { roles, loading, fetchRoles, deleteRole } = useRoles();
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const statusText = role.IsActive ? "Active" : "Inactive";
      return statusFilter === "All" || statusText === statusFilter;
    });
  }, [roles, statusFilter]);

  const columns: Column<ApiRole>[] = [
    {
      key: "RoleName",
      header: "Role Name",
      className: "font-medium text-black",
    },
    {
      key: "RoleDescription",
      header: "Description",
      render: (r) => r.RoleDescription || "-",
    },
    {
      key: "IsActive",
      header: "Status",
      render: (r) => (
        <StatusCell
          status={r.IsActive ? "Active" : "Inactive"}
          showIcon={false}
        />
      ),
    },
  ];

  return (
    <div>
      <DataTable<ApiRole>
        title="Roles"
        description="Manage user roles and permissions"
        data={filteredRoles}
        columns={columns}
        searchKeys={["RoleName", "RoleDescription"]}
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
        onEdit={(role) => {
          localStorage.setItem("tempRoleData", JSON.stringify(role));
          router.push(`/admin/role/add?id=${role.RoleID}`);
        }}
        onDelete={deleteRole}
        getRowId={(r) => String(r.RoleID)}
        showActions
      />
    </div>
  );
}
