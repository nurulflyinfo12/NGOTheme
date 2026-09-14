"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import DataTable, { Column } from "@/components/Admin/DataTable";
import { StatusCell } from "@/components/Admin/TableCells";
import { useCategories, ApiCategory } from "@/hooks/useCategories";

export default function AllCategories() {
  const router = useRouter();
  const { categories, loading, fetchCategories, deleteCategory } = useCategories();
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = useMemo(
    () =>
      categories.filter((cat) => {
        if (statusFilter === "All") return true;
        const status = cat.IsActive ? "Active" : "Inactive";
        return status === statusFilter;
      }),
    [categories, statusFilter]
  );

  const columns: Column<ApiCategory>[] = [
    {
      key: "CategoryName",
      header: "Category Name",
      className: "font-medium text-black",
    },
    {
      key: "Description",
      header: "Description",
      render: (c) => c.Description || "-",
    },
    {
      key: "IsActive",
      header: "Status",
      render: (c) => (
        <StatusCell
          status={c.IsActive ? "Active" : "Inactive"}
          showIcon={false}
        />
      ),
    },
  ];

  return (
    <div>
      <DataTable<ApiCategory>
        title="Categories"
        description="Manage content categories"
        data={filteredCategories}
        columns={columns}
        searchKeys={["CategoryName", "Description"]}
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
        addButtonLabel="Add Category"
        onAdd={() => router.push("/admin/category/add")}
        onEdit={(cat) => {
          localStorage.setItem("tempCategoryData", JSON.stringify(cat));
          router.push(`/admin/category/add?id=${cat.CategoryID}`);
        }}
        onDelete={deleteCategory}
        getRowId={(c) => c.CategoryID || c.CategoryName}
        showActions
      />
    </div>
  );
}