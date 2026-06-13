// src/app/(routes)/forum/page.tsx
"use client";

import { useReducer, useEffect, useCallback, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FormState, FormAction, DataDiri, JawabanBS, JawabanSikap } from "@/types/questionnaire";
import { STEP_META, TOTAL_STEPS, SLICES } from "@/data/questionnaire-data";
import StepWelcome from "@/components/kuesioner/StepWelcome";
import StepDataDiri from "@/components/kuesioner/StepDataDiri";
import StepPengetahuan from "@/components/kuesioner/StepPengetahuan";
import StepSikap from "@/components/kuesioner/StepSikap";

// ─── Constants ────────────────────────────────────────────────────────────

const DEFAULT_STATE: FormState = {
    currentStep: 0,
    direction: 1,
    dataDiri: { nama: "", umur: "", jenisKelamin: "", kelas: "", sumberInformasi: "" },
    pengetahuan: {},
    sikap: {},
};

const STORAGE_KEY = "cerita_kuesioner_draft";

// ─── Reducer ──────────────────────────────────────────────────────────────

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

// ─── Validation ───────────────────────────────────────────────────────────

function validateStep(step: number, state: FormState): string | null {
    switch (step) {
        case 1: {
            if (!state.dataDiri.nama.trim()) return "Nama / inisial wajib diisi.";
            if (!state.dataDiri.umur) return "Umur wajib diisi.";
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

// ─── Styles ───────────────────────────────────────────────────────────────

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

// ─── Motion helpers ───────────────────────────────────────────────────────

function getSlideVariants(direction: 1 | -1) {
    return {
        enter: { x: direction * 72, opacity: 0, scale: 0.98 },
        center: { x: 0, opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
        exit: { x: direction * -72, opacity: 0, scale: 0.98, transition: { duration: 0.15, ease: "easeIn" as const } },
    };
}

const pageVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 22, delay: 0.05 } },
};

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

// ─── Step Konfirmasi (inline — simple, no separate file needed yet) ───────

function StepKonfirmasi({ state, onBack, onSubmit }: {
    state: FormState;
    onBack: () => void;
    onSubmit: () => void;
}) {
    const totalPengetahuan = Object.keys(state.pengetahuan).length;
    const totalSikap = Object.keys(state.sikap).length;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden mb-6">
                {/* Header */}
                <div className="px-6 py-4 border-b-4 border-black bg-lime-400">
                    <h2 className="font-black text-2xl uppercase tracking-tighter text-black">
                        Konfirmasi Jawaban
                    </h2>
                    <p className="font-bold text-sm text-black/70 mt-1">
                        Periksa kembali sebelum mengirimkan.
                    </p>
                </div>

                {/* Summary rows */}
                <div className="divide-y-4 divide-black">
                    {/* Data Diri */}
                    <div className="px-6 py-4">
                        <p className="font-black text-xs uppercase tracking-widest text-gray-500 mb-3">Data Diri</p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            {[
                                ["Nama", state.dataDiri.nama || "—"],
                                ["Umur", state.dataDiri.umur ? `${state.dataDiri.umur} tahun` : "—"],
                                ["Jenis Kelamin", state.dataDiri.jenisKelamin === "L" ? "Laki-laki" : state.dataDiri.jenisKelamin === "P" ? "Perempuan" : "—"],
                                ["Kelas", state.dataDiri.kelas || "—"],
                                ["Sumber Info", state.dataDiri.sumberInformasi || "—"],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
                                    <p className="font-black text-sm text-black dark:text-white">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Jawaban counts */}
                    <div className="px-6 py-4 flex gap-6">
                        <div className="flex-1 bg-lime-400 border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <p className="text-[10px] font-black uppercase tracking-widest text-black/60">Pengetahuan</p>
                            <p className="font-black text-3xl text-black">{totalPengetahuan}<span className="text-sm font-bold">/24</span></p>
                            <p className="text-xs font-bold text-black/70">soal terjawab</p>
                        </div>
                        <div className="flex-1 bg-cyan-400 border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <p className="text-[10px] font-black uppercase tracking-widest text-black/60">Sikap</p>
                            <p className="font-black text-3xl text-black">{totalSikap}<span className="text-sm font-bold">/23</span></p>
                            <p className="text-xs font-bold text-black/70">soal terjawab</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nav buttons */}
            <div className="flex gap-4">
                <motion.button
                    onClick={onBack}
                    animate={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
                    whileHover={{ y: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                    whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex-1 py-4 rounded-xl border-4 border-black bg-white text-black font-black uppercase tracking-widest text-base"
                >
                    ← Kembali
                </motion.button>
                <motion.button
                    onClick={onSubmit}
                    animate={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                    whileHover={{ y: -3, boxShadow: "9px 9px 0px 0px rgba(0,0,0,1)", scale: 1.01 }}
                    whileTap={{ x: 6, y: 6, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)", scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex-[2] py-4 rounded-xl border-4 border-black bg-black text-white font-black uppercase tracking-widest text-base"
                >
                    Kirim Jawaban ✓
                </motion.button>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────

export default function KuesionerPage() {
    const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
    const [mounted, setMounted] = useState(false);
    const [validationError, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    // Hydrate from sessionStorage
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as FormState;
                dispatch({ type: "HYDRATE", payload: { ...parsed, currentStep: 0 } });
            }
        } catch { /* silent */ }
        setMounted(true);
    }, []);

    // Persist to sessionStorage (skip step 0 and post-submit)
    useEffect(() => {
        if (!mounted || state.currentStep === 0) return;
        try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
        catch { /* silent */ }
    }, [state, mounted]);

    // ─── Handlers ─────────────────────────────────────────────────────────

    const handleNext = useCallback(() => {
        const error = validateStep(state.currentStep, state);
        if (error) { setError(error); return; }
        setError(null);
        dispatch({ type: "NEXT_STEP" });
    }, [state]);

    const handleBack = useCallback(() => { setError(null); dispatch({ type: "PREV_STEP" }); }, []);
    const handleStart = useCallback(() => { setError(null); dispatch({ type: "NEXT_STEP" }); }, []);

    const handlePengetahuan = useCallback((key: string, value: JawabanBS) => {
        dispatch({ type: "SET_PENGETAHUAN", payload: { key, value } });
    }, []);

    const handleSikap = useCallback((key: string, value: JawabanSikap) => {
        dispatch({ type: "SET_SIKAP", payload: { key, value } });
    }, []);

    const handleSubmit = useCallback(() => {
        // TODO: replace with actual API call
        console.log("Submitting:", { dataDiri: state.dataDiri, pengetahuan: state.pengetahuan, sikap: state.sikap });
        try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* silent */ }
        setSubmitted(true);
    }, [state]);

    // ─── Step content — memoised, re-evaluates only when step/answers change

    const stepContent = useMemo(() => {
        switch (state.currentStep) {
            case 0: return <StepWelcome onStart={handleStart} />;
            case 1: return (
                <StepDataDiri
                    data={{
                        ...DEFAULT_STATE.dataDiri,  // ← fallback semua field ke ""
                        ...state.dataDiri,
                    }}
                    onChange={(payload: Partial<DataDiri>) =>
                        dispatch({ type: "SET_DATA_DIRI", payload })
                    }
                />
            );
            case 2: return (
                <StepPengetahuan
                    questions={SLICES.pengetahuan1}
                    answers={state.pengetahuan}
                    onChange={handlePengetahuan}
                    part={1}
                />
            );
            case 3: return (
                <StepPengetahuan
                    questions={SLICES.pengetahuan2}
                    answers={state.pengetahuan}
                    onChange={handlePengetahuan}
                    part={2}
                />
            );
            case 4: return (
                <StepSikap
                    questions={SLICES.sikap1}
                    answers={state.sikap}
                    onChange={handleSikap}
                    part={1}
                />
            );
            case 5: return (
                <StepSikap
                    questions={SLICES.sikap2}
                    answers={state.sikap}
                    onChange={handleSikap}
                    part={2}
                />
            );
            case 6: return (
                <StepKonfirmasi
                    state={state}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                />
            );
            default: return null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.currentStep, state.dataDiri, state.pengetahuan, state.sikap]);

    // ─── Post-submit screen ───────────────────────────────────────────────

    if (submitted) {
        return (
            <motion.main
                className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center"
                style={GRID_LIGHT}
                variants={pageVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="hidden dark:block absolute inset-0 pointer-events-none" style={GRID_DARK} />
                <div className="relative z-10 max-w-md w-full text-center">
                    <div className="bg-lime-400 border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-10">
                        <p className="text-6xl mb-4">🎉</p>
                        <h2 className="font-black text-3xl uppercase tracking-tighter text-black mb-2">
                            Terima Kasih!
                        </h2>
                        <p className="font-bold text-black/70 text-sm">
                            Jawaban kamu telah berhasil dikirim.
                        </p>
                    </div>
                </div>
            </motion.main>
        );
    }

    const slideVariants = getSlideVariants(state.direction);
    const isLastStep = state.currentStep === TOTAL_STEPS;  // step 6 — nav handled internally
    const showProgress = state.currentStep > 0;
    const showStdNav = state.currentStep > 0 && !isLastStep;

    return (
        <motion.main
            className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 overflow-hidden"
            style={GRID_LIGHT}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
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

                {/* Step content */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={state.currentStep}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                    >
                        {stepContent}
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

                {/* Standard nav — steps 1–5 only; step 6 owns its own buttons */}
                {showStdNav && (
                    <div className="max-w-2xl mx-auto mt-8 flex gap-4">
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