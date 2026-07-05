"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────
const VIDEO = {
  embedUrl: "https://www.youtube.com/embed/zyrk89I6s-E",
  title: "KENALI, CEGAH, LAWAN: Fakta HIV/AIDS yang Wajib Kamu Tahu",
  description:
    "Video ini membahas fakta-fakta penting seputar HIV/AIDS yang sering disalahpahami oleh remaja. Mulai dari cara penularan yang benar, mitos-mitos berbahaya, pentingnya deteksi dini, hingga bagaimana kita bisa hidup bebas stigma bersama. Karena pengetahuan adalah pertahanan terkuat kita.",
  tags: ["#EdukasiRemaja", "#BebasStigma", "#KesehatanSeksual", "#CegahHIV", "#CERITA2026"],
  duration: "04:39",
  category: "Kesehatan & Reproduksi",
};

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
  },
});

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// ─── Decorative dot cluster ───────────────────────────────────────────────────
function DotCluster({ color = "#FF2D78" }: { color?: string }) {
  return (
    <div className="flex gap-1.5 items-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full border-2 border-black dark:border-white"
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Scanline overlay ─────────────────────────────────────────────────────────
function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 rounded-2xl overflow-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
      }}
    />
  );
}

// ─── TV Badge ─────────────────────────────────────────────────────────────────
function RotatedBadge({ text, bg = "#FFE600" }: { text: string; bg?: string }) {
  return (
    <motion.div
      className="absolute -top-4 -right-4 z-20 rotate-6"
      whileHover={{ rotate: 12, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div
        className="px-4 py-1.5 border-2 border-black text-black text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        style={{ backgroundColor: bg, borderRadius: "4px" }}
      >
        {text}
      </div>
    </motion.div>
  );
}

// ─── Tag Badge ────────────────────────────────────────────────────────────────
function Tag({ label, index }: { label: string; index: number }) {
  const colors = ["#FF2D78", "#FFE600", "#00F0FF", "#B8FF3C", "#FF6B00"];
  const bg = colors[index % colors.length];
  return (
    <motion.span
      className="inline-block px-3 py-1 border-2 border-black text-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-default"
      style={{ backgroundColor: bg, borderRadius: "4px" }}
      whileHover={{ y: -3, rotate: [-1, 1][index % 2], transition: { type: "spring", stiffness: 500 } }}
    >
      {label}
    </motion.span>
  );
}

// ─── Stat Pill ────────────────────────────────────────────────────────────────
function StatPill({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.5)]" style={{ borderRadius: "8px" }}>
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-black text-black dark:text-white leading-none">{value}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function VideoPage() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  // Magnetic hover for TV frame
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(springY, [-200, 200], [3, -3]);
  const rotateY = useTransform(springX, [-300, 300], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <main
      className="min-h-screen bg-[#F5F0E8] dark:bg-[#0D0D0D] pt-24 pb-20 px-4 sm:px-6 overflow-hidden"
      suppressHydrationWarning
    >
      {/* ── Background texture dots ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Floating accent blobs ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, #FF2D78 0%, transparent 70%)" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed bottom-20 left-0 w-72 h-72 rounded-full blur-3xl opacity-15"
        style={{ background: "radial-gradient(circle, #00F0FF 0%, transparent 70%)" }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div ref={containerRef} className="max-w-5xl mx-auto relative z-10">

        {/* ════════════════════════════════════════════════
            HEADER
        ════════════════════════════════════════════════ */}
        <motion.header
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 text-center"
        >
          {/* Top pill */}
          <motion.div variants={fadeUp(0)} className="inline-flex items-center gap-2 mb-5">
            <div className="flex gap-1">
              {["#FF2D78", "#FFE600", "#00F0FF"].map((c) => (
                <div key={c} className="w-2.5 h-2.5 rounded-full border border-black dark:border-white" style={{ backgroundColor: c }} />
              ))}
            </div>
            <span className="px-4 py-1 border-2 border-black dark:border-white bg-[#FF2D78] text-white text-xs font-black uppercase tracking-[0.25em] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.6)]" style={{ borderRadius: "4px" }}>
              {VIDEO.category}
            </span>
          </motion.div>

          {/* Giant title */}
          <motion.h1
            variants={fadeUp(0.1)}
            className="text-5xl sm:text-7xl md:text-[88px] font-black uppercase leading-[0.9] tracking-tighter text-black dark:text-white mb-4"
            style={{ WebkitTextStroke: "2px black" }}
          >
            <span className="dark:[WebkitTextStroke:2px_white]">VIDEO</span>
            <br />
            <span
              className="relative inline-block"
              style={{
                color: "#FF2D78",
                WebkitTextStroke: "2px black",
                paintOrder: "stroke fill",
              }}
            >
              EDUKASI
              {/* Underline bar */}
              <motion.span
                className="absolute -bottom-1 left-0 h-3 bg-[#FFE600] border-2 border-black"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left", width: "100%", zIndex: -1 }}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp(0.2)}
            className="text-base sm:text-lg font-semibold text-black/60 dark:text-white/50 max-w-xl mx-auto leading-relaxed"
          >
            Satu video. Satu langkah menuju pemahaman yang lebih baik.
          </motion.p>
        </motion.header>

        {/* ════════════════════════════════════════════════
            BRUTALIST TV FRAME
        ════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-10"
        >
          {/* TV outer shell */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative"
          >
            {/* Pink drop shadow layer (visible below) */}
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-4 border-black"
              style={{ backgroundColor: "#FF2D78", zIndex: 0 }}
              aria-hidden
            />
            {/* Yellow accent shadow (deeper) */}
            <div
              className="absolute inset-0 translate-x-6 translate-y-6 rounded-2xl border-4 border-black"
              style={{ backgroundColor: "#FFE600", zIndex: -1 }}
              aria-hidden
            />

            {/* Main TV container */}
            <div className="relative z-10 rounded-2xl border-4 border-black dark:border-white bg-black overflow-hidden">
              {/* TV top bar */}
              <div className="flex items-center justify-between px-5 py-2.5 border-b-4 border-black dark:border-white bg-[#0D0D0D]">
                <DotCluster color="#FF2D78" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
                  CERITA TV — CH. 01
                </span>
                <motion.div
                  className="w-5 h-5 rounded-full border-2 border-white/30 bg-[#FF2D78]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>

              {/* Video iframe — responsive */}
              <div className="relative aspect-video w-full bg-black">
                <Scanlines />
                <iframe
                  src={VIDEO.embedUrl}
                  title={VIDEO.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>

              {/* TV bottom bar */}
              <div className="px-5 py-2.5 border-t-4 border-black dark:border-white bg-[#0D0D0D] flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                  ▶ SEDANG DIPUTAR
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-[#FF2D78]"
                      style={{ height: "16px" }}
                      animate={{ scaleY: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.08, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Rotated badge */}
            <RotatedBadge text="▶ PLAY NOW" bg="#FFE600" />

            {/* Duration badge bottom-left */}
            <motion.div
              className="absolute -bottom-4 -left-4 z-20 -rotate-3"
              whileHover={{ rotate: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="px-3 py-1.5 border-2 border-black bg-[#00F0FF] text-black text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" style={{ borderRadius: "4px" }}>
                ⏱ {VIDEO.duration}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        {/* ════════════════════════════════════════════════
            DESKRIPSI VIDEO
        ════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp(0.45)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-10 px-1"
        >
          {/* Judul Video */}
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-black dark:text-white leading-tight mb-4">
            {VIDEO.title}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {VIDEO.tags.map((tag, i) => (
              <Tag key={tag} label={tag} index={i} />
            ))}
          </div>

          {/* Description box */}
          <motion.div
            variants={fadeUp(0.55)}
            className="relative border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.4)]"
            style={{ backgroundColor: "#00F0FF", borderRadius: "12px" }}
          >
            {/* Label header kotak */}
            <div className="flex items-center gap-2 px-4 pt-3 pb-0">
              <div className="w-2.5 h-2.5 rounded-full bg-black" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/60">
                Deskripsi Video
              </span>
            </div>

            {/* Teks deskripsi */}
            <div className="px-5 pb-6 pt-3">
              <p className="text-sm sm:text-base font-semibold text-black leading-relaxed">
                {VIDEO.description}
              </p>
            </div>

            {/* Kutip dekoratif pojok */}
            <div className="absolute bottom-2 right-4 text-black/[0.08] text-7xl font-black leading-none select-none pointer-events-none">
              ❝
            </div>
          </motion.div>
        </motion.div>

      </div>
    </main>
  );
}