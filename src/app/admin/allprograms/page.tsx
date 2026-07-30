"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
// import DataTable, { Column } from "@/app/components/Admin/DataTable";
import { StatusCell, ImageCell } from "@/components/Admin/TableCells";
import DataTable, { Column } from "@/components/Admin/DataTable";

// ---------------------------
// Dummy Data for Programs
// ---------------------------
interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string | null;
  status: "Active" | "Inactive";
}

const dummyPrograms: Program[] = [
  {
    id: "1",
    title: "PLC Automation Basics",
    description: "Learn the fundamentals of PLC programming.",
    category: "Automation",
    thumbnail: null,
    status: "Active",
  },
  {
    id: "2",
    title: "Advanced Robotics",
    description: "Robotics programming and integration techniques.",
    category: "Robotics",
    thumbnail: null,
    status: "Inactive",
  },
  {
    id: "3",
    title: "IoT for Industry",
    description: "Internet of Things applications in industrial settings.",
    category: "IoT",
    thumbnail: null,
    status: "Active",
  },
];

// ---------------------------
// AllPrograms Component
// ---------------------------
export default function AllPrograms() {
  const router = useRouter();
  const [programs, setPrograms] = useState<Program[]>(dummyPrograms);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPrograms = useMemo(
    () =>
      programs.filter(
        (program) => statusFilter === "All" || program.status === statusFilter,
      ),
    [programs, statusFilter],
  );

  const handleDelete = async (program: Program) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${program.title}". This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e86958",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setPrograms((prev) => prev.filter((p) => p.id !== program.id));
      Swal.fire({
        title: "Deleted!",
        text: "Program has been removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Table Columns
  const columns: Column<Program>[] = [
    { key: "title", header: "Title", className: "font-medium text-black" },
    {
      key: "description",
      header: "Description",
      render: (p) => <span className="text-gray-600">{p.description}</span>,
    },
    { key: "category", header: "Category" },
    {
      key: "thumbnail",
      header: "Thumbnail",
      render: (p) =>
        p.thumbnail ? <ImageCell src={p.thumbnail} alt={p.title} /> : null,
    },
    {
      key: "status",
      header: "Status",
      render: (p) => <StatusCell status={p.status} showIcon={false} />,
    },
  ];

  return (
    <div className="">
      <DataTable<Program>
        title="All Programs"
        description="Manage all your training programs"
        data={filteredPrograms}
        columns={columns}
        searchKeys={["title", "description", "category"]}
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
        addButtonLabel="Add Program"
        onAdd={() => router.push("/admin/allprograms/add")}
        onEdit={(program) => router.push(`/admin/allprograms/add?id=${program.id}`)}
        onDelete={handleDelete}
        getRowId={(p) => p.id}
        showActions
      />
    </div>
  );
}
