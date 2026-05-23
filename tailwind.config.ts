import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",     // Electric Indigo
        secondary: "#2DD4BF",   // Mint/Teal
        accent: "#FF6B6B",      // Vibrant Coral
        background: "#F8FAFC",  // Off-white
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
        heading: ['var(--font-space)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;