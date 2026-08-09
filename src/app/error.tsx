"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Di aplikasi sungguhan, ini bisa dikirim ke Sentry/Analytics
    console.error("Global App Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-[#04060A] p-6">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Ikon Warning */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-24 h-24 rounded-3xl bg-red-300 dark:bg-red-900/50 border-4 border-black dark:border-red-500/30 flex items-center justify-center mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(248,113,113,0.3)]"
        >
          <AlertTriangle size={48} className="text-black dark:text-red-300" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black text-black dark:text-white mb-4 tracking-tight"
        >
          Duh, Error!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-black/70 dark:text-white/70 font-medium mb-8"
        >
          Terjadi gangguan teknis atau koneksi terputus. Tenang, progress belajarmu tersimpan otomatis kok!
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full"
        >
          <button
            onClick={() => reset()}
            className="flex w-full items-center justify-center gap-2 py-4 px-6 rounded-xl border-4 border-black dark:border-white font-black text-black dark:text-white hover:bg-yellow-300 dark:hover:bg-yellow-500 hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <RefreshCw size={18} />
            Coba Muat Ulang Halaman
          </button>
        </motion.div>
      </div>
    </main>
  );
}
