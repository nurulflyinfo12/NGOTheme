"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { ImageCell, StatusCell } from "@/components/Admin/TableCells";

// ---------------------------
// Hero Banner Type
// ---------------------------
interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  status: "Active" | "Inactive";
  link?: string;
}

// ---------------------------
// Dummy Data
// ---------------------------
const dummyHeroBanners: HeroBanner[] = [
  {
    id: "1",
    title: "Welcome to Our Platform",
    subtitle: "Best automation courses online",
    image: "/images/hero1.jpg",
    status: "Active",
    link: "/programs",
  },
  {
    id: "2",
    title: "Advance Your Skills",
    subtitle: "Robotics and IoT training",
    image: "/images/hero2.jpg",
    status: "Inactive",
    link: "/programs/robotics",
  },
  {
    id: "3",
    title: "Industrial IoT Solutions",
    subtitle: "Learn IoT for Industry 4.0",
    image: "/images/hero3.jpg",
    status: "Active",
    link: "/programs/iot",
  },
];

// ---------------------------
// AllHeroBanners Component
// ---------------------------
export default function AllHeroBanners() {
  const router = useRouter();
  const [banners, setBanners] = useState<HeroBanner[]>(dummyHeroBanners);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBanners = useMemo(
    () =>
      banners.filter(
        (b) => statusFilter === "All" || b.status === statusFilter,
      ),
    [banners, statusFilter],
  );

  const handleDelete = async (banner: HeroBanner) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${banner.title}". This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e86958",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setBanners((prev) => prev.filter((b) => b.id !== banner.id));
      Swal.fire({
        title: "Deleted!",
        text: "Hero banner has been removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Table Columns
  const columns: Column<HeroBanner>[] = [
    { key: "title", header: "Title", className: "font-medium text-black" },
    {
      key: "subtitle",
      header: "Subtitle",
      render: (b) => <span className="text-gray-600">{b.subtitle}</span>,
    },
    {
      key: "image",
      header: "Image",
      render: (b) =>
        b.image ? <ImageCell src={b.image} alt={b.title} /> : null,
    },
    { key: "link", header: "Link" },
    {
      key: "status",
      header: "Status",
      render: (b) => <StatusCell status={b.status} showIcon={false} />,
    },
  ];

  return (
    <div className="">
      <DataTable<HeroBanner>
        title="Hero Banners"
        description="Manage all hero banners on the homepage"
        data={filteredBanners}
        columns={columns}
        searchKeys={["title", "subtitle", "link"]}
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
        addButtonLabel="Add Hero Banner"
        onAdd={() => router.push("/admin/herobanner/add")}
        onEdit={(banner) =>
          router.push(`/admin/herobanner/add?id=${banner.id}`)
        }
        onDelete={handleDelete}
        getRowId={(b) => b.id}
        showActions
      />
    </div>
  );
}
