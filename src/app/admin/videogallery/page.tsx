"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { StatusCell, ImageCell } from "@/components/Admin/TableCells";
import { useVideoGallery, ApiVideoGallery } from "@/hooks/useVideoGallery";

export default function AllVideos() {
  const router = useRouter();
  const { videos, fetchVideos } = useVideoGallery();
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const statusText = v.Status ? "Active" : "Inactive";
      return statusFilter === "All" || statusText === statusFilter;
    });
  }, [videos, statusFilter]);

  const columns: Column<ApiVideoGallery>[] = [
    {
      key: "VideoHeadline",
      header: "Title",
      className: "font-medium text-black",
      render: (v) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-800">{v.VideoHeadline}</span>
          {v.PublishedTime && (
            <span className="text-[10px] text-slate-400">
              Published: {v.PublishedTime}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "VideoImage",
      header: "Thumbnail",
      render: (v) =>
        v.VideoImage ? (
          <ImageCell src={v.VideoImage} alt={v.VideoHeadline} />
        ) : (
          <span className="text-slate-400 text-xs">No Thumbnail</span>
        ),
    },
    {
      key: "VideoLink",
      header: "Video Link",
      render: (v) => (
        <a
          href={v.VideoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-xs font-semibold underline truncate max-w-[200px] block"
        >
          View Video
        </a>
      ),
    },
    {
      key: "Status",
      header: "Status",
      render: (v) => (
        <StatusCell
          status={v.Status ? "Active" : "Inactive"}
          showIcon={false}
        />
      ),
    },
  ];

  return (
    <div>
      <DataTable<ApiVideoGallery>
        title="Video Gallery"
        description="Manage video contents"
        data={filteredVideos}
        columns={columns}
        searchKeys={["VideoHeadline", "VideoLink"]}
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
          router.push(`/admin/videogallery/add?id=${v.VideoID}`);
        }}
        getRowId={(v) => v.VideoID || String(Math.random())}
        showActions
      />
    </div>
  );
}