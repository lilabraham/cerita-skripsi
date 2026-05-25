"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { videoData } from "@/data/video-data";
import { cn } from "@/lib/utils";

export default function VideoPage() {
  // State untuk menyimpan video mana yang sedang diputar
  const [activeVideo, setActiveVideo] = useState(videoData[0]);

  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-24 pb-16 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
            Galeri{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-teal-500 dark:from-indigo-400 dark:to-teal-400 bg-clip-text text-transparent">
              Video Edukasi
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] transition-colors">
            Tonton seri video singkat untuk pemahaman visual yang lebih baik.
          </p>
        </div>

        {/* Layout Utama: Player di Kiri, Daftar Video di Kanan (Desktop) */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Video Player */}
          <div className="flex-1">
            {/* Catatan: wrapper video tetap bg-black demi kontras optimal untuk video player */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-black shadow-lg dark:shadow-2xl mb-6 transition-colors">
              <LiteYouTubeEmbed
                id={activeVideo.youtubeId}
                title={activeVideo.title}
                wrapperClass="yt-lite"
                playerClass="play-btn"
                adNetwork={false}
              />
            </div>
            <div className="px-2">
              <span className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 rounded-full text-xs font-medium mb-3 transition-colors">
                {activeVideo.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2 transition-colors">
                {activeVideo.title}
              </h2>
            </div>
          </div>

          {/* Video Playlist */}
          <div className="lg:w-96 flex flex-col gap-4">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-2 transition-colors">
              Daftar Video
            </h3>
            <div className="flex flex-col gap-3">
              {videoData.map((video) => {
                const isActive = activeVideo.id === video.id;

                return (
                  <button
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-300",
                      isActive
                        ? "bg-indigo-50 dark:bg-white/10 border-indigo-300 dark:border-indigo-500/30"
                        : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 shadow-sm dark:shadow-none"
                    )}
                  >
                    {/* Thumbnail Sederhana */}
                    <div className="relative w-28 h-16 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0 border border-gray-300 dark:border-white/10 flex items-center justify-center transition-colors">
                      <PlayCircle
                        size={24}
                        className={
                          isActive
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-gray-400 dark:text-gray-500"
                        }
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/20 animate-pulse" />
                      )}
                    </div>

                    {/* Info Text */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className={cn(
                          "font-medium text-sm line-clamp-2 mb-1 leading-snug transition-colors",
                          isActive
                            ? "text-indigo-900 dark:text-white"
                            : "text-gray-600 dark:text-gray-300"
                        )}
                      >
                        {video.title}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors">
                        {video.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}