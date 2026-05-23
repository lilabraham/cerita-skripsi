"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Mail, User, ShieldAlert } from "lucide-react";

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-4 rounded-full bg-indigo-500/10 text-indigo-400 mb-6"
          >
            <ShieldAlert size={40} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white font-heading mb-4"
          >
            Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">CERITA</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Cegah Edukasi Remaja Tanpa HIV/AIDS
          </motion.p>
        </div>

        <div className="space-y-8">
          {/* Card 1: Informasi Skripsi */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <BookOpen className="text-teal-400" size={28} />
              <h2 className="text-2xl font-bold text-white">Informasi Penelitian</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Judul Skripsi</p>
                <p className="text-white font-medium leading-relaxed">
                  "Pengaruh Pendidikan Kesehatan dengan Media Website terhadap Tingkat Pengetahuan dan Sikap Remaja Mengenai HIV/AIDS"
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tujuan Edukasi</p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Website ini dirancang khusus sebagai media intervensi digital yang modern, interaktif, dan ramah remaja (SMA/sederajat) untuk mematahkan stigma negatif serta meningkatkan kesadaran akan pencegahan HIV/AIDS.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Card 2: Profil Peneliti */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <GraduationCap className="text-indigo-400" size={28} />
              <h2 className="text-2xl font-bold text-white">Profil Peneliti</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center shrink-0">
                <User size={40} className="text-gray-400" />
              </div>
              <div className="space-y-3 flex-1">
                <div>
                  <p className="text-sm text-gray-500 mb-0.5">Nama Mahasiswa</p>
                  <p className="text-white font-semibold text-lg">[Nama Lengkap Kamu]</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-0.5">NIM / Program Studi</p>
                  <p className="text-gray-300">[NIM Kamu] — S1 Kebidanan</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-0.5">Institusi</p>
                  <p className="text-gray-300">[Nama Kampus / Universitas Kamu]</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Card 3: Kontak */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            id="kontak"
            className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Punya Pertanyaan Teknis?</h2>
              <p className="text-gray-400 text-sm">
                Hubungi peneliti jika kamu mengalami kendala dalam mengakses materi atau kuis di website ini.
              </p>
            </div>
            <a
              href="mailto:emailkamu@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shrink-0"
            >
              <Mail size={18} />
              Kirim Email
            </a>
          </motion.section>
        </div>

      </div>
    </main>
  );
}