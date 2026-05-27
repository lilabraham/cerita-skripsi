import Link from "next/link";
import { ShieldAlert, Heart } from "lucide-react";
import Image from "next/image";

/* ── SOCIAL ICONS (inline SVG) ───────────────────────────────── */
function IconInstagram({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconTwitterX({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconYoutube({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconGithub({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

/* ── DATA ────────────────────────────────────────────────────── */

const navLinks = [
  { label: "Beranda",  href: "/"        },
  { label: "Edukasi",  href: "/edukasi" },
  { label: "Kuis",     href: "/kuis"    },
  { label: "Diskusi",  href: "/forum"   },
  { label: "Privasi",  href: "/privacy" },
  { label: "Kontak",   href: "/tentang#kontak" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/flnpy_?igsh=MW5xb2JvaDZmZjRtbA%3D%3D&utm_source=qr", Icon: IconInstagram, hoverBg: "hover:bg-pink-500  hover:border-pink-500"    },
  { label: "YouTube",   href: "https://www.youtube.com/channel/UCjcWmyd97xl2MAFBPcExLQQ",   Icon: IconYoutube,   hoverBg: "hover:bg-red-500   hover:border-red-500"     },
  { label: "GitHub",    href: "https://github.com/lilabraham",    Icon: IconGithub,    hoverBg: "hover:bg-slate-700 hover:border-slate-700"   },
];

/* ── COMPONENT ───────────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer
      className={cn(
        /* Full-width, edge-to-edge — no floating card */
        "w-full",
        "bg-white dark:bg-slate-950",
        "transition-colors duration-300",
        /* The ONE brutalist anchor: thick top border */
        "border-t-4 border-black dark:border-white",
      )}
    >
      {/* ── MAIN ROW ──────────────────────────────────────────── */}
      <div
        className={cn(
          "max-w-7xl mx-auto",
          "px-6 md:px-10",
          "py-8 md:py-10",
          /* Desktop: logo+desc left, socials right — stacked on mobile */
          "flex flex-col md:flex-row md:items-center md:justify-between",
          "gap-6 md:gap-10",
        )}
      >
        {/* LEFT ── Logo + one-liner description ──────────────── */}
        <div className="flex flex-col gap-2">
          {/* Logo wordmark */}
          <Link
            href="/"
            className="group inline-flex items-center w-fit mb-1" 
            /* Tambah mb-1 agar ada jarak sedikit dengan teks deskripsi di bawahnya */
          >
            <div
              className={cn(
                /* Ukuran diketatkan (w-40/w-48) agar proporsional dengan gambar yang sudah di-crop rapat */
                "relative w-36 h-10 md:w-44 md:h-12 shrink-0",
                "drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] dark:drop-shadow-[3px_3px_0px_rgba(255,255,255,0.9)]",
                "group-hover:-translate-y-1 group-hover:drop-shadow-[3px_5px_0px_rgba(0,0,0,1)] dark:group-hover:drop-shadow-[3px_5px_0px_rgba(255,255,255,0.9)]",
                "transition-all duration-150"
              )}
            >
              <Image
                src="/images/logo-cerita-final.png" /* 👈 Pastikan pakai nama file yang BARU lagi! */
                alt="Logo CERITA"
                fill
                /* object-left penting agar logo rata kiri tegak lurus dengan teks di bawahnya */
                className="object-contain object-left" 
              />
            </div>
          </Link>

          {/* One-liner descriptor */}
          <p className="text-xs font-medium text-black/50 dark:text-white/40 max-w-[42ch] leading-relaxed pl-0.5">
            Platform edukasi HIV/AIDS interaktif untuk remaja SMA — Penelitian Skripsi 2026.
          </p>
        </div>

        {/* RIGHT ── Social icon cluster ──────────────────────── */}
        <div className="flex items-center gap-2.5 shrink-0">
          {socialLinks.map(({ label, href, Icon, hoverBg }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                /* Square pill shape */
                "flex items-center justify-center w-9 h-9 rounded-lg",
                "border-2 border-black dark:border-white",
                "bg-white dark:bg-slate-950",
                "text-black dark:text-white",
                /* Brutalist offset shadow — the key texture anchor */
                "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.9)]",
                /* Hover: brand color fill + lift */
                hoverBg,
                "hover:text-white",
                "hover:-translate-y-1",
                "hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,0.8)]",
                "active:translate-y-0 active:shadow-none",
                "transition-all duration-150",
              )}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ───────────────────────────────────────────── */}
      <div className="border-t-2 border-black/10 dark:border-white/10 mx-6 md:mx-10" />

      {/* ── BOTTOM BAR ────────────────────────────────────────── */}
      <div
        className={cn(
          "max-w-7xl mx-auto",
          "px-6 md:px-10",
          "py-4",
          "flex flex-col sm:flex-row sm:items-center sm:justify-between",
          "gap-3 sm:gap-0",
        )}
      >
        {/* Nav links — horizontal pill row */}
        <nav className="flex items-center flex-wrap gap-x-0 gap-y-1">
          {navLinks.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && (
                <span
                  className="select-none text-black/20 dark:text-white/20 mx-2 text-xs font-black"
                  aria-hidden
                >
                  •
                </span>
              )}
              <Link
                href={link.href}
                className={cn(
                  "text-[11px] font-black uppercase tracking-widest",
                  "text-black/50 dark:text-white/40",
                  "hover:text-black dark:hover:text-white",
                  "transition-colors duration-150",
                )}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        {/* Copyright + love note */}
        <div className="flex items-center gap-1.5 shrink-0">
          <p className="text-[11px] font-bold text-black/40 dark:text-white/30 uppercase tracking-wide">
            © {new Date().getFullYear()} CERITA
          </p>
          <span className="text-black/20 dark:text-white/20 text-xs font-black select-none">—</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-black/40 dark:text-white/30">
            Dibuat dengan
            <Heart size={10} className="text-rose-500 fill-rose-500" />
            untuk edukasi
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ── UTILITY ─────────────────────────────────────────────────── */

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}