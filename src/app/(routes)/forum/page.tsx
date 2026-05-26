// src/app/(routes)/forum/page.tsx

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Heart, User } from "lucide-react";
import { initialComments, type CommentItem } from "@/data/forum-data";
import { cn } from "@/lib/utils";

export default function ForumPage() {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [newComment, setNewComment] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentToAdd: CommentItem = {
      id: Date.now().toString(),
      name: newUsername.trim() === "" ? "Anonim" : newUsername,
      avatarColor: "bg-rose-500",
      message: newComment,
      date: "Baru saja",
      likes: 0,
    };

    setComments([commentToAdd, ...comments]);
    setNewComment("");
    setNewUsername("");
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)] pt-28 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        {/* Header Forum */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl border-4 border-black dark:border-white bg-pink-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)] text-black mb-6">
            <MessageSquare size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tight leading-none mb-4">
            Ruang{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-500 dark:from-indigo-400 dark:to-teal-400">
              Diskusi
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto font-medium">
            Punya pertanyaan seputar HIV/AIDS? Atau ingin berbagi pandangan?
            Tulis di sini! Ruang ini aman, bebas stigma, dan kamu bisa bertanya
            secara anonim.
          </p>
        </div>

        {/* Kotak Input Komentar */}
        <div className="rounded-2xl border-4 border-black dark:border-white bg-white dark:bg-gray-900 p-6 md:p-8 mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-black dark:border-white bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-black dark:text-gray-300 shrink-0">
                <User size={24} />
              </div>
              <input
                type="text"
                placeholder="Nama kamu (Kosongkan jika ingin Anonim)"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full bg-transparent border-b-2 border-black dark:border-white px-2 py-2 text-black dark:text-white font-medium focus:outline-none placeholder:text-black/40 dark:placeholder:text-white/40 transition-colors"
              />
            </div>
            <textarea
              placeholder="Tuliskan pertanyaan atau diskusimu di sini..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-black dark:border-white rounded-xl p-4 text-black dark:text-white font-medium focus:outline-none transition-colors resize-none mt-2 placeholder:text-black/40 dark:placeholder:text-white/40"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-tight transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] hover:bg-yellow-300 hover:text-black hover:border-black dark:hover:bg-yellow-400 dark:hover:text-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Kirim <Send size={16} />
              </button>
            </div>
          </form>
        </div>

        {/* Daftar Komentar */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-black dark:text-white uppercase tracking-tight mb-6">
            Komentar Terbaru
          </h3>

          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-2xl border-2 border-black dark:border-white bg-white dark:bg-gray-900 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)]"
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black text-white border-2 border-black dark:border-white",
                      comment.avatarColor
                    )}
                  >
                    {comment.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Isi Komentar */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                      <span className="font-black text-black dark:text-white uppercase tracking-tight text-sm">
                        {comment.name}
                      </span>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-medium">
                      {comment.message}
                    </p>

                    {/* Tombol Like */}
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-black dark:border-white bg-white dark:bg-gray-900 text-xs font-black text-black dark:text-white uppercase tracking-tight hover:bg-pink-400 hover:text-black hover:border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none group">
                      <Heart size={14} className="group-hover:fill-current" />
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