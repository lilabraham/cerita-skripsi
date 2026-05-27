// C:\Users\LENOVO\Documents\cerita-app\src\components\ui\MarqueeBanner.tsx
"use client";
import { cn } from "@/lib/utils";

const SEGMENT =
  "\u00A0\u00A0•\u00A0CEGAH HIV/AIDS\u00A0\u00A0•\u00A0EDUKASI REMAJA\u00A0\u00A0•\u00A0PENGETAHUAN ADALAH SENJATA";

interface MarqueeBannerProps {
  direction?: "rtl" | "ltr";
  bg?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
}

export default function MarqueeBanner({
  direction = "rtl",
  bg = "bg-[#FFF000]",
  textColor = "text-black",
  borderColor = "border-black dark:border-white/20",
  className,
}: MarqueeBannerProps) {
  // 16 repetitions → satu copy pasti lebih lebar dari viewport manapun
  const content = Array(16).fill(SEGMENT).join("");

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border-y-4 py-3.5 z-20",
        bg,
        borderColor,
        className,
      )}
    >
      {/* Dua copy identik berdampingan → loop seamless */}
<div
        className={cn(
          "flex whitespace-nowrap w-max hover:[animation-play-state:paused]", // <-- Tambahkan baris ini
          direction === "rtl" ? "animate-marquee-rtl" : "animate-marquee-ltr",
        )}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className={cn(
              "inline-block text-xs font-black uppercase tracking-[0.22em]",
              textColor,
            )}
          >
            {content}
          </span>
        ))}
      </div>
    </div>
  );
}