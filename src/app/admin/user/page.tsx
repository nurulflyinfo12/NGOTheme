"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { StatusCell } from "@/components/Admin/TableCells";
import { useUsers, ApiUser } from "@/hooks/useUsers";

export default function AllUsers() {
  const router = useRouter();
  const { users, loading, fetchUsers } = useUsers();
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        if (statusFilter === "All") return true;
        const status = user.IsActive ? "Active" : "Inactive";
        return status === statusFilter;
      }),
    [users, statusFilter]
  );

  const columns: Column<ApiUser>[] = [
    { key: "UserFullName", header: "Name", className: "font-medium text-black" },
    { key: "Email", header: "Email" },
    { key: "RoleName", header: "Role", render: (u) => u.RoleName || u.RoleID || "-" },
    {
      key: "IsActive",
      header: "Status",
      render: (u) => (
        <StatusCell
          status={u.IsActive ? "Active" : "Inactive"}
          showIcon={false}
        />
      ),
    },
  ];

  return (
    <div>
      <DataTable<ApiUser>
        title="All Users"
        description="Manage all registered users"
        data={filteredUsers}
        columns={columns}
        searchKeys={["UserFullName", "Email", "RoleName"]}
        filters={[
          {
            key: "IsActive",
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
        addButtonLabel="Add User"
        onAdd={() => router.push("/admin/user/add")}
        onEdit={(user) => {
          localStorage.setItem("tempUserData", JSON.stringify(user));
          router.push(`/admin/user/add?id=${user.UserId}`);
        }}
        getRowId={(u) => u.UserId || u.Email}
        showActions
  
      />
    </div>
  );
}