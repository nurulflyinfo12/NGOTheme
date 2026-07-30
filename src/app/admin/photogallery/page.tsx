"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { StatusCell, ImageCell } from "@/components/Admin/TableCells";

interface Gallery {
  id: string;
  title: string;
  cover: string | null;
  totalImages: number;
  status: "Active" | "Inactive";
}

const dummyGallery: Gallery[] = [
  {
    id: "1",
    title: "Industrial Training",
    cover: null,
    totalImages: 5,
    status: "Active",
  },
  {
    id: "2",
    title: "Robotics Workshop",
    cover: null,
    totalImages: 3,
    status: "Inactive",
  },
];

export default function AllGallery() {
  const router = useRouter();
  const [gallery, setGallery] = useState<Gallery[]>(dummyGallery);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredGallery = useMemo(
    () =>
      gallery.filter(
        (g) => statusFilter === "All" || g.status === statusFilter,
      ),
    [gallery, statusFilter],
  );

  const handleDelete = async (item: Gallery) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete "${item.title}" gallery?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e86958",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      setGallery((prev) => prev.filter((g) => g.id !== item.id));
      Swal.fire({
        title: "Deleted!",
        text: "Gallery removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const columns: Column<Gallery>[] = [
    { key: "title", header: "Title", className: "font-medium text-black" },
    {
      key: "cover",
      header: "Cover",
      render: (g) =>
        g.cover ? <ImageCell src={g.cover} alt={g.title} /> : null,
    },
    { key: "totalImages", header: "Images" },
    {
      key: "status",
      header: "Status",
      render: (g) => <StatusCell status={g.status} showIcon={false} />,
    },
  ];

  return (
    <div className="">
      <DataTable<Gallery>
        title="Photo Gallery"
        description="Manage gallery albums"
        data={filteredGallery}
        columns={columns}
        searchKeys={["title"]}
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
        addButtonLabel="Add Gallery"
        onAdd={() => router.push("/admin/photogallery/add")}
        onEdit={(g) => {
          localStorage.setItem("tempGalleryData", JSON.stringify(g));
          router.push(`/admin/photogallery/add?id=${g.id}`);
        }}
        onDelete={handleDelete}
        getRowId={(g) => g.id}
        showActions
      />
    </div>
  );
}
