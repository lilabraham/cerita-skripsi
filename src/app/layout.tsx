import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    <html lang="id" className={cn(jakarta.variable, space.variable)}>
      <body className="bg-[#0a0a0f] font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}