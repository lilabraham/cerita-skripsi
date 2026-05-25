/*layout.tsx*/

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "CERITA | Cegah Edukasi Remaja Tanpa HIV/AIDS",
  description: "Platform edukasi HIV/AIDS yang modern, interaktif, dan asik untuk remaja.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn(jakarta.variable, space.variable)} suppressHydrationWarning>
      
      {/* ✅ Injeksi 2: Tambahkan warna terang (bg-gray-50 & text-gray-900) dan transisi halus */}
      <body className="bg-gray-50 dark:bg-[#0a0a0f] text-gray-900 dark:text-white font-sans antialiased transition-colors duration-300">
        
        {/* ✅ Injeksi 3: Bungkus komponen dengan ThemeProvider persis tanpa merombak isinya */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>

      </body>
    </html>
  );
}