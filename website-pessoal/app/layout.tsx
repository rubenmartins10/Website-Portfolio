import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import ConditionalShell from "../components/layout/ConditionalShell";

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
    <html lang="en" className="dark overflow-x-hidden">
      <body className={`${inter.variable} ${spaceMono.variable} bg-zinc-950 text-zinc-100 min-h-screen flex flex-col overflow-x-hidden`}>
        <ConditionalShell>
          {children}
        </ConditionalShell>
      </body>
    </html>
  );
}