import Link from "next/link";
import { ShieldAlert, Heart } from "lucide-react";

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
    <footer className="border-t border-white/10 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Kolom 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <ShieldAlert size={22} className="text-indigo-400" />
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
                CERITA.
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Platform edukasi interaktif untuk meningkatkan pengetahuan dan
              sikap remaja SMA mengenai pencegahan HIV/AIDS.
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
              <ShieldAlert size={12} className="text-indigo-500" />
              Penelitian Skripsi 2026
            </span>
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm">Eksplorasi</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm">Informasi</h3>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} CERITA Project. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs inline-flex items-center gap-1">
            Dibuat dengan <Heart size={12} className="text-rose-500 fill-rose-500" /> untuk edukasi kesehatan.
          </p>
        </div>
      </div>
    </footer>
  );
}