"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { StatusCell, ImageCell } from "@/components/Admin/TableCells";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string | null;
  status: "Active" | "Inactive";
}

const dummyBlogs: Blog[] = [
  {
    id: "1",
    title: "Introduction to Industrial Automation",
    excerpt: "Learn the basics of automation and PLC programming.",
    category: "Automation",
    image: null,
    status: "Active",
  },
  {
    id: "2",
    title: "Robotics in Manufacturing",
    excerpt: "Advanced robotics applications in modern factories.",
    category: "Robotics",
    image: null,
    status: "Inactive",
  },
  {
    id: "3",
    title: "IoT for Smart Industry",
    excerpt: "Integrating IoT solutions into industrial systems.",
    category: "IoT",
    image: null,
    status: "Active",
  },
];

export default function AllBlogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>(dummyBlogs);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBlogs = useMemo(
    () =>
      blogs.filter(
        (blog) => statusFilter === "All" || blog.status === statusFilter,
      ),
    [blogs, statusFilter],
  );

  const handleDelete = async (blog: Blog) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${blog.title}". This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e86958",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
      Swal.fire({
        title: "Deleted!",
        text: "Blog has been removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const columns: Column<Blog>[] = [
    { key: "title", header: "Title", className: "font-medium text-black" },
    {
      key: "excerpt",
      header: "Excerpt",
      render: (b) => <span className="text-gray-600">{b.excerpt}</span>,
    },
    { key: "category", header: "Category" },
    {
      key: "image",
      header: "Image",
      render: (b) =>
        b.image ? <ImageCell src={b.image} alt={b.title} /> : null,
    },
    {
      key: "status",
      header: "Status",
      render: (b) => <StatusCell status={b.status} showIcon={false} />,
    },
  ];

  return (
    <div className="">
      <DataTable<Blog>
        title="All Blogs"
        description="Manage all your blogs and articles"
        data={filteredBlogs}
        columns={columns}
        searchKeys={["title", "excerpt", "category"]}
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
        addButtonLabel="Add Blog"
        onAdd={() => router.push("/admin/blogs/add")}
        onEdit={(blog) => router.push(`/admin/blogs/add?id=${blog.id}`)}
        onDelete={handleDelete}
        getRowId={(b) => b.id}
        showActions
      />
    </div>
  );
}
