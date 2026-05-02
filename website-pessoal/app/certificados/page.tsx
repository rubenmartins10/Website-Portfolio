// app/certificados/page.tsx
import { certificados } from "#site/content";
import { Metadata } from "next";
import CertificadosGrid from "@/components/certificados/CertificadosGrid";

export const metadata: Metadata = {
  title: "Certifications | Rúben Martins",
  description: "My certifications and training in Computer Science.",
};

export default function CertificadosPage() {
  const certificadosOrdenados = [...certificados].sort((a, b) =>
    new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 w-full">
      <header className="mb-14">
        <p className="section-label mb-2">Education</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Certifications</h1>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
          I believe in continuous learning as the greatest driver of professional growth.{" "}
          <strong className="text-zinc-300 font-medium">Click a certificate</strong> to explore the skills and what I learned.
        </p>
        <div className="glow-line w-20 mt-6" />
      </header>

      {certificadosOrdenados.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-16 text-center">
          <p className="text-zinc-500 text-sm">No certifications processed yet.</p>
        </div>
      ) : (
        <CertificadosGrid certificados={certificadosOrdenados} />
      )}
    </div>
  );
}