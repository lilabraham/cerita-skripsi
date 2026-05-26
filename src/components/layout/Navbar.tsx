"use client";

import Link from "next/link";
import { ShieldAlert, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
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
  { label: "Kuis / Game",   href: "/kuis"    },
  { label: "Ruang Diskusi", href: "/forum"   },
  { label: "Video Edukasi", href: "/video"   },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname  = usePathname();
  const { scrollYProgress } = useScroll();

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Scroll shadow detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── SCROLL PROGRESS BAR ─────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-yellow-300 z-[60] origin-left border-b-2 border-black"
        style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
      />

      {/* ── NAVBAR ──────────────────────────────────────── */}
      <motion.header
        initial={{ y: -96, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b-4 border-black dark:border-white",
          "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md transition-shadow duration-300",
          scrolled
            ? "shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_6px_0px_0px_rgba(255,255,255,0.8)]"
            : "shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_4px_0px_0px_rgba(255,255,255,0.5)]"
        )}
      >
        <nav className="container-cerita h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: [0, -12, 12, -6, 0], scale: 1.15 }}
              transition={{ duration: 0.5 }}
            >
              <ShieldAlert size={24} className="text-violet-600 dark:text-violet-400" />
            </motion.div>
            <motion.span
              whileHover={{ letterSpacing: "0.08em" }}
              transition={{ duration: 0.2 }}
              className="font-black text-xl bg-gradient-to-r from-violet-700 to-indigo-500 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent tracking-tight uppercase"
            >
              CERITA.
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-bold transition-colors duration-200 z-0",
                      isActive
                        ? "text-black"
                        : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                    )}
                  >
                    {/* Animated active pill — layoutId makes it slide between links */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-yellow-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative flex items-center gap-1.5">
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0"
                        />
                      )}
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ x: 3, y: 3 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Link
                href="/tentang"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-sm font-black uppercase tracking-tight hover:bg-yellow-300 hover:text-black hover:border-black dark:hover:bg-yellow-300 dark:hover:text-black transition-colors duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
              >
                Tentang Skripsi
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />

            <motion.button
              onClick={() => setMenuOpen((prev) => !prev)}
              whileTap={{ scale: 0.88 }}
              className="border-2 border-black dark:border-white p-2 rounded-xl bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-yellow-300 hover:border-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.div
                    key="x-icon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90,  opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu-icon"
                    initial={{ rotate:  90, opacity: 0 }}
                    animate={{ rotate:  0,  opacity: 1 }}
                    exit={{   rotate: -90,  opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* ── MOBILE DROPDOWN ─────────────────────────────── */}
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
                className="md:hidden fixed inset-0 top-16 bg-black/40 backdrop-blur-sm"
                onClick={() => setMenuOpen(false)}
              />

              {/* Menu panel */}
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0,   scale: 1    }}
                exit={{   opacity: 0, y: -16,  scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden absolute top-[calc(4rem+4px)] left-3 right-3 rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-gray-900 px-4 py-4 flex flex-col gap-0.5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)]"
              >
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0   }}
                      transition={{
                        delay:    index * 0.055,
                        duration: 0.22,
                        ease:     "easeOut",
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-2 text-sm font-bold transition-colors py-3 px-3 rounded-xl",
                          isActive
                            ? "text-black bg-yellow-300 border-l-4 border-black"
                            : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0"
                          />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* CTA — staggered last */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ delay: navLinks.length * 0.055 + 0.05, duration: 0.22 }}
                >
                  <Link
                    href="/tentang"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-sm font-black uppercase tracking-tight hover:bg-yellow-300 hover:text-black hover:border-black transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.8)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                  >
                    Tentang Skripsi →
                  </Link>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}