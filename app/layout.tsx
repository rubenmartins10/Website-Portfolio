import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
// Update the import path if Footer is located elsewhere, for example:
import Footer from "../components/layout/Footer";
// Or, if the file is named Footer.tsx/jsx and is in the correct folder, ensure it exists at 'website-pessoal/components/Footer.tsx'

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
        <Navbar />
        {/* O 'children' é a página atual (a Home, a página de Projetos, etc.) */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}