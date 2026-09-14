"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { ImageCell } from "@/components/Admin/TableCells";
import {
  useHeroSection,
  ApiHeroSection,
  parseImageUrls,
} from "@/hooks/useHeroSection";

export default function AllHeroBanners() {
  const router = useRouter();
  const { heroSections, fetchHeroSections, deleteHeroSection } =
    useHeroSection();

  useEffect(() => {
    fetchHeroSections();
  }, [fetchHeroSections]);

  const columns: Column<ApiHeroSection>[] = [
    {
      key: "HeroTitle",
      header: "Title",
      className: "font-medium text-black",
      render: (b) => b.HeroTitle || "N/A",
    },
    {
      key: "HeroDetails",
      header: "Details",
      render: (b) => (
        <span className="text-gray-600 truncate max-w-xs block">
          {b.HeroDetails || "N/A"}
        </span>
      ),
    },
    {
      key: "Quote",
      header: "Quote",
      render: (b) => <span className="text-gray-600">{b.Quote || "N/A"}</span>,
    },
    {
      key: "ImageUrls",
      header: "Images",
      render: (b) => {
        const images = parseImageUrls(b.ImageUrls);
        if (images.length === 0) return <span className="text-gray-400">No Images</span>;

        return (
          <div className="flex items-center gap-2 flex-wrap max-w-xs">
            {images.map((imgUrl, idx) => (
              <ImageCell key={idx} src={imgUrl} alt={`${b.HeroTitle} ${idx + 1}`} />
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable<ApiHeroSection>
        title="Hero Banners"
        description="Manage all homepage hero banners"
        data={heroSections}
        columns={columns}
        searchKeys={["HeroTitle", "HeroDetails", "Quote"]}
        addButtonLabel="Add Hero Banner"
        onAdd={() => router.push("/admin/herobanner/add")}
        onEdit={(banner) => {
          localStorage.setItem("tempHeroBannerData", JSON.stringify(banner));
          router.push(`/admin/herobanner/add?id=${banner.HeroSectionID}`);
        }}
        onDelete={deleteHeroSection}
        getRowId={(b) => b.HeroSectionID || String(Math.random())}
        showActions
      />
    </div>
  );
}