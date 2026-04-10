import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CustomCursor from "../components/animations/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rúben Martins | Portefólio",
  description: "O meu cantinho na internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 min-h-screen flex flex-col`}>
        {/* Cursor importado normalmente. Como tem 'use client' lá dentro, o GSAP só corre no browser! */}
        <CustomCursor />
        
        <Navbar />
        
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}