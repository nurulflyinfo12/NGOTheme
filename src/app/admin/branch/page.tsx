"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { useBranch, ApiBranch } from "@/hooks/useBranch";

export default function BranchList() {
  const router = useRouter();
  const { branches, loading, fetchBranches, deleteBranch } = useBranch();

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const columns: Column<ApiBranch>[] = [
    { key: "BranchName", header: "Branch Name", className: "font-medium text-black" },
    { key: "District", header: "District" },
    { key: "Upazilla", header: "Upazilla", render: (b) => b.Upazilla || "-" },
    { key: "Phone", header: "Phone" },
    { key: "Email", header: "Email", render: (b) => b.Email || "-" },
  ];

  return (
    <DataTable<ApiBranch>
      title="Our Branches"
      description="Manage all regional branch details"
      data={branches}
      columns={columns}
      searchKeys={["BranchName", "District", "Upazilla", "Phone", "Email"]}
      addButtonLabel="Add Branch"
      onAdd={() => router.push("/admin/branch/add")}
      onEdit={(b) => {
        const branchId = b.BranchID || "";
        localStorage.setItem("tempBranchData", JSON.stringify(b));
        router.push(`/admin/branch/add?id=${encodeURIComponent(branchId)}`);
      }}
      onDelete={deleteBranch}
      getRowId={(b) => b.BranchID || b.BranchName}
      showActions
    
    />
  );
}