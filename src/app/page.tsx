import HeroSection     from "@/components/sections/HeroSection";
import StatsSection    from "@/components/sections/StatsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CTASection      from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}