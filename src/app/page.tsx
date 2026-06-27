import FirstVisitTracker from "@/components/FirstVisitTracker";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CTASection from "@/components/sections/CTASection";
import MarqueeBanner from "@/components/ui/MarqueeBanner";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function Home() {

  return (
    <>
    <FirstVisitTracker /> 
      <main className="flex flex-col min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">

        {/* 1. HERO SECTION */}
        <HeroSection />

        {/* ① Hero → Stats: Kanan ke Kiri, latar kuning */}
        <MarqueeBanner
          direction="rtl"
          bg="bg-[#FFF000] dark:bg-yellow-500"
          textColor="text-black font-black"
          borderColor="border-black dark:border-white/20"
        />

        {/* 2. STATS SECTION */}
        <StatsSection />

        {/* ② Stats → Features: Kiri ke Kanan, latar pink */}
        <MarqueeBanner
          direction="ltr"
          bg="bg-[#FF2D78] dark:bg-pink-700"
          textColor="text-white font-black"
          borderColor="border-black dark:border-white/20"
        />

        {/* 3. FEATURES SECTION */}
        <FeaturesSection />

        {/* ③ Features → CTA: Kiri ke Kanan, latar hitam */}
        <MarqueeBanner
          direction="rtl"
          bg="bg-black dark:bg-slate-950"
          textColor="text-[#FFF000] font-black"
          borderColor="border-black dark:border-white/20"
        />

        {/* 4. CTA SECTION */}
        <CTASection />

      </main>

      {/* Floating UI — page-level, di luar <main> */}
      <ScrollIndicator text="Scroll untuk eksplor lebih lanjut" />
    </>

  );
}