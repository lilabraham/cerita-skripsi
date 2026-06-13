"use client";

import { useReducer, useEffect, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FormState, FormAction } from "@/types/questionnaire";
import { STEP_META, TOTAL_STEPS } from "@/data/questionnaire-data";
import StepWelcome from "@/components/kuesioner/StepWelcome";
import StepDataDiri from "@/components/kuesioner/StepDataDiri";
import type { DataDiri } from "@/types/questionnaire";

const DEFAULT_STATE: FormState = {
    currentStep: 0,
    direction: 1,
    dataDiri: { nama: "", jenisKelamin: "", kelas: "", sumberInformasi: "" },
    pengetahuan: {},
    sikap: {},
};

const STORAGE_KEY = "cerita_kuesioner_draft";

function reducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case "NEXT_STEP":
            return { ...state, direction: 1, currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS) };
        case "PREV_STEP":
            return { ...state, direction: -1, currentStep: Math.max(state.currentStep - 1, 0) };
        case "HYDRATE":
            return { ...action.payload };
        case "SET_DATA_DIRI":
            return { ...state, dataDiri: { ...state.dataDiri, ...action.payload } };
        case "SET_PENGETAHUAN":
            return { ...state, pengetahuan: { ...state.pengetahuan, [action.payload.key]: action.payload.value } };
        case "SET_SIKAP":
            return { ...state, sikap: { ...state.sikap, [action.payload.key]: action.payload.value } };
        case "RESET":
            return { ...DEFAULT_STATE };
        default:
            return state;
    }
}

function validateStep(step: number, state: FormState): string | null {
    switch (step) {
        case 1: {
            if (!state.dataDiri.nama.trim()) return "Nama / inisial wajib diisi.";
            if (!state.dataDiri.jenisKelamin) return "Pilih jenis kelamin.";
            if (!state.dataDiri.kelas) return "Pilih kelas / jurusan.";
            if (!state.dataDiri.sumberInformasi) return "Pilih sumber informasi HIV/AIDS kamu.";
            return null;
        }
        case 2: {
            const missing = Array.from({ length: 12 }, (_, i) => `p${i + 1}`)
                .filter((k) => !state.pengetahuan[k]);
            return missing.length ? `${missing.length} soal belum dijawab.` : null;
        }
        case 3: {
            const missing = Array.from({ length: 12 }, (_, i) => `p${i + 13}`)
                .filter((k) => !state.pengetahuan[k]);
            return missing.length ? `${missing.length} soal belum dijawab.` : null;
        }
        case 4: {
            const missing = Array.from({ length: 12 }, (_, i) => `s${i + 1}`)
                .filter((k) => !state.sikap[k]);
            return missing.length ? `${missing.length} soal belum dijawab.` : null;
        }
        case 5: {
            const missing = Array.from({ length: 11 }, (_, i) => `s${i + 13}`)
                .filter((k) => !state.sikap[k]);
            return missing.length ? `${missing.length} soal belum dijawab.` : null;
        }
        default:
            return null;
    }
}

const GRID_LIGHT: React.CSSProperties = {
    backgroundImage: [
        "linear-gradient(0deg,transparent 24%,rgba(0,0,0,.06) 25%,rgba(0,0,0,.06) 26%,transparent 27%,transparent 74%,rgba(0,0,0,.06) 75%,rgba(0,0,0,.06) 76%,transparent 77%)",
        "linear-gradient(90deg,transparent 24%,rgba(0,0,0,.06) 25%,rgba(0,0,0,.06) 26%,transparent 27%,transparent 74%,rgba(0,0,0,.06) 75%,rgba(0,0,0,.06) 76%,transparent 77%)",
    ].join(","),
    backgroundSize: "50px 50px",
    backgroundColor: "rgb(250,245,230)",
};

const GRID_DARK: React.CSSProperties = {
    backgroundImage: [
        "linear-gradient(0deg,transparent 24%,rgba(255,255,255,.08) 25%,rgba(255,255,255,.08) 26%,transparent 27%,transparent 74%,rgba(255,255,255,.08) 75%,rgba(255,255,255,.08) 76%,transparent 77%)",
        "linear-gradient(90deg,transparent 24%,rgba(255,255,255,.08) 25%,rgba(255,255,255,.08) 26%,transparent 27%,transparent 74%,rgba(255,255,255,.08) 75%,rgba(255,255,255,.08) 76%,transparent 77%)",
    ].join(","),
    backgroundSize: "50px 50px",
    backgroundColor: "#04060A",
};

// ─── Slide variants: direction-aware, spring physics ──────────────────────

function getSlideVariants(direction: 1 | -1) {
    return {
        enter: { x: direction * 72, opacity: 0, scale: 0.98 },
        center: {
            x: 0, opacity: 1, scale: 1,
            transition: { type: "spring" as const, stiffness: 260, damping: 20 },
        },
        exit: {
            x: direction * -72, opacity: 0, scale: 0.98,
            transition: { duration: 0.15, ease: "easeIn" as const },
        },
    };
}

// ─── Progress Bar ─────────────────────────────────────────────────────────

const SECTION_COLORS: Record<string, string> = {
    identitas: "bg-yellow-400 dark:bg-yellow-500",
    pengetahuan: "bg-lime-400 dark:bg-lime-500",
    sikap: "bg-cyan-400 dark:bg-cyan-500",
    konfirmasi: "bg-black dark:bg-white",
};

function ProgressBar({ currentStep }: { currentStep: number }) {
    const steps = STEP_META.slice(1);

    return (
        <div className="max-w-2xl mx-auto mb-8">
            <div className="flex justify-between items-center mb-3">
                <span className="font-black uppercase tracking-widest text-xs text-black dark:text-white">
                    {STEP_META[currentStep]?.label ?? ""}
                </span>
                <span className="font-black text-xs text-gray-600 dark:text-gray-400">
                    {currentStep} / {TOTAL_STEPS}
                </span>
            </div>

            <div className="flex gap-1.5 h-4 rounded-lg overflow-hidden border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                {steps.map((meta, i) => {
                    const filled = i + 1 <= currentStep;
                    const colorClass = SECTION_COLORS[meta.section] ?? "bg-gray-400";
                    return (
                        <motion.div
                            key={meta.label}
                            className={`flex-1 ${filled ? colorClass : "bg-gray-200 dark:bg-gray-700"}`}
                            initial={false}
                            animate={{ opacity: filled ? 1 : 0.4 }}
                            transition={{ duration: 0.3 }}
                        />
                    );
                })}
            </div>

            <div className="flex justify-between mt-2 px-0.5">
                {["Data Diri", "Pengetahuan", "Sikap", "Kirim"].map((label) => (
                    <span key={label} className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {label}
                    </span>
                ))}
            </div>
        </div>
    );
}

function StepPlaceholder({ step, label }: { step: number; label: string }) {
    return (
        <div className="max-w-2xl mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl border-4 border-black dark:border-white bg-gray-200 dark:bg-gray-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6">
                <span className="font-black text-2xl text-black dark:text-white">{step}</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-black dark:text-white mb-3">{label}</h2>
            <p className="font-bold text-gray-500 dark:text-gray-400 text-sm">Step ini sedang dalam pengembangan.</p>
        </div>
    );
}

// ─── Page entry animation ──────────────────────────────────────────────────

const pageVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1, y: 0,
        transition: { type: "spring" as const, stiffness: 200, damping: 22, delay: 0.05 },
    },
};

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function KuesionerPage() {
    const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
    const [mounted, setMounted] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as FormState;
                // Always force step 0 on fresh mount — preserve answers, reset position
                dispatch({ type: "HYDRATE", payload: { ...parsed, currentStep: 0 } });
            }
        } catch { /* silent */ }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || state.currentStep === 0) return;
        try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
        catch { /* silent */ }
    }, [state, mounted]);

    const handleNext = useCallback(() => {
        const error = validateStep(state.currentStep, state);
        if (error) { setValidationError(error); return; }
        setValidationError(null);
        dispatch({ type: "NEXT_STEP" });
    }, [state]);

    const handleBack = useCallback(() => { setValidationError(null); dispatch({ type: "PREV_STEP" }); }, []);
    const handleStart = useCallback(() => { setValidationError(null); dispatch({ type: "NEXT_STEP" }); }, []);

    const slideVariants = getSlideVariants(state.direction);
    const showProgress = state.currentStep > 0;

    // Ganti fungsi renderStep():
    function renderStep() {
        switch (state.currentStep) {
            case 0: return <StepWelcome onStart={handleStart} />;
            case 1: return (
                <StepDataDiri
                    data={state.dataDiri}
                    onChange={(payload: Partial<DataDiri>) => dispatch({ type: "SET_DATA_DIRI", payload })}
                />
            );
            default: return (
                <StepPlaceholder
                    step={state.currentStep}
                    label={STEP_META[state.currentStep]?.label ?? `Step ${state.currentStep}`}
                />
            );
        }
    }

    return (
        // ↓ motion.main — page entry animation on every mount
        <motion.main
            className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 overflow-hidden"
            style={GRID_LIGHT}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Dark mode grid overlay */}
            <div className="hidden dark:block absolute inset-0 pointer-events-none" style={GRID_DARK} />

            <div className="relative z-10">

                {/* Progress bar */}
                <AnimatePresence>
                    {showProgress && (
                        <motion.div
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } }}
                            exit={{ opacity: 0, y: -16, transition: { duration: 0.15 } }}
                        >
                            <ProgressBar currentStep={state.currentStep} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Step content — direction-aware slide transition */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={state.currentStep}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>

                {/* Validation error */}
                <AnimatePresence>
                    {validationError && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="max-w-2xl mx-auto mt-6 p-4 rounded-xl border-4 border-red-500 bg-red-50 dark:bg-red-500/10 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]"
                        >
                            <p className="font-bold text-sm text-red-700 dark:text-red-400">⚠️ {validationError}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation buttons */}
                {state.currentStep > 0 && state.currentStep < TOTAL_STEPS && (
                    <div className="max-w-2xl mx-auto mt-8 flex gap-4">

                        {/* ← Kembali */}
                        <motion.button
                            onClick={handleBack}
                            animate={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
                            whileHover={{ y: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                            whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="flex-1 py-4 rounded-xl border-4 border-black bg-white text-black font-black uppercase tracking-widest text-base"
                        >
                            ← Kembali
                        </motion.button>

                        {/* Lanjut → */}
                        <motion.button
                            onClick={handleNext}
                            animate={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                            whileHover={{ y: -3, boxShadow: "9px 9px 0px 0px rgba(0,0,0,1)", scale: 1.01 }}
                            whileTap={{ x: 6, y: 6, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)", scale: 0.99 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="flex-[2] py-4 rounded-xl border-4 border-black bg-lime-400 text-black font-black uppercase tracking-widest text-base"
                        >
                            Lanjut →
                        </motion.button>

                    </div>
                )}
            </div>
        </motion.main>
    );
}