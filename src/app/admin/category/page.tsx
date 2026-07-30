"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import DataTable, { Column } from "@/components/Admin/DataTable";
import { StatusCell } from "@/components/Admin/TableCells";

interface Category {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Inactive";
}

const dummyCategories: Category[] = [
  {
    id: "1",
    name: "Technology",
    description: "Tech related content",
    status: "Active",
  },
  {
    id: "2",
    name: "Health",
    description: "Health & wellness topics",
    status: "Active",
  },
  {
    id: "3",
    name: "Lifestyle",
    description: "Daily life tips",
    status: "Inactive",
  },
];

export default function AllCategories() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCategories = useMemo(
    () =>
      categories.filter(
        (cat) => statusFilter === "All" || cat.status === statusFilter,
      ),
    [categories, statusFilter],
  );

  const handleDelete = async (category: Category) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete "${category.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e86958",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setCategories((prev) => prev.filter((c) => c.id !== category.id));

      Swal.fire({
        title: "Deleted!",
        text: "Category removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const columns: Column<Category>[] = [
    {
      key: "name",
      header: "Category Name",
      className: "font-medium text-black",
    },
    { key: "description", header: "Description" },
    {
      key: "status",
      header: "Status",
      render: (c) => <StatusCell status={c.status} showIcon={false} />,
    },
  ];

  return (
    <div>
      <DataTable<Category>
        title="Categories"
        description="Manage content categories"
        data={filteredCategories}
        columns={columns}
        searchKeys={["name", "description"]}
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
        addButtonLabel="Add Category"
        onAdd={() => router.push("/admin/category/add")}
        onEdit={(cat) => {
          localStorage.setItem("tempCategoryData", JSON.stringify(cat));
          router.push(`/admin/category/add?id=${cat.id}`);
        }}
        onDelete={handleDelete}
        getRowId={(c) => c.id}
        showActions
      />
    </div>
  );
}
