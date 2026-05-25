// C:\Users\LENOVO\Documents\cerita-app\src\components\layout\Footer.tsx

import Link from "next/link";
import { ShieldAlert, Heart, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Materi Edukasi", href: "/edukasi" },
  { label: "Kuis Interaktif", href: "/kuis" },
  { label: "Ruang Diskusi", href: "/forum" },
];

const infoLinks = [
  { label: "Tentang Peneliti", href: "/tentang" },
  { label: "Hubungi Kami", href: "/tentang#kontak" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-100 dark:border-[var(--border-default)] bg-white/80 dark:bg-[var(--bg-surface)] backdrop-blur-sm overflow-hidden transition-colors duration-300">

      {/* Top gradient accent — visual closure dari CTASection */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-300/50 dark:via-indigo-500/30 to-transparent" />

      {/* Ambient glow — dark mode only, cinematic closure */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-violet-500/[0.04] dark:bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Kolom 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <ShieldAlert size={22} className="text-violet-600 dark:text-indigo-400 transition-colors" />
              <span className="font-black text-lg bg-gradient-to-r from-violet-700 to-indigo-500 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                CERITA.
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-[var(--text-secondary)] max-w-[22ch] transition-colors">
              Platform edukasi interaktif untuk meningkatkan pengetahuan dan
              sikap remaja SMA mengenai pencegahan HIV/AIDS.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-indigo-500/10 border border-violet-100 dark:border-indigo-500/20 transition-colors">
              <ShieldAlert size={11} className="text-violet-500 dark:text-indigo-400" />
              <span className="text-xs font-semibold text-violet-600 dark:text-indigo-400">Penelitian Skripsi 2026</span>
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-[var(--text-primary)] tracking-wide transition-colors">
              Eksplorasi
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-500 dark:text-[var(--text-secondary)] hover:text-violet-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-[var(--text-primary)] tracking-wide transition-colors">
              Informasi
            </h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-500 dark:text-[var(--text-secondary)] hover:text-violet-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-[var(--border-subtle)] mb-6 transition-colors" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400 dark:text-[var(--text-muted)] transition-colors">
            © {new Date().getFullYear()} CERITA Project. All rights reserved.
          </p>
          <p className="text-xs inline-flex items-center gap-1.5 text-gray-400 dark:text-[var(--text-muted)] transition-colors">
            Dibuat dengan <Heart size={11} className="text-rose-500 fill-rose-500" /> untuk edukasi kesehatan.
          </p>
        </div>
      </div>
    </footer>
  );
}