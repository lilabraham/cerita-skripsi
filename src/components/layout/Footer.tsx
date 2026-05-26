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
    <footer className="border-t-4 border-black dark:border-white bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Kolom 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <ShieldAlert size={22} className="text-violet-600 dark:text-violet-400" />
              <span className="font-black text-xl bg-gradient-to-r from-violet-700 to-indigo-500 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent tracking-tight uppercase">
                CERITA.
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-[22ch]">
              Platform edukasi interaktif untuk meningkatkan pengetahuan dan
              sikap remaja SMA mengenai pencegahan HIV/AIDS.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-black dark:border-white bg-violet-300 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)]">
              <ShieldAlert size={11} className="text-black" />
              <span className="text-xs font-black uppercase tracking-wide">Penelitian Skripsi 2026</span>
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="space-y-4">
            <h3 className="font-black text-sm text-black dark:text-white tracking-tight uppercase">
              Eksplorasi
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline decoration-2 transition-colors duration-200"
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
            <h3 className="font-black text-sm text-black dark:text-white tracking-tight uppercase">
              Informasi
            </h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline decoration-2 transition-colors duration-200"
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
        <div className="h-1 bg-black dark:bg-white mb-6" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} CERITA Project. All rights reserved.
          </p>
          <p className="text-xs inline-flex items-center gap-1.5 font-bold text-gray-500 dark:text-gray-500">
            Dibuat dengan <Heart size={11} className="text-rose-500 fill-rose-500" /> untuk edukasi kesehatan.
          </p>
        </div>
      </div>
    </footer>
  );
}