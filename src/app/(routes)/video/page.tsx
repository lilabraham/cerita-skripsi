"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { videoData } from "@/data/video-data";
import { cn } from "@/lib/utils";

export default function VideoPage() {
  const [activeVideo, setActiveVideo] = useState(videoData[0]);

  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-24 pb-16 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tight leading-none mb-2">
            Galeri{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-teal-500 dark:from-indigo-400 dark:to-teal-400 bg-clip-text text-transparent">
              Video Edukasi
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] font-medium">
            Tonton seri video singkat untuk pemahaman visual yang lebih baik.
          </p>
        </div>

        {/* Layout Utama */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Video Player */}
          <div className="flex-1">
            {/* Video wrapper tetap bg-black untuk kontras optimal */}
            <div className="rounded-2xl overflow-hidden border-4 border-black dark:border-white bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] mb-6">
              <LiteYouTubeEmbed
                id={activeVideo.youtubeId}
                title={activeVideo.title}
                wrapperClass="yt-lite"
                playerClass="play-btn"
                adNetwork={false}
              />
            </div>
            <div className="px-2">
              <span className="inline-block px-4 py-1.5 border-2 border-black dark:border-white bg-yellow-300 text-black rounded-full text-xs font-black uppercase tracking-widest mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)]">
                {activeVideo.category}
              </span>
              <h2 className="text-2xl font-black text-black dark:text-white leading-tight uppercase tracking-tight">
                {activeVideo.title}
              </h2>
            </div>
          </div>

          {/* Video Playlist */}
          <div className="lg:w-96 flex flex-col gap-4">
            <h3 className="text-black dark:text-white font-black uppercase tracking-tight mb-1">
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
                      "flex items-start gap-4 p-4 rounded-xl border-2 border-black dark:border-white text-left transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
                      isActive
                        ? "bg-yellow-300 text-black"
                        : "bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-pink-300 dark:hover:bg-pink-400 hover:text-black"
                    )}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-28 h-16 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0 border-2 border-black dark:border-white flex items-center justify-center">
                      <PlayCircle
                        size={24}
                        className={isActive ? "text-black" : "text-gray-500 dark:text-gray-500"}
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-yellow-400/30 animate-pulse" />
                      )}
                    </div>

                    {/* Info Text */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className={cn(
                          "font-bold text-sm line-clamp-2 mb-1 leading-snug",
                          isActive ? "text-black" : "text-gray-700 dark:text-gray-300"
                        )}
                      >
                        {video.title}
                      </h4>
                      <span className={cn(
                        "text-xs font-medium",
                        isActive ? "text-black/70" : "text-gray-500 dark:text-gray-500"
                      )}>
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