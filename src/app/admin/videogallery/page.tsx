"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { StatusCell, ImageCell } from "@/components/Admin/TableCells";

interface Video {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string | null;
  platform: "YouTube" | "Vimeo" | "Custom";
  status: "Active" | "Inactive";
}

const dummyVideos: Video[] = [
  {
    id: "1",
    title: "PLC Training Intro",
    videoUrl: "https://youtube.com/watch?v=abc123",
    thumbnail: null,
    platform: "YouTube",
    status: "Active",
  },
  {
    id: "2",
    title: "Robotics Demo",
    videoUrl: "https://vimeo.com/123456",
    thumbnail: null,
    platform: "Vimeo",
    status: "Inactive",
  },
];

export default function AllVideos() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>(dummyVideos);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredVideos = useMemo(
    () =>
      videos.filter(
        (v) => statusFilter === "All" || v.status === statusFilter
      ),
    [videos, statusFilter]
  );

  const handleDelete = async (video: Video) => {
    const result = await Swal.fire({
      title: "Delete Video?",
      text: `Delete "${video.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e86958",
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      setVideos((prev) => prev.filter((v) => v.id !== video.id));
      Swal.fire("Deleted!", "", "success");
    }
  };

  const columns: Column<Video>[] = [
    { key: "title", header: "Title", className: "font-medium text-black" },
    {
      key: "thumbnail",
      header: "Thumbnail",
      render: (v) =>
        v.thumbnail ? <ImageCell src={v.thumbnail} alt={v.title} /> : null,
    },
    { key: "platform", header: "Platform" },
    {
      key: "videoUrl",
      header: "Video",
      render: (v) => (
        <a
          href={v.videoUrl}
          target="_blank"
          className="text-blue-600 text-xs underline"
        >
          View
        </a>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (v) => <StatusCell status={v.status} showIcon={false} />,
    },
  ];

  return (
    <div className="">
      <DataTable<Video>
        title="Video Gallery"
        description="Manage video contents"
        data={filteredVideos}
        columns={columns}
        searchKeys={["title", "platform"]}
        filters={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "All", label: "All" },
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ],
            value: statusFilter,
            onChange: setStatusFilter,
          },
        ]}
        addButtonLabel="Add Video"
        onAdd={() => router.push("/admin/videogallery/add")}
        onEdit={(v) => {
          localStorage.setItem("tempVideoData", JSON.stringify(v));
          router.push(`/admin/videogallery/add?id=${v.id}`);
        }}
        onDelete={handleDelete}
        getRowId={(v) => v.id}
        showActions
      />
    </div>
  );
}