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
    <main className="min-h-screen bg-[#0a0a0f] pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Galeri <span className="bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">Video Edukasi</span>
          </h1>
          <p className="text-gray-400">
            Tonton seri video singkat untuk pemahaman visual yang lebih baik.
          </p>
        </div>

        {/* Layout Utama: Player di Kiri, Daftar Video di Kanan (Desktop) */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Video Player */}
          <div className="flex-1">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl mb-6">
              <LiteYouTubeEmbed
                id={activeVideo.youtubeId}
                title={activeVideo.title}
                wrapperClass="yt-lite"
                playerClass="play-btn"
                adNetwork={false}
              />
            </div>
            <div className="px-2">
              <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-medium mb-3">
                {activeVideo.category}
              </span>
              <h2 className="text-2xl font-bold text-white leading-tight mb-2">
                {activeVideo.title}
              </h2>
            </div>
          </div>

          {/* Video Playlist */}
          <div className="lg:w-96 flex flex-col gap-4">
            <h3 className="text-white font-semibold mb-2">Daftar Video</h3>
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
                        ? "bg-white/10 border-indigo-500/30" 
                        : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    {/* Thumbnail Sederhana */}
                    <div className="relative w-28 h-16 rounded-md overflow-hidden bg-gray-800 shrink-0 border border-white/10 flex items-center justify-center">
                      <PlayCircle size={24} className={isActive ? "text-indigo-400" : "text-gray-500"} />
                      {isActive && (
                        <div className="absolute inset-0 bg-indigo-500/20 animate-pulse" />
                      )}
                    </div>
                    
                    {/* Info Text */}
                    <div className="flex-1 min-w-0">
                      <h4 className={cn(
                        "font-medium text-sm line-clamp-2 mb-1 leading-snug",
                        isActive ? "text-white" : "text-gray-300"
                      )}>
                        {video.title}
                      </h4>
                      <span className="text-xs text-gray-500">
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