"use client";

import Link from "next/link";
import { ShieldAlert, Menu, X } from "lucide-react";
import { useState } from "react";
// ✅ Injeksi 1: Import komponen ThemeToggle
import { ThemeToggle } from "@/components/ui/ThemeToggle"; 

const navLinks = [
  { label: "Home",        href: "/"      },
  { label: "Edukasi",      href: "/edukasi" },
  { label: "Kuis / Game",  href: "/kuis"  },
  { label: "Ruang Diskusi",href: "/forum" },
  { label: "Video Edukasi",href: "/video" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/60 backdrop-blur-md">
      <nav className="container-cerita h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-xl">
          <ShieldAlert size={24} className="text-indigo-400" />
          <span className="text-gradient-primary">CERITA.</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[var(--text-secondary)] hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side — desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* ✅ Injeksi 2: Pasang ThemeToggle untuk tampilan Desktop */}
          <ThemeToggle />
          
          <Link
            href="/tentang"
            className="px-4 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-secondary)] text-sm font-medium hover:text-white hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)] transition-all duration-200"
          >
            Tentang Skripsi
          </Link>
        </div>

        {/* Mobile controls (Toggle + Hamburger) */}
        {/* ✅ Injeksi 3: Membungkus tombol menu dan ThemeToggle di dalam flex agar sejajar di Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-[var(--text-secondary)] hover:text-white transition-colors p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 top-16 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu box */}
          <div className="md:hidden absolute top-16 left-0 right-0 border-b border-[var(--border-subtle)] bg-[var(--bg-base)] px-6 py-6 flex flex-col gap-1 shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[var(--text-secondary)] hover:text-white text-base font-medium transition-colors py-3 border-b border-[var(--border-subtle)] last:border-none"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/tentang"
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-center w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-secondary)] text-sm font-medium hover:bg-[var(--bg-elevated)] transition-all"
            >
              Tentang Skripsi
            </Link>
          </div>
        </>
      )}
    </header>
  );
}