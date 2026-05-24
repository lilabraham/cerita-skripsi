/**
 * CERITA Design Tokens
 * Sumber kebenaran visual seluruh project.
 * Semua nilai di sini harus sinkron dengan CSS custom properties di globals.css
 */

export const colors = {
  // --- Background Layers (dark surface system) ---
  bgBase:     "#0a0a0f",   // Paling dalam — body background
  bgSurface:  "#0f0f1a",   // Cards, panels
  bgElevated: "#16162a",   // Hover state, modal
  bgOverlay:  "#1e1e35",   // Dropdown, tooltip

  // --- Brand Primary (Indigo) ---
  primary50:  "#eef2ff",
  primary100: "#e0e7ff",
  primary300: "#a5b4fc",
  primary400: "#818cf8",
  primary500: "#6366f1",   // Main CTA
  primary600: "#4f46e5",   // Hover CTA
  primary700: "#4338ca",

  // --- Brand Secondary (Teal/Mint) ---
  secondary300: "#5eead4",
  secondary400: "#2dd4bf",
  secondary500: "#14b8a6",  // Supporting actions
  secondary600: "#0d9488",

  // --- Accent (Coral/Orange — gamification, highlights) ---
  accent300: "#fdba74",
  accent400: "#fb923c",
  accent500: "#f97316",     // Badges, rewards, alerts

  // --- Semantic ---
  success: "#34d399",       // Quiz benar, completed
  danger:  "#f43f5e",       // Quiz salah, error
  warning: "#fbbf24",       // Terkunci, perhatian
  info:    "#38bdf8",       // Info neutral

  // --- Neutral (Text hierarchy) ---
  textPrimary:   "#ffffff",
  textSecondary: "#a1a1aa",  // gray-400
  textMuted:     "#52525b",  // gray-600
  textDisabled:  "#3f3f46",  // gray-700
} as const;

export const typography = {
  // Font families
  fontSans:    "var(--font-jakarta)",   // Plus Jakarta Sans — body
  fontDisplay: "var(--font-space)",     // Space Grotesk — heading/display

  // Type scale (px → rem reference)
  // Display: sidang-worthy, hero headline
  displayXl:  { size: "72px",  lineHeight: "1.05", weight: "800", tracking: "-0.03em" },
  displayLg:  { size: "60px",  lineHeight: "1.1",  weight: "800", tracking: "-0.02em" },
  displayMd:  { size: "48px",  lineHeight: "1.15", weight: "700", tracking: "-0.02em" },

  // Headings: section titles
  h1: { size: "40px", lineHeight: "1.2",  weight: "700", tracking: "-0.01em" },
  h2: { size: "32px", lineHeight: "1.25", weight: "700", tracking: "-0.01em" },
  h3: { size: "24px", lineHeight: "1.3",  weight: "600", tracking: "0" },
  h4: { size: "20px", lineHeight: "1.4",  weight: "600", tracking: "0" },

  // Body: content, paragraphs
  bodyLg: { size: "18px", lineHeight: "1.75", weight: "400" },
  bodyMd: { size: "16px", lineHeight: "1.7",  weight: "400" },
  bodySm: { size: "14px", lineHeight: "1.6",  weight: "400" },

  // UI: labels, captions, badges
  labelLg: { size: "14px", lineHeight: "1.4", weight: "600", tracking: "0.01em" },
  labelSm: { size: "12px", lineHeight: "1.4", weight: "500", tracking: "0.02em" },
  caption: { size: "12px", lineHeight: "1.5", weight: "400" },
} as const;

export const spacing = {
  // Base 4px grid
  1:  "4px",
  2:  "8px",
  3:  "12px",
  4:  "16px",
  5:  "20px",
  6:  "24px",
  8:  "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",

  // Section spacing (vertikal antar section)
  sectionSm: "64px",
  sectionMd: "96px",
  sectionLg: "128px",
} as const;

export const radius = {
  sm:   "8px",
  md:   "12px",
  lg:   "16px",
  xl:   "20px",
  "2xl":"24px",
  full: "9999px",  // pills, badges
} as const;

export const shadows = {
  // Glow shadows — untuk dark mode premium feel
  glowPrimary:   "0 0 40px rgba(99, 102, 241, 0.15)",
  glowSecondary: "0 0 40px rgba(20, 184, 166, 0.12)",
  glowAccent:    "0 0 40px rgba(249, 115, 22, 0.12)",

  // Elevation shadows — dark mode friendly
  elevationSm: "0 2px 8px rgba(0,0,0,0.4)",
  elevationMd: "0 8px 24px rgba(0,0,0,0.5)",
  elevationLg: "0 16px 48px rgba(0,0,0,0.6)",

  // Card inner border glow
  cardBorder: "inset 0 1px 0 rgba(255,255,255,0.06)",
} as const;

export const animation = {
  // Duration
  fast:   "150ms",
  normal: "250ms",
  slow:   "400ms",
  slower: "600ms",

  // Easing — semua berbasis cubic-bezier untuk feel premium
  easeOut:    "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  easeIn:     "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  easeInOut:  "cubic-bezier(0.645, 0.045, 0.355, 1)",
  spring:     "cubic-bezier(0.34, 1.56, 0.64, 1)",   // slight overshoot — Gen Z feel
  decelerate: "cubic-bezier(0.0, 0.0, 0.2, 1)",       // masuk cepat, berhenti halus
} as const;

// Framer Motion reusable variants — import dari sini ke komponen manapun
export const motionVariants = {
  fadeUp: {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  scaleIn: {
    hidden:  { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
  },
  staggerContainer: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  },
} as const;