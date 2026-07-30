"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import { Link } from "lucide-react";

const PRIMARY = "#f86048";
const API_KEY = "AIzaSyByOK5iRQzTDpnBW2W1AT51M_1DsHOcgmQ";
const CHANNEL_ID = "UCVs-LGCRL9Q2la3iuCuk4sw";

// Type definitions
interface YouTubeThumbnail {
  url: string;
  width?: number;
  height?: number;
}

interface YouTubeSnippet {
  title: string;
  description: string;
  publishedAt: string;
  channelTitle: string;
  thumbnails: {
    default: YouTubeThumbnail;
    medium: YouTubeThumbnail;
    high: YouTubeThumbnail;
  };
  resourceId: {
    videoId: string;
  };
}

interface YouTubeVideo {
  id: string;
  snippet: YouTubeSnippet;
}

interface YouTubeAPIResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface SelectedVideoType {
  id: string;
  title: string;
  embedUrl: string;
}

// Declare YT namespace for TypeScript
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function VideoGalleryPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiReady, setApiReady] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideoType | null>(
    null,
  );
  const playersRef = useRef<{ [key: string]: any }>({});

  // Get uploads playlist ID from channel ID
  const getUploadsPlaylistId = (channelId: string): string => {
    // For a channel ID, the uploads playlist ID is "UU" + channelId.substring(2)
    return `UU${channelId.substring(2)}`;
  };

  const PLAYLIST_ID = getUploadsPlaylistId(CHANNEL_ID);

  const fetchVideos = async (pageToken: string = ""): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=9&playlistId=${PLAYLIST_ID}&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ""}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data: YouTubeAPIResponse = await res.json();

      if (pageToken === "") {
        setVideos(data.items || []);
      } else {
        setVideos((prev: YouTubeVideo[]) => [...prev, ...(data.items || [])]);
      }

      setNextPageToken(data.nextPageToken || "");
    } catch (err) {
      setError("Unable to load videos. Please try again later.");
      console.error("YouTube API Error:", err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    if (typeof window !== "undefined" && !window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = () => {
        setApiReady(true);
      };
    } else if (typeof window !== "undefined" && window.YT) {
      setApiReady(true);
    }
  }, []);

  // Initialize players when videos load and API is ready
  useEffect(() => {
    if (apiReady && videos.length > 0 && typeof window !== "undefined") {
      setTimeout(() => {
        videos.forEach((video) => {
          const videoId = video.snippet.resourceId.videoId;
          const elementId = `player-${videoId}`;
          const element = document.getElementById(elementId);

          if (!playersRef.current[videoId] && element && window.YT) {
            try {
              playersRef.current[videoId] = new window.YT.Player(elementId, {
                videoId: videoId,
                playerVars: {
                  controls: 1,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                },
                events: {
                  onReady: () => {
                    console.log(`Player ${videoId} ready`);
                  },
                  onStateChange: (event: { data: number }) => {
                    if (event.data === window.YT.PlayerState.PLAYING) {
                      pauseAllOtherVideos(videoId);
                    }
                  },
                },
              });
            } catch (err) {
              console.error(`Error initializing player for ${videoId}:`, err);
            }
          }
        });
      }, 100);
    }
  }, [apiReady, videos]);

  const pauseAllOtherVideos = (currentVideoId: string): void => {
    Object.keys(playersRef.current).forEach((videoId) => {
      if (videoId !== currentVideoId) {
        const player = playersRef.current[videoId];
        if (player && player.pauseVideo) {
          player.pauseVideo();
        }
      }
    });
  };

  const pauseAllVideos = (): void => {
    Object.keys(playersRef.current).forEach((videoId) => {
      const player = playersRef.current[videoId];
      if (player && player.pauseVideo) {
        player.pauseVideo();
      }
    });
  };

  const openVideoModal = (video: YouTubeVideo): void => {
    const videoId = video.snippet.resourceId.videoId;
    pauseAllVideos();
    setSelectedVideo({
      id: videoId,
      title: video.snippet.title,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    });
  };

  const loadMoreVideos = (): void => {
    if (nextPageToken) {
      fetchVideos(nextPageToken);
    }
  };

  const getThumbnailUrl = (video: YouTubeVideo): string => {
    const thumbs = video.snippet.thumbnails;
    return thumbs.high?.url || thumbs.medium?.url || thumbs.default?.url || "";
  };

  return (
    <DanboxLayout header={1}>
      <PageBanner pageName="Video Gallery" pageTitle="Stories of Impact" />

      <section className="py-24 lg:py-32 bg-white dark:bg-[#0f172a]! overflow-hidden relative">
        <div className="container mx-auto px-6 lg:max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start xl:items-end mb-20! gap-10">
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
                ></div>
                <span
                  className="font-black uppercase tracking-[0.3em] text-xs"
                  style={{ color: PRIMARY }}
                >
                  YouTube Channel
                </span>
              </motion.div>
              <h2 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white! leading-[0.9] tracking-tighter!">
                Documenting Our <br /> Mission in Motion
                <span style={{ color: PRIMARY }}>.</span>
              </h2>
            </div>

            {/* subscribe part */}
            {/* <div className="flex items-center gap-4">
              <a
                href={`https://www.youtube.com/channel/${CHANNEL_ID}?sub_confirmation=1`}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-3 rounded-full bg-[#f86048] hover:bg-[#e04a32] text-white font-black uppercase tracking-wide text-xs transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.97]"
              >
                <i className="fab fa-youtube text-xl group-hover:scale-110 transition-transform"></i>
                SUBSCRIBE
              </a>
            </div> */}
          </div>

          {initialLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#f86048] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium">
                Loading videos...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">😢</div>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                {error}
              </p>
              <button
                onClick={() => fetchVideos("")}
                className="mt-6 px-8 py-3 bg-[#f86048] text-white rounded-full font-bold hover:bg-[#e04a32] transition-colors"
              >
                Retry
              </button>
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📺</div>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No videos found on this channel.
              </p>
            </div>
          ) : (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                <AnimatePresence mode="popLayout">
                  {videos.map((video: YouTubeVideo, idx: number) => {
                    const videoId = video.snippet.resourceId.videoId;
                    const thumbUrl = getThumbnailUrl(video);

                    return (
                      <motion.div
                        key={videoId}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className="group relative bg-white dark:bg-slate-800! rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700! hover:-translate-y-2 transition-transform duration-500"
                      >
                        <div className="relative aspect-video overflow-hidden cursor-pointer">
                          <img
                            src={thumbUrl}
                            alt={video.snippet.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            onClick={() => openVideoModal(video)}
                          />

                          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/60 transition-colors flex items-center justify-center">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openVideoModal(video)}
                              className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 text-white cursor-pointer transition-all duration-300 group-hover:bg-[#f86048] group-hover:border-[#f86048]"
                            >
                              <i className="fas fa-play text-xl ml-1"></i>
                            </motion.div>
                          </div>

                          <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white text-[10px] font-black px-3 py-1.5 rounded-md tracking-widest! backdrop-blur-sm">
                            {new Date(
                              video.snippet.publishedAt,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>

                        <div className="p-8">
                          <h4 className="text-xl font-black text-slate-900 dark:text-white! leading-tight! mb-4! line-clamp-2 group-hover:text-[#f86048] transition-colors">
                            {video.snippet.title}
                          </h4>
                          <p className="text-slate-500 dark:text-slate-400! text-sm leading-relaxed line-clamp-2 mb-4">
                            {video.snippet.description ||
                              "Watch this video on our YouTube channel"}
                          </p>
                          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-widest!">
                            <span>
                              <i
                                className="far fa-calendar-alt mr-2"
                                style={{ color: PRIMARY }}
                              ></i>
                              {new Date(
                                video.snippet.publishedAt,
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <a
                              href={`https://www.youtube.com/watch?v=${videoId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 text-[#f86048]!"
                            >
                              Watch{" "}
                              <i className="fas fa-external-link-alt text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {nextPageToken && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center mt-16"
                >
                  <button
                    onClick={loadMoreVideos}
                    disabled={loading}
                    className="px-12 py-4 rounded-full bg-white dark:bg-slate-800! text-slate-900 dark:text-white! import {GetStaticPaths,GetStaticProps} from 'next';
                    
                    const page = () => {
                      return (
                        <div>
                          Enter
                        </div>
                      );
                    }
                    
                    export const getStaticPaths:GetStaticPaths = async () => {
                    
                    
                      return {
                        paths:[],
                        fallback:false
                      }
                    }
                    export const getStaticProps:GetStaticProps = async (ctx) => {
                    
                    
                      return {
                        props:{
                          data:null
                        }
                      }
                    }
                    
                    export default page; font-black uppercase tracking-widest text-xs transition-all hover:bg-[#f86048]! hover:text-white! hover:scale-105 shadow-xl flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-slate-200 dark:border-slate-700"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#f86048] border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-plus-circle text-base"></i>
                        <span className="">Load More</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>

        <div className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] dark:opacity-[0.05] hidden lg:block">
          <h1 className="text-[20rem] font-black leading-none uppercase tracking-tighter">
            Media
          </h1>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-5xl lg:mt-16"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute -top-12 right-0 text-white hover:text-[#f86048] transition-colors text-2xl"
                >
                  <i className="fas fa-times"></i>
                </button>
                <div className="relative pt-[56.25%] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src={`${selectedVideo.embedUrl}?autoplay=1&rel=0`}
                    title={selectedVideo.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3 className="text-white text-xl font-bold mt-4">
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
