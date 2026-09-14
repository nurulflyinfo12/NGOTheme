"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { StatusCell, ImageCell } from "@/components/Admin/TableCells";
import { usePhotoGallery, ApiPhotoGallery } from "@/hooks/usePhotoGallery";

export default function AllGallery() {
  const router = useRouter();
  const { galleries, fetchGalleries } = usePhotoGallery();
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchGalleries();
  }, [fetchGalleries]);

  const filteredGallery = useMemo(() => {
    return galleries.filter((g) => {
      const statusText = g.Status ? "Active" : "Inactive";
      return statusFilter === "All" || statusText === statusFilter;
    });
  }, [galleries, statusFilter]);

  const columns: Column<ApiPhotoGallery>[] = [
    {
      key: "GalleryTitle",
      header: "Title",
      className: "font-medium text-black",
      render: (g) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-800">{g.GalleryTitle}</span>
          {g.PublishedDate && (
            <span className="text-[10px] text-slate-400">
              Published: {g.PublishedDate}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "Photos",
      header: "Cover",
      render: (g) => {
        const coverUrl =
          Array.isArray(g.Photos) && g.Photos.length > 0
            ? g.Photos[0].PhotoUrl
            : null;

        return coverUrl ? (
          <ImageCell src={coverUrl} alt={g.GalleryTitle || "Gallery Cover"} />
        ) : (
          <span className="text-slate-400 text-xs">No Cover</span>
        );
      },
    },
    {
      key: "CategoryID",
      header: "Total Images",
      render: (g) => (
        <span className="font-semibold text-slate-700">
          {Array.isArray(g.Photos) ? g.Photos.length : 0}
        </span>
      ),
    },
    {
      key: "Status",
      header: "Status",
      render: (g) => (
        <StatusCell
          status={g.Status ? "Active" : "Inactive"}
          showIcon={false}
        />
      ),
    },
  ];

  return (
    <div>
      <DataTable<ApiPhotoGallery>
        title="Photo Gallery"
        description="Manage gallery albums"
        data={filteredGallery}
        columns={columns}
        searchKeys={["GalleryTitle"]}
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
          router.push(`/admin/photogallery/add?id=${g.PhotoGalleryID}`);
        }}
        getRowId={(g) => g.PhotoGalleryID || String(Math.random())}
        showActions
      />
    </div>
  );
}