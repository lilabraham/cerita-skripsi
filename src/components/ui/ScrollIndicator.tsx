"use client";

import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  text?: string;
}

export default function ScrollIndicator({
  text = "Scroll ke bawah",
}: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200;

      // Sembunyikan juga jika belum mulai scroll sama sekali tapi halaman pendek
      const pageScrollable =
        document.body.offsetHeight > window.innerHeight + 50;

      setIsVisible(pageScrollable && !nearBottom);
    };

    handleScroll(); // cek kondisi awal
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="
            fixed bottom-6 left-1/2 -translate-x-1/2 z-40
            pointer-events-none
          "
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="
              flex items-center gap-2
              px-4 py-2 sm:px-5 sm:py-2.5
              rounded-full
              border-4 border-black dark:border-white
              bg-cyan-300 dark:bg-cyan-500
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]
              whitespace-nowrap
            "
          >
            <span className="font-black text-[10px] sm:text-xs uppercase tracking-widest text-black">
              {text}
            </span>
            <ChevronDown size={16} strokeWidth={3} className="text-black flex-shrink-0" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}