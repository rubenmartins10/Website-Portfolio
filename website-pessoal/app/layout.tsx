import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CustomCursor from "../components/animations/CustomCursor";
import GreenTrail from "../components/animations/GreenTrail";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceMono = Space_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Rúben Martins | Portfolio",
  description: "Rúben Martins' professional portfolio — Junior Engineer specializing in Data, AI & ML.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceMono.variable} bg-[#08090c] text-zinc-100 min-h-screen flex flex-col`}>
        {/* Cursor importado normalmente. Como tem 'use client' lá dentro, o GSAP só corre no browser! */}
        <CustomCursor />
        <GreenTrail />
        
        <Navbar />
        
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}