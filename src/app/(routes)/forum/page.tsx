// src/app/(routes)/forum/page.tsx
"use client";

import { useReducer, useEffect, useCallback, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Lock } from "lucide-react";
import type { FormState, FormAction, DataDiri, JawabanBS, JawabanSikap } from "@/types/questionnaire";
import { STEP_META, TOTAL_STEPS, SLICES } from "@/data/questionnaire-data";
import StepWelcome from "@/components/kuesioner/StepWelcome";
import StepDataDiri from "@/components/kuesioner/StepDataDiri";
import StepPengetahuan from "@/components/kuesioner/StepPengetahuan";
import StepSikap from "@/components/kuesioner/StepSikap";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

// ─── Di LUAR komponen ──────────────────────────────────────────────
const LECTURER_MODE = process.env.NEXT_PUBLIC_LECTURER_MODE === "true";

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


// ─── Decorative: Floating Virus ───────────────────────────────────────────────

interface FloatingVirusProps {
    size: number;
    fillClass: string; // Tailwind fill utility incl. dark: variant
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    floatDuration?: number;
    rotateDuration?: number;
    initialY?: number;
}

function FloatingVirus({
    size, fillClass, top, left, right, bottom,
    floatDuration = 4, rotateDuration = 12, initialY = 0,
}: FloatingVirusProps) {
    const spikes = 10;
    const cx = size / 2;
    const cy = size / 2;
    const outerR = size / 2 - 1;
    const innerR = outerR * 0.62;

    const points: string[] = [];
    for (let i = 0; i < spikes * 2; i++) {
        const angle = (Math.PI / spikes) * i - Math.PI / 2;
        const r = i % 2 === 0 ? outerR : innerR;
        points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    const pathD = `M${points.join("L")}Z`;

    return (
        <motion.div
            className="absolute pointer-events-none select-none"
            style={{ top, left, right, bottom, width: size, height: size }}
            initial={{ y: initialY }}
            animate={{ y: [initialY, initialY - 18, initialY] }}
            transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
        >
            <motion.svg
                width={size} height={size} viewBox={`0 0 ${size} ${size}`}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: rotateDuration, repeat: Infinity, ease: "linear" }}
            >
                {/* No fill attribute — driven entirely by Tailwind CSS class */}
                <path d={pathD} className={fillClass} />
                <circle cx={cx} cy={cy} r={innerR * 0.55} className={fillClass} />
            </motion.svg>
        </motion.div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────

export default function KuesionerPage() {
    const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
    const [mounted, setMounted] = useState(false);
    const [validationError, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isAlreadyDone, setIsAlreadyDone] = useState(false);
    const [isLockedByTime, setIsLockedByTime] = useState(false);
    const [unlockDateText, setUnlockDateText] = useState("");

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

    useEffect(() => {
        if (!mounted) return;
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch { /* silent */ }
    }, [state, mounted]);

    useEffect(() => {
        if (localStorage.getItem("hasCompletedPostTest") === "true") {
            setIsAlreadyDone(true);
        }
        if (!LECTURER_MODE) {
            const raw = localStorage.getItem("_crt_init_ts");
            if (raw) {
                try {
                    const firstVisit = Number(atob(raw));
                    const unlockTime = firstVisit + 3 * 24 * 60 * 60 * 1000;
                    if (Date.now() < unlockTime) {
                        setIsLockedByTime(true);
                        setUnlockDateText(
                            new Date(unlockTime).toLocaleString("id-ID", {
                                day: "numeric", month: "long", year: "numeric",
                                hour: "2-digit", minute: "2-digit",
                            })
                        );
                    }
                } catch { /* silent */ }
            }
        }
    }, []);

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

        // Tandai permanen bahwa user sudah menyelesaikan kuesioner ini
        try { localStorage.setItem("hasCompletedPostTest", "true"); } catch { /* silent */ }

        setSubmitted(true);
    }, [state]);

    // ─── Step content — memoised, re-evaluates only when step/answers change

    const dataDiriKey = JSON.stringify(state.dataDiri);
    const pengetahuanKey = JSON.stringify(state.pengetahuan);
    const sikapKey = JSON.stringify(state.sikap);

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
    }, [state.currentStep, dataDiriKey, pengetahuanKey, sikapKey]);

    if (!mounted) return null; // gate — cegah flicker sebelum localStorage dibaca

    // ─── Already-completed screen (cek lintas-sesi via localStorage) ──────

    if (isAlreadyDone && !submitted) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4 bg-amber-50 dark:bg-[#04060A]">
                <div className="w-full max-w-md border-4 border-black bg-cyan-300 dark:bg-lime-300 rounded-2xl shadow-[8px_8px_0px_0px_#000] p-8 text-center">
                    <div className="flex justify-center mb-5">
                        <CheckCircle size={88} strokeWidth={2.5} className="text-black" />
                    </div>

                    <h1 className="font-black text-4xl uppercase text-black tracking-tight mb-3">
                        TERIMA KASIH!
                    </h1>

                    <p className="font-semibold text-sm text-black/80 leading-relaxed mb-7">
                        Anda sudah menyelesaikan kuesioner ini. Data hanya dapat diisi satu kali.
                    </p>

                    <Link
                        href="/"
                        className="
                            inline-flex items-center justify-center gap-2
                            px-6 py-3 rounded-xl
                            border-4 border-black bg-black text-yellow-300
                            font-black text-sm uppercase tracking-widest
                            shadow-[4px_4px_0px_0px_#000]
                            hover:translate-x-[-2px] hover:translate-y-[-2px]
                            hover:shadow-[6px_6px_0px_0px_#000]
                            active:translate-x-0 active:translate-y-0
                            active:shadow-[2px_2px_0px_0px_#000]
                            transition-all duration-100
                        "
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </main>
        );
    }

    if (!LECTURER_MODE && isLockedByTime) {
        return (
            <main className="relative min-h-screen overflow-hidden flex items-center justify-center p-6 bg-amber-50 dark:bg-[#04060A]">

                {/* Dot grid — light */}
                <div
                    className="absolute inset-0 pointer-events-none dark:hidden"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.10) 1.5px, transparent 1.5px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                {/* Dot grid — dark */}
                <div
                    className="absolute inset-0 pointer-events-none hidden dark:block"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1.5px, transparent 1.5px)",
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* ── Floating Viruses — fillClass includes dark: variant ── */}
                <FloatingVirus size={120} fillClass="fill-rose-500/20   dark:fill-rose-400/30" top="4%" left="3%" floatDuration={5} rotateDuration={14} initialY={0} />
                <FloatingVirus size={72} fillClass="fill-yellow-500/25 dark:fill-yellow-400/35" top="12%" right="6%" floatDuration={3.5} rotateDuration={9} initialY={-8} />
                <FloatingVirus size={96} fillClass="fill-rose-500/20   dark:fill-rose-500/35" bottom="8%" left="8%" floatDuration={4.5} rotateDuration={18} initialY={4} />
                <FloatingVirus size={56} fillClass="fill-black/10      dark:fill-white/15" bottom="15%" right="4%" floatDuration={3.8} rotateDuration={11} initialY={0} />
                <FloatingVirus size={84} fillClass="fill-yellow-500/20 dark:fill-yellow-300/25" top="42%" left="-2%" floatDuration={6} rotateDuration={22} initialY={-4} />
                <FloatingVirus size={64} fillClass="fill-rose-400/20   dark:fill-rose-300/30" top="30%" right="2%" floatDuration={4.2} rotateDuration={16} initialY={6} />

                {/* ── Card ── */}
                <div className="
        border-4 border-black dark:border-white
        shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)]
        rounded-2xl overflow-hidden max-w-lg w-full relative z-10
      ">

                    {/* Top header bar */}
                    <div className="bg-black dark:bg-white px-5 py-3 flex items-center gap-2 border-b-4 border-black dark:border-white">
                        <div className="w-3 h-3 rounded-full bg-rose-500  border border-white/30 dark:border-black/30 flex-shrink-0" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white/30 dark:border-black/30 flex-shrink-0" />
                        <div className="w-3 h-3 rounded-full bg-lime-400   border border-white/30 dark:border-black/30 flex-shrink-0" />
                        <span className="ml-3 font-black text-xs uppercase tracking-widest text-white dark:text-black">
                            ⚠️ Akses Dibatasi — Post-Test
                        </span>
                    </div>

                    {/* Body */}
                    <div className="bg-rose-200 dark:bg-rose-950 px-6 pt-8 pb-8 flex flex-col items-center gap-6">

                        {/* Lock icon box */}
                        <motion.div
                            className="
              w-24 h-24 rounded-2xl flex items-center justify-center
              bg-white dark:bg-slate-800
              border-4 border-black dark:border-white
              shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]
            "
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Lock size={52} strokeWidth={2.5} className="text-black dark:text-white" />
                        </motion.div>

                        {/* Title + subtitle */}
                        <div className="text-center">
                            <h1 className="font-black text-3xl sm:text-4xl uppercase tracking-tighter text-black dark:text-white leading-none mb-2">
                                KUESIONER<br />DIKUNCI
                            </h1>
                            <p className="font-semibold text-sm text-black/70 dark:text-white/70 leading-relaxed max-w-xs mx-auto">
                                Sesuai prosedur penelitian, Post-Test baru dapat diakses{" "}
                                <span className="font-black text-black dark:text-white">3 hari</span> setelah
                                Anda mulai belajar di platform ini.
                            </p>
                        </div>

                        {/* Unlock date box */}
                        <div className="
            w-full rounded-2xl overflow-hidden
            border-4 border-black dark:border-white
            shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.15)]
          ">
                            {/* Sticker tape */}
                            <div className="bg-yellow-400 dark:bg-yellow-500 border-b-4 border-black dark:border-white px-4 py-1.5">
                                <span className="font-black text-[10px] uppercase tracking-widest text-black">
                                    📅 Dapat Diakses Mulai
                                </span>
                            </div>
                            <div className="px-5 py-4 bg-white dark:bg-slate-800">
                                <p className="font-black text-xl sm:text-2xl text-black dark:text-white tracking-tight leading-snug text-center">
                                    {unlockDateText}
                                </p>
                            </div>
                        </div>

                        {/* Instruction chips */}
                        <div className="flex flex-wrap justify-center gap-2 w-full">
                            {["✅ Selesaikan semua modul", "⏳ Tunggu 3 hari", "📋 Isi Post-Test"].map((chip) => (
                                <span
                                    key={chip}
                                    className="
                  border-2 border-black dark:border-white rounded-full
                  bg-white dark:bg-slate-800
                  px-3 py-1 font-bold text-xs uppercase tracking-widest
                  text-black dark:text-white
                  shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]
                "
                                >
                                    {chip}
                                </span>
                            ))}
                        </div>

                        {/* CTA Button — shadow via Tailwind so dark: variant works */}
                        <motion.div
                            className="
              w-full rounded-xl
              shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]       dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.25)]
              hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[9px_9px_0px_0px_rgba(255,255,255,0.35)]
              transition-shadow duration-100
            "
                            whileHover={{ y: -3 }}
                            whileTap={{ y: 4, x: 4 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <Link
                                href="/"
                                className="
                w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl
                border-4 border-black dark:border-white
                bg-black dark:bg-white
                text-rose-300 dark:text-rose-600
                font-black text-sm uppercase tracking-widest
              "
                            >
                                ← Kembali ke Beranda
                            </Link>
                        </motion.div>

                    </div>
                </div>
            </main>
        );
    }
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
            <ScrollIndicator text="Scroll ke bawah untuk isi kuesioner 👇" />
        </motion.main>
    );
}