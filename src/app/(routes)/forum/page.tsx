// src/app/(routes)/forum/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";

interface SurveyFormData {
  namaInisial: string;
  rentangUsia: string;
  tingkatPemahaman: string;
  kritekSaran: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const buttonHoverVariants = {
  rest: { scale: 1, boxShadow: "0 6px 0 #000" },
  hover: { scale: 1.02, boxShadow: "0 3px 0 #000" },
  tap: { scale: 0.98, boxShadow: "0 0px 0 #000" },
};

export default function SurveyPage() {
  const [formData, setFormData] = useState<SurveyFormData>({
    namaInisial: "",
    rentangUsia: "",
    tingkatPemahaman: "",
    kritekSaran: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({ ...prev, namaInisial: value }));
    setError("");
  };

  const handleAgeSelect = (age: string) => {
    setFormData((prev) => ({ ...prev, rentangUsia: age }));
    setError("");
  };

  const handleLikertSelect = (level: string) => {
    setFormData((prev) => ({ ...prev, tingkatPemahaman: level }));
    setError("");
  };

  const handleFeedbackChange = (value: string) => {
    setFormData((prev) => ({ ...prev, kritekSaran: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.namaInisial || !formData.rentangUsia || !formData.tingkatPemahaman || !formData.kritekSaran) {
      setError("Harap isi semua field sebelum mengirim!");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Send data to API
      const response = await fetch("/api/submit-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menyimpan data");
      }

      // Success - show success screen
      setSubmitted(true);
      console.log("Survey submitted successfully:", data);

      // Reset form after 2.5 seconds
      setTimeout(() => {
        setFormData({
          namaInisial: "",
          rentangUsia: "",
          tingkatPemahaman: "",
          kritekSaran: "",
        });
        setSubmitted(false);
      }, 2500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan saat mengirim data";
      setError(errorMessage);
      console.error("Survey submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Background Grid Pattern
  const gridBackgroundStyle = {
    backgroundImage: `
      linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 0.06) 25%, rgba(0, 0, 0, 0.06) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.06) 75%, rgba(0, 0, 0, 0.06) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 0.06) 25%, rgba(0, 0, 0, 0.06) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.06) 75%, rgba(0, 0, 0, 0.06) 76%, transparent 77%, transparent)
    `,
    backgroundSize: "50px 50px",
    backgroundColor: "rgb(250, 245, 230)",
  };

  const gridBackgroundStyleDark = {
    backgroundImage: `
      linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.08) 75%, rgba(255, 255, 255, 0.08) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.08) 75%, rgba(255, 255, 255, 0.08) 76%, transparent 77%, transparent)
    `,
    backgroundSize: "50px 50px",
    backgroundColor: "#04060A",
  };

  if (submitted) {
    return (
      <motion.main
        className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center"
        style={gridBackgroundStyle}
      >
        <div
          className="hidden dark:block absolute inset-0 pointer-events-none"
          style={gridBackgroundStyleDark}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 80, damping: 15 }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex justify-center mb-8"
          >
            <div className="p-6 rounded-2xl border-4 border-black dark:border-white bg-lime-400 dark:bg-lime-500 shadow-[8px_8px_0px_rgba(0,0,0,0.8)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.3)]">
              <CheckCircle size={64} className="text-black" strokeWidth={3} />
            </div>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-black uppercase text-black dark:text-white mb-4 tracking-tighter">
            Terima Kasih!
          </h2>
          <p className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2">
            Survei kamu sudah kami terima.
          </p>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-medium">
            Feedback kamu sangat membantu kami untuk terus berkembang dan memberikan yang terbaik.
          </p>
        </motion.div>
      </motion.main>
    );
  }

  return (
    <motion.main
      className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 overflow-hidden"
      style={gridBackgroundStyle}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Dark mode grid overlay */}
      <div
        className="hidden dark:block absolute inset-0 pointer-events-none"
        style={gridBackgroundStyleDark}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* ── Header Halaman ── */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl border-4 border-black dark:border-white bg-cyan-300 dark:bg-cyan-500 shadow-[6px_6px_0px_rgba(0,0,0,0.8)] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.3)] mb-6">
            <Send size={40} className="text-black" strokeWidth={3} />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-black dark:text-white tracking-tighter leading-tight mb-4">
            Survei Evaluasi
            <br />
            <span className="bg-gradient-to-r from-pink-400 to-yellow-300 dark:from-pink-500 dark:to-yellow-400 text-transparent bg-clip-text">
              CERITA
            </span>
          </h1>
          <p className="text-base sm:text-lg font-bold text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Bantu kami menjadi lebih baik dengan mengisi survei singkat ini. Feedback Anda sangat berharga! 💪
          </p>
        </motion.div>

        {/* ── Form Container ── */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ── Field 1: Nama/Inisial ── */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-black uppercase tracking-wider text-black dark:text-white mb-3">
              Nama / Inisial Kamu
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.namaInisial}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ketik nama atau inisial..."
                className="w-full px-6 py-4 bg-white dark:bg-[#0B0F19] border-4 border-black dark:border-white rounded-xl font-bold text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-pink-500 dark:focus:border-pink-400 transition-all duration-200 shadow-[4px_4px_0px_rgba(0,0,0,0.6)] focus:shadow-[0px_0px_0px_rgba(0,0,0,0.6)]"
              />
            </div>
          </motion.div>

          {/* ── Field 2: Rentang Usia (Multiple Choice Buttons) ── */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-black uppercase tracking-wider text-black dark:text-white mb-4">
              Rentang Usia Kamu
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["15-16", "17-18", ">18"].map((age) => (
                <motion.button
                  key={age}
                  type="button"
                  onClick={() => handleAgeSelect(age)}
                  variants={buttonHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className={`py-4 px-6 rounded-xl border-4 font-black uppercase tracking-wider text-base transition-all duration-200 ${
                    formData.rentangUsia === age
                      ? "bg-pink-400 dark:bg-pink-500 border-black dark:border-white text-black dark:text-white shadow-none"
                      : "bg-white dark:bg-[#0B0F19] border-black dark:border-white text-black dark:text-white shadow-[4px_4px_0px_rgba(0,0,0,0.6)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.6)]"
                  }`}
                >
                  {age} Tahun
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── Field 3: Likert Scale (1-5) ── */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-black uppercase tracking-wider text-black dark:text-white mb-4">
              Tingkat Pemahaman Konten (1 = Sangat Tidak Paham, 5 = Sangat Paham)
            </label>
            <div className="flex gap-3 flex-wrap sm:flex-nowrap">
              {["1", "2", "3", "4", "5"].map((level) => (
                <motion.button
                  key={level}
                  type="button"
                  onClick={() => handleLikertSelect(level)}
                  variants={buttonHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className={`flex-1 py-4 rounded-lg border-4 font-black text-xl transition-all duration-200 ${
                    formData.tingkatPemahaman === level
                      ? level === "1"
                        ? "bg-red-400 dark:bg-red-500 border-black dark:border-white text-black dark:text-white shadow-none"
                        : level === "2"
                          ? "bg-orange-400 dark:bg-orange-500 border-black dark:border-white text-black dark:text-white shadow-none"
                          : level === "3"
                            ? "bg-yellow-400 dark:bg-yellow-500 border-black dark:border-white text-black dark:text-white shadow-none"
                            : level === "4"
                              ? "bg-lime-400 dark:bg-lime-500 border-black dark:border-white text-black dark:text-white shadow-none"
                              : "bg-cyan-400 dark:bg-cyan-500 border-black dark:border-white text-black dark:text-white shadow-none"
                      : "bg-white dark:bg-[#0B0F19] border-black dark:border-white text-black dark:text-white shadow-[4px_4px_0px_rgba(0,0,0,0.6)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.6)]"
                  }`}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* ── Field 4: Kritik & Saran (Textarea) ── */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-black uppercase tracking-wider text-black dark:text-white mb-3">
              Kritik & Saran
            </label>
            <textarea
              value={formData.kritekSaran}
              onChange={(e) => handleFeedbackChange(e.target.value)}
              placeholder="Tuliskan kritik, saran, atau feedback Anda di sini..."
              rows={5}
              className="w-full px-6 py-4 bg-white dark:bg-[#0B0F19] border-4 border-black dark:border-white rounded-xl font-medium text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-lime-500 dark:focus:border-lime-400 transition-all duration-200 resize-none shadow-[4px_4px_0px_rgba(0,0,0,0.6)] focus:shadow-[0px_0px_0px_rgba(0,0,0,0.6)]"
            />
          </motion.div>

          {/* ── Error Message ── */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border-3 border-red-500 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 font-bold text-sm"
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* ── Submit Button (Raksasa) ── */}
          <motion.div
            variants={itemVariants}
            className="pt-4"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              variants={buttonHoverVariants}
              initial="rest"
              whileHover={isSubmitting ? "rest" : "hover"}
              whileTap={isSubmitting ? "rest" : "tap"}
              className={`w-full py-6 px-8 rounded-2xl border-4 border-black dark:border-white font-black text-xl uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-3 ${
                isSubmitting
                  ? "bg-gray-400 dark:bg-gray-600 text-gray-700 dark:text-gray-300 cursor-not-allowed shadow-[2px_2px_0px_rgba(0,0,0,0.4)]"
                  : "bg-gradient-to-r from-lime-400 via-cyan-300 to-pink-400 dark:from-lime-500 dark:via-cyan-400 dark:to-pink-500 text-black dark:text-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_rgba(0,0,0,0.8)]"
              }`}
            >
              <span>{isSubmitting ? "Mengirim..." : "Kirim Jawaban"}</span>
              <Send size={24} strokeWidth={3} />
            </motion.button>
          </motion.div>
        </form>

        {/* ── Footer Info ── */}
        <motion.div variants={itemVariants} className="text-center mt-16 pt-8 border-t-4 border-black dark:border-white">
          <p className="text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 mb-2">
            Data kamu diproses secara aman dan tidak akan dibagikan ke pihak ketiga.
          </p>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Terima kasih telah membantu kami! 🙏
          </p>
        </motion.div>
      </div>
    </motion.main>
  );
}