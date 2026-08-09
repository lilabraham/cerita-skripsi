// src/store/quizStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ModulId =
  | "pengenalan"
  | "penularan"
  | "pencegahan"
  | "pengobatan"
  | string; // extensible untuk modul baru

export interface ModulProgress {
  score: number; // 0–100
  completed: boolean;
  attempts: number;
  lastCompletedAt: string | null; // ISO timestamp
}

export type ProgressMap = Record<ModulId, ModulProgress>;

// ─── Store Interface ──────────────────────────────────────────────────────────

interface QuizState {
  progress: ProgressMap;

  // Actions
  updateProgress: (modulId: ModulId, score: number) => void;
  resetModul: (modulId: ModulId) => void;
  resetAllProgress: () => void;

  // Derived helpers
  getScore: (modulId: ModulId) => number;
}

// ─── Default progress factory ─────────────────────────────────────────────────

const defaultModulProgress = (): ModulProgress => ({
  score: 0,
  completed: false,
  attempts: 0,
  lastCompletedAt: null,
});



// ─── Store ────────────────────────────────────────────────────────────────────

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      progress: {},

      // ── updateProgress ──────────────────────────────────────────────────────
      updateProgress: (modulId, score) => {
        set((state) => {
          const prev = state.progress[modulId] ?? defaultModulProgress();
          return {
            progress: {
              ...state.progress,
              [modulId]: {
                score,
                completed: score === 100,
                attempts: prev.attempts + 1,
                lastCompletedAt:
                  score === 100 ? new Date().toISOString() : prev.lastCompletedAt,
              } satisfies ModulProgress,
            },
          };
        });
      },

      // ── resetModul ──────────────────────────────────────────────────────────
      resetModul: (modulId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [modulId]: defaultModulProgress(),
          },
        }));
      },

      // ── resetAllProgress ────────────────────────────────────────────────────
      resetAllProgress: () => set({ progress: {} }),

      // ── getScore ────────────────────────────────────────────────────────────
      getScore: (modulId) => get().progress[modulId]?.score ?? 0,
    }),

    {
      name: "cerita-quiz-progress", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Hanya persist data progress — bukan fungsi
      partialize: (state) => ({ progress: state.progress }),
    }
  )
);