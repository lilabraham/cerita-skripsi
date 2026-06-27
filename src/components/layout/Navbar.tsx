"use client";

import Link from "next/link";
import Image from "next/image"; // 👈 PASTIKAN BARIS INI ADA
import { ShieldAlert, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  motion,
  AnimatePresence,
  useScroll,
} from "framer-motion";

const navLinks = [
  { label: "Home",          href: "/"        },
  { label: "Edukasi",       href: "/edukasi" },
  { label: "Video",         href: "/video"   },
  { label: "Forum",         href: "/forum"   },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const pathname                    = usePathname();
  const { scrollYProgress }         = useScroll();
  const navRef                      = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const id = setTimeout(() => setMenuOpen(false), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── SCROLL PROGRESS BAR ─────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-yellow-300 to-pink-500 z-[60] origin-left"
        style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
      />

      {/* ── FLOATING NAVBAR WRAPPER ─────────────────────── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        {/* ── BRUTALIST PILL CONTAINER ────────────────────── */}
        <div
          className={cn(
            "pointer-events-auto",
            "relative flex items-center gap-2 h-14 px-3",
            "rounded-2xl border-4 border-black dark:border-white",
            "bg-violet-100 dark:bg-gray-950",
            "transition-shadow duration-300",
            scrolled
              ? "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)]"
              : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            /* mr-1 dihapus, pr-3 dikurangi jadi pr-2 agar garis pembatas hitam lebih merapat ke logo */
            className="flex items-center pr-2 md:pr-3 border-r-4 border-black dark:border-white group"
          >
            <div
              className={cn(
                /* Lebar (w) dan tinggi (h) dikurangi agar lebih pas dan padat di dalam navbar */
                "relative w-24 h-7 md:w-28 md:h-8 shrink-0",
                "drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:drop-shadow-[2px_2px_0px_rgba(255,255,255,0.9)]",
                "group-hover:-translate-y-0.5 group-hover:drop-shadow-[2px_4px_0px_rgba(0,0,0,1)] dark:group-hover:drop-shadow-[2px_4px_0px_rgba(255,255,255,0.9)]",
                "transition-all duration-150"
              )}
            >
              <Image
                src="/images/logo-cerita-final.png"
                alt="Logo CERITA"
                sizes="(max-width: 640px) 40px, 120px"
                fill
                /* object-center memastikan gambar tetap di tengah wadah yang sudah dikecilkan */
                className="object-contain object-center" 
                priority
              />
            </div>
          </Link>

          {/* ── DESKTOP NAV ─────────────────────────────── */}
          <ul
            ref={navRef}
            className="hidden md:flex items-center gap-1"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <NavItem
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={isActive}
                />
              );
            })}
          </ul>

          {/* ── RIGHT SIDE ──────────────────────────────── */}
          <div className="hidden md:flex items-center gap-2 ml-1 pl-3 border-l-4 border-black dark:border-white">
            <ThemeToggle />

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ x: 2, y: 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Link
                href="/tentang"
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl",
                  "border-2 border-black dark:border-white",
                  "bg-black dark:bg-white text-white dark:text-black",
                  "text-xs font-black uppercase tracking-wide",
                  "hover:bg-yellow-300 hover:text-black hover:border-black",
                  "dark:hover:bg-yellow-300 dark:hover:text-black",
                  "transition-colors duration-150",
                  "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)]",
                  "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                )}
              >
                Tentang
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* ── MOBILE CONTROLS ─────────────────────────── */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            <ThemeToggle />

            <motion.button
              onClick={() => setMenuOpen((prev) => !prev)}
              whileTap={{ scale: 0.88 }}
              className={cn(
                "border-2 border-black dark:border-white p-1.5 rounded-xl",
                "bg-white dark:bg-gray-900 text-black dark:text-white",
                "hover:bg-yellow-300 hover:border-black transition-colors",
                "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)]",
                "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              )}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90,  opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate:  90, opacity: 0 }}
                    animate={{ rotate:  0,  opacity: 1 }}
                    exit={{   rotate: -90,  opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── MOBILE DROPDOWN ───────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,   scale: 1    }}
              exit={{   opacity: 0, y: -12,  scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "md:hidden fixed top-[4.5rem] left-3 right-3 z-50",
                "rounded-2xl border-4 border-black dark:border-white",
                "bg-violet-100 dark:bg-gray-900",
                "px-3 py-3 flex flex-col gap-1",
                "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)]"
              )}
            >
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0   }}
                    transition={{ delay: index * 0.05, duration: 0.2, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "relative flex items-center gap-2 py-2.5 px-4 rounded-xl",
                        "text-sm font-black transition-colors overflow-hidden",
                        isActive
                          ? "text-black dark:text-white"
                          : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                      )}
                    >
                      {/* Mobile: simpler liquid glass — no layoutId (dropdown is remounted) */}
                      {isActive && (
                        <span
                          className={cn(
                            "absolute inset-0 rounded-xl",
                            /* ─ Liquid Glass Core ─ */
                            "bg-white/25 dark:bg-white/10",
                            "backdrop-blur-md",
                            "border border-white/40 dark:border-white/20",
                            /* Convex highlight */
                            "shadow-[inset_0_3px_6px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(0,0,0,0.08)]"
                          )}
                        />
                      )}
                      {isActive && (
                        <span className="relative w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400 flex-shrink-0 z-10" />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.04, duration: 0.2 }}
              >
                <Link
                  href="/tentang"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "mt-1 flex items-center justify-center gap-2 w-full",
                    "px-4 py-2.5 rounded-xl",
                    "border-2 border-black dark:border-white",
                    "bg-black dark:bg-white text-white dark:text-black",
                    "text-sm font-black uppercase tracking-wide",
                    "hover:bg-yellow-300 hover:text-black hover:border-black",
                    "transition-colors",
                    "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.8)]",
                    "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                  )}
                >
                  Tentang Skripsi →
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── DESKTOP NAV ITEM ───────────────────────────────────────── */

interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

function NavItem({ href, label, isActive }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-black transition-colors duration-150 z-0 select-none",
          isActive
            ? "text-black dark:text-white"
            : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
        )}
      >
        {/* ── LIQUID GLASS INDICATOR ─────────────────────
            layoutId makes it morph + slide between nav items
            like a liquid bubble. Spring physics = organic feel.
        ─────────────────────────────────────────────────── */}
        {isActive && (
          <motion.span
            layoutId="liquid-glass"
            className={cn(
              "absolute inset-0 -z-10 rounded-xl overflow-hidden",
              /* 1. Base translucent fill */
              "bg-white/20 dark:bg-white/10",
              /* 2. Glassmorphism blur */
              "backdrop-blur-md",
              /* 3. Subtle border — mimics glass edge refraction */
              "border border-white/40 dark:border-white/20",
              /* 4. Inner highlight top → convex 3-D glass illusion */
              "shadow-[inset_0_4px_8px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.08)]"
            )}
            /* Specular sheen pseudo-element via box-shadow above */
            transition={{
              type:      "spring",
              stiffness: 380,
              damping:   32,
              mass:      0.9,
            }}
          />
        )}

        {/* Dot indicator */}
        {isActive && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{   scale: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400 flex-shrink-0"
          />
        )}

        <span className="relative z-10">{label}</span>
      </Link>
    </li>
  );
}

/* ── UTILITY ────────────────────────────────────────────────── */

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}