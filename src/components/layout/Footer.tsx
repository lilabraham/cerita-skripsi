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
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-default)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Kolom 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <ShieldAlert size={22} className="text-indigo-500" />
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-500 to-teal-500 bg-clip-text text-transparent">
                CERITA.
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Platform edukasi interaktif untuk meningkatkan pengetahuan dan
              sikap remaja SMA mengenai pencegahan HIV/AIDS.
            </p>
            <span
              className="inline-flex items-center gap-1.5 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <ShieldAlert size={12} className="text-indigo-400" />
              Penelitian Skripsi 2026
            </span>
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="space-y-4">
            <h3
              className="font-semibold text-sm"
              style={{ color: "var(--text-primary)" }}
            >
              Eksplorasi
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-indigo-500"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Info */}
          <div className="space-y-4">
            <h3
              className="font-semibold text-sm"
              style={{ color: "var(--text-primary)" }}
            >
              Informasi
            </h3>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-indigo-500"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} CERITA Project. All rights reserved.
          </p>
          <p
            className="text-xs inline-flex items-center gap-1"
            style={{ color: "var(--text-muted)" }}
          >
            Dibuat dengan <Heart size={12} className="text-rose-500 fill-rose-500" /> untuk edukasi kesehatan.
          </p>
        </div>
      </div>
    </footer>
  );
}