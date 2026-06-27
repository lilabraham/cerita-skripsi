"use client";

import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    handleScroll(); // set state awal jika user reload di tengah scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          whileHover={{
            y: -3,
            boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
          }}
          whileTap={{
            y: 2,
            x: 1,
            boxShadow: "1px 1px 0px 0px rgba(0,0,0,1)",
          }}
          className="
            fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50
            w-14 h-14 sm:w-14 sm:h-14
            rounded-xl
            border-4 border-black dark:border-white
            bg-yellow-300 dark:bg-yellow-400
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]
            flex items-center justify-center
            transition-shadow duration-100
            active:outline-none
            focus-visible:ring-4 focus-visible:ring-black/30
          "
        >
          <ArrowUp size={22} strokeWidth={3} className="text-black" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}