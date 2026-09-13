"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import { useVideoGallery, ApiVideoGallery } from "@/hooks/useVideoGallery";
import { api } from "@/utility/api";

const PRIMARY = "#f86048";

interface SelectedVideoType {
  id: string;
  title: string;
  embedUrl: string;
}

// Utility to extract YouTube Video ID from any YouTube URL format
const getYouTubeId = (url: string): string => {
  if (!url) return "";
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
};

export default function VideoGalleryPage() {
  const { videos, loading, error, fetchVideos } = useVideoGallery();
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideoType | null>(
    null,
  );

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const openVideoModal = (video: ApiVideoGallery): void => {
    const videoId = getYouTubeId(video.VideoLink);
    const embedUrl = videoId
      ? `https://www.youtube.com/embed/${videoId}`
      : video.VideoLink;

    setSelectedVideo({
      id: video.VideoID || videoId,
      title: video.VideoHeadline,
      embedUrl: embedUrl,
    });
  };

  const getThumbnailUrl = (video: ApiVideoGallery): string => {
    if (video.VideoImage) {
      if (video.VideoImage.startsWith("http")) return video.VideoImage;
      return api.getFileUrl(video.VideoImage);
    }
    const videoId = getYouTubeId(video.VideoLink);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return "/assets/img/factbg.webp";
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) return dateStr;
    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <DanboxLayout header={1}>
      <PageBanner pageName="Video Gallery" pageTitle="Stories of Impact" />

      <section className="py-24 lg:py-32 bg-white dark:bg-[#0f172a] overflow-hidden relative">
        <div className="container mx-auto px-6 lg:max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start xl:items-end mb-16 gap-10">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-4"
              >
                <div
                  className="w-12 h-[2px]"
                  style={{ backgroundColor: PRIMARY }}
                />
                <span
                  className="font-black uppercase tracking-[0.3em] text-xs"
                  style={{ color: PRIMARY }}
                >
                  Video Gallery
                </span>
              </motion.div>
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[0.95] tracking-tight">
                Documenting Our <br /> Mission in Motion
                <span style={{ color: PRIMARY }}>.</span>
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div
                className="w-14 h-14 border-4 border-t-transparent rounded-full animate-spin"
                style={{
                  borderColor: `${PRIMARY} transparent ${PRIMARY} ${PRIMARY}`,
                }}
              />
              <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium text-sm">
                Loading videos...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">😢</div>
              <p className="text-slate-600 dark:text-slate-400 text-base mb-6">
                {error}
              </p>
              <button
                onClick={() => fetchVideos()}
                className="px-8 py-3 bg-[#f86048] text-white rounded-full font-bold hover:bg-[#e04a32] transition-colors text-xs uppercase tracking-wider"
              >
                Retry Loading
              </button>
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📺</div>
              <p className="text-slate-600 dark:text-slate-400 text-base">
                No videos available in the gallery.
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {videos.map((video: ApiVideoGallery, idx: number) => {
                  const thumbUrl = getThumbnailUrl(video);
                  const videoId = getYouTubeId(video.VideoLink);

                  return (
                    <motion.div
                      key={video.VideoID || idx}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="group relative bg-white dark:bg-slate-900/60 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-800 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                    >
                      <div
                        className="relative aspect-video overflow-hidden cursor-pointer bg-slate-900"
                        onClick={() => openVideoModal(video)}
                      >
                        <img
                          src={thumbUrl}
                          alt={video.VideoHeadline}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/60 transition-colors flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 text-white transition-all duration-300 group-hover:bg-[#f86048] group-hover:border-[#f86048]"
                          >
                            <i className="fas fa-play text-lg ml-1"></i>
                          </motion.div>
                        </div>

                        {video.PublishedTime && (
                          <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider backdrop-blur-sm">
                            {formatDate(video.PublishedTime)}
                          </div>
                        )}
                      </div>

                      {/* Video Title & Links */}
                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <h4 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug mb-3 line-clamp-2 group-hover:text-[#f86048] transition-colors">
                            {video.VideoHeadline}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                          <span>
                            <i
                              className="far fa-calendar-alt mr-1.5"
                              style={{ color: PRIMARY }}
                            />
                            {formatDate(video.PublishedTime) || "Recent"}
                          </span>

                          {video.VideoLink && (
                            <a
                              href={video.VideoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[#f86048] hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              YouTube{" "}
                              <i className="fas fa-external-link-alt text-[10px]" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-2 mt-20 sm:p-6"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute -top-10 right-0 text-white hover:text-[#f86048] transition-colors text-xl font-bold"
                >
                  <i className="fas fa-times" />
                </button>

                <div className="relative pt-[56.25%] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                  <iframe
                    src={`${selectedVideo.embedUrl}?autoplay=1&rel=0`}
                    title={selectedVideo.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-white text-lg font-bold mt-4">
                  {selectedVideo.title}
                </h3>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </DanboxLayout>
  );
}
