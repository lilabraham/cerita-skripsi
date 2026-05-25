"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Heart, User } from "lucide-react";
import { initialComments, type CommentItem } from "@/data/forum-data";
import { cn } from "@/lib/utils";

export default function ForumPage() {
  // State untuk menyimpan daftar komentar
  const [comments, setComments] = useState<CommentItem[]>(initialComments);

  // State untuk menangkap teks input dari user
  const [newComment, setNewComment] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");

  // Fungsi untuk mengirim komentar
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah halaman refresh saat form dikirim

    if (!newComment.trim()) return; // Cegah kirim komentar kosong

    // Membuat objek komentar baru
    const commentToAdd: CommentItem = {
      id: Date.now().toString(), // Bikin ID unik pakai waktu saat ini
      name: newUsername.trim() === "" ? "Anonim" : newUsername,
      avatarColor: "bg-rose-500", // Warna profil khusus untuk user baru
      message: newComment,
      date: "Baru saja",
      likes: 0,
    };

    // Tambahkan komentar baru ke urutan paling atas
    setComments([commentToAdd, ...comments]);

    // Kosongkan form setelah terkirim
    setNewComment("");
    setNewUsername("");
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-28 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        {/* Header Forum */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-4 transition-colors">
            <MessageSquare size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-heading mb-4 transition-colors">
            Ruang{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-500 dark:from-indigo-400 dark:to-teal-400">
              Diskusi
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto transition-colors">
            Punya pertanyaan seputar HIV/AIDS? Atau ingin berbagi pandangan?
            Tulis di sini! Ruang ini aman, bebas stigma, dan kamu bisa bertanya
            secara anonim.
          </p>
        </div>

        {/* Kotak Input Komentar */}
        <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 md:p-8 mb-12 shadow-sm dark:shadow-2xl transition-all duration-300">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0 transition-colors">
                <User size={24} />
              </div>
              <input
                type="text"
                placeholder="Nama kamu (Kosongkan jika ingin Anonim)"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />
            </div>
            <textarea
              placeholder="Tuliskan pertanyaan atau diskusimu di sini..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none mt-2 placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-all shadow-md dark:shadow-none"
              >
                Kirim <Send size={16} />
              </button>
            </div>
          </form>
        </div>

        {/* Daftar Komentar */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
            Komentar Terbaru
          </h3>

          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-white/5 p-6 shadow-sm dark:shadow-none transition-colors"
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-white",
                      comment.avatarColor
                    )}
                  >
                    {comment.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Isi Komentar */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                        {comment.name}
                      </span>
                      <span className="text-xs text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 transition-colors">
                      {comment.message}
                    </p>

                    {/* Tombol Like (Visual saja) */}
                    <button className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-rose-500 dark:text-gray-500 dark:hover:text-rose-400 transition-colors group">
                      <Heart size={16} className="group-hover:fill-current" />
                      {comment.likes} Suka
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}