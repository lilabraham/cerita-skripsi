// C:\Users\LENOVO\Documents\cerita-app\src\components\layout\Navbar.tsx

"use client";

import Link from "next/link";
import { ShieldAlert, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
// ✅ Injeksi 1: Import komponen ThemeToggle
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "Home",          href: "/"        },
  { label: "Edukasi",       href: "/edukasi" },
  { label: "Kuis / Game",   href: "/kuis"    },
  { label: "Ruang Diskusi", href: "/forum"   },
  { label: "Video Edukasi", href: "/video"   },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100/60 dark:border-[var(--border-subtle)] bg-white/70 dark:bg-[var(--bg-base)]/60 backdrop-blur-md transition-colors duration-300">
      <nav className="container-cerita h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-gray-900 dark:text-white text-xl tracking-tight">
          <ShieldAlert size={24} className="text-violet-600 dark:text-indigo-400" />
          <span className="bg-gradient-to-r from-violet-700 to-indigo-500 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
            CERITA.
          </span>
        </Link>

        {/* Desktop nav — Shifa-style: dot indicator on active link */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-violet-700 dark:text-white bg-violet-50 dark:bg-white/10"
                      : "text-gray-500 dark:text-[var(--text-secondary)] hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-indigo-400 flex-shrink-0" />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side — desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* ✅ Injeksi 2: Pasang ThemeToggle untuk tampilan Desktop */}
          <ThemeToggle />

          {/* Shifa-style: dark pill "Contact Us" button */}
          <Link
            href="/tentang"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:bg-gray-700 dark:hover:bg-gray-100 transition-all duration-200 shadow-sm"
          >
            Tentang Skripsi
            <span className="text-xs opacity-70">→</span>
          </Link>
        </div>

        {/* Mobile controls (Toggle + Hamburger) */}
        {/* ✅ Injeksi 3: Membungkus tombol menu dan ThemeToggle di dalam flex agar sejajar di Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-500 dark:text-[var(--text-secondary)] hover:text-gray-900 dark:hover:text-white transition-colors p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 top-16 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu box — glass card like Shifa */}
          <div className="md:hidden absolute top-16 left-3 right-3 rounded-2xl border border-gray-100 dark:border-[var(--border-subtle)] bg-white/90 dark:bg-[var(--bg-base)] backdrop-blur-xl px-4 py-4 flex flex-col gap-0.5 shadow-xl dark:shadow-2xl">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors py-3 px-3 rounded-xl",
                    isActive
                      ? "text-violet-700 dark:text-white bg-violet-50 dark:bg-white/10"
                      : "text-gray-600 dark:text-[var(--text-secondary)] hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-indigo-400 flex-shrink-0" />
                  )}
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/tentang"
              onClick={() => setMenuOpen(false)}
              className="mt-2 text-center w-full px-4 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:bg-gray-700 dark:hover:bg-gray-100 transition-all"
            >
              Tentang Skripsi →
            </Link>
          </div>
        </>
      )}
    </header>
  );
}

// ─── Utility (inline agar tidak perlu import tambahan) ────────────────────────
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}