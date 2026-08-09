"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SearchX, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-[#04060A] p-6">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Ikon Lucu */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-24 h-24 rounded-3xl bg-pink-300 dark:bg-pink-900/50 border-4 border-black dark:border-pink-500/30 flex items-center justify-center mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(236,72,153,0.3)]"
        >
          <SearchX size={48} className="text-black dark:text-pink-300" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black text-black dark:text-white mb-4 tracking-tight"
        >
          Oops! 404
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-black/70 dark:text-white/70 font-medium mb-8"
        >
          Sepertinya kamu nyasar. Halaman yang kamu cari sudah pindah atau memang tidak pernah ada di sistem CERITA.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full"
        >
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-4 border-black dark:border-white font-black text-black dark:text-white hover:bg-yellow-300 dark:hover:bg-yellow-500 hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none w-full"
          >
            <Home size={18} />
            Beranda
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-4 border-black dark:border-white font-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors w-full"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>
        </motion.div>
      </div>
    </main>
  );
}
