"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import DataTable, { Column } from "@/components/Admin/DataTable";
import { StatusCell } from "@/components/Admin/TableCells";
import { useSubCategory, ApiSubCategory } from "@/hooks/useSubCategory";

export default function AllSubCategories() {
  const router = useRouter();
  const { subCategories, loading, fetchSubCategories, deleteSubCategory } =
    useSubCategory();

  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetchSubCategories();
  }, [fetchSubCategories]);

  // Extract unique category names for dynamic filtering
  const categoryOptions = useMemo(() => {
    const categories = Array.from(
      new Set(
        subCategories
          .map((sc) => sc.CategoryName)
          .filter((name): name is string => Boolean(name))
      )
    );

    return [
      { value: "All", label: "All Categories" },
      ...categories.map((cat) => ({ value: cat, label: cat })),
    ];
  }, [subCategories]);

  // Filter Subcategories based on dropdown selections
  const filteredSubCategories = useMemo(
    () =>
      subCategories.filter((sc) => {
        const matchesStatus =
          statusFilter === "All" ||
          (sc.IsActive ? "Active" : "Inactive") === statusFilter;

        const matchesCategory =
          categoryFilter === "All" || sc.CategoryName === categoryFilter;

        return matchesStatus && matchesCategory;
      }),
    [subCategories, statusFilter, categoryFilter]
  );

  const columns: Column<ApiSubCategory>[] = [
    {
      key: "SubCategoryName",
      header: "Subcategory Name",
      className: "font-medium text-black",
      render: (sc) => (
        <div>
          <div>{sc.SubCategoryName}</div>
          {sc.SubCategoryNameNative && (
            <div className="text-xs text-slate-400">
              {sc.SubCategoryNameNative}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "CategoryName",
      header: "Parent Category",
      render: (sc) => sc.CategoryName || "-",
    },
    {
      key: "SubCategoryCode",
      header: "Code / Slug",
      render: (sc) => sc.SubCategoryCode || sc.SubCategorySlug || "-",
    },
    {
      key: "Description",
      header: "Description",
      render: (sc) => sc.Description || "-",
    },
    {
      key: "IsActive",
      header: "Status",
      render: (sc) => (
        <StatusCell
          status={sc.IsActive ? "Active" : "Inactive"}
          showIcon={false}
        />
      ),
    },
  ];

  return (
    <div>
      <DataTable<ApiSubCategory>
        title="Subcategories"
        description="Manage subcategories under parent categories"
        data={filteredSubCategories}
        columns={columns}
        searchKeys={[
          "SubCategoryName",
          "SubCategoryNameNative",
          "CategoryName",
          "SubCategoryCode",
          "SubCategorySlug",
          "Description",
        ]}
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
        addButtonLabel="Add Subcategory"
        onAdd={() => {
          localStorage.removeItem("tempSubCategoryData");
          router.push("/admin/subcategory/add");
        }}
        onEdit={(sc) => {
          localStorage.setItem("tempSubCategoryData", JSON.stringify(sc));
          router.push(`/admin/subcategory/add?id=${sc.SubCategoryID}`);
        }}
        onDelete={deleteSubCategory}
        getRowId={(sc) => sc.SubCategoryID || sc.SubCategoryName}
        showActions
      />
    </div>
  );
}