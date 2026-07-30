"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { StatusCell } from "@/components/Admin/TableCells";

// ---------------------------
// User Data Interface
// ---------------------------
interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Subscriber";
  status: "Active" | "Inactive";
}

// ---------------------------
// Dummy Users Data
// ---------------------------
const dummyUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Inactive",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Subscriber",
    status: "Active",
  },
];

// ---------------------------
// Users List Component
// ---------------------------
export default function AllUsers() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) => statusFilter === "All" || user.status === statusFilter
      ),
    [users, statusFilter]
  );

  const handleDelete = async (user: User) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${user.name}". This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e86958",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      Swal.fire({
        title: "Deleted!",
        text: "User has been removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Table Columns
  const columns: Column<User>[] = [
    { key: "name", header: "Name", className: "font-medium text-black" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
    {
      key: "status",
      header: "Status",
      render: (u) => <StatusCell status={u.status} showIcon={false} />,
    },
  ];

  return (
    <div className="">
      <DataTable<User>
        title="All Users"
        description="Manage all registered users"
        data={filteredUsers}
        columns={columns}
        searchKeys={["name", "email", "role"]}
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
        addButtonLabel="Add User"
        onAdd={() => router.push("/admin/user/add")}
        onEdit={(user) => router.push(`/admin/user/add?id=${user.id}`)}
        onDelete={handleDelete}
        getRowId={(u) => u.id}
        showActions
      />
    </div>
  );
}