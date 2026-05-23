"use client";

import Link from "next/link";
import { ShieldAlert, Menu } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Edukasi", href: "/edukasi" },
  { label: "Kuis / Game", href: "/kuis" },
  { label: "Ruang Diskusi", href: "/forum" },
  { label: "Video Edukasi", href: "/video" },
  { label: "Tentang Skripsi", href: "/tentang" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-xl">
          <ShieldAlert size={24} className="text-indigo-400" />
          <span className="bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
            CERITA.
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/tentang"
            className="hidden md:inline-flex px-4 py-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-sm font-medium hover:bg-indigo-500/20 transition-all duration-200"
          >
            Tentang Skripsi
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

{/* Mobile dropdown */}
      {menuOpen && (
        <>
          {/* Overlay gelap agar layar belakang tidak bisa di-klik/scroll */}
          <div 
            className="md:hidden fixed inset-0 top-16 bg-black/60 backdrop-blur-sm h-screen" 
            onClick={() => setMenuOpen(false)}
          />
          
          {/* Menu Box */}
          <div className="md:hidden absolute top-16 left-0 right-0 border-b border-white/10 bg-[#0a0a0f] px-6 py-6 flex flex-col gap-5 shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-white text-base font-medium transition-colors border-b border-white/5 pb-3"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/tentang"
              onClick={() => setMenuOpen(false)}
              className="mt-2 text-center w-full px-4 py-3 rounded-xl border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-sm font-medium hover:bg-indigo-500/20 transition-all"
            >
              Tentang Skripsi
            </Link>
          </div>
        </>
      )}
    </header>
  );
}