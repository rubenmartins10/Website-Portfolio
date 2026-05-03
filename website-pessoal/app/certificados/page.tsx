// app/certificados/page.tsx
import { certificados } from "#site/content";
import { Metadata } from "next";
import CertificadosGrid from "@/components/certificados/CertificadosGrid";
import StarfieldCanvas from "@/components/home/StarfieldCanvas";

export const metadata: Metadata = {
  title: "Certifications | Rúben Martins",
  description: "My certifications and training in Computer Science.",
};

export default function CertificadosPage() {
  const certificadosOrdenados = [...certificados].sort((a, b) =>
    new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  return (
    <>
      <StarfieldCanvas />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28 w-full">
        <header className="mb-20">
          <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-4">EDUCATION</div>
          <h1 className="font-mono font-black text-white text-3xl md:text-5xl uppercase tracking-widest mb-6 flex items-center gap-4">
            <span className="w-2 md:w-3 h-10 md:h-12 bg-emerald-400 block rounded-r-lg shrink-0" />
            CERTIFICATIONS
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-3xl leading-relaxed font-mono">
            I believe in continuous learning as the greatest driver of professional growth.{" "}
            <strong className="text-emerald-400 font-semibold">Click a certificate</strong> to explore the skills and what I learned.
          </p>
        </header>

        {certificadosOrdenados.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-white/2 p-16 text-center">
            <p className="font-mono text-zinc-500 text-xs tracking-widest">NO CERTIFICATIONS YET</p>
          </div>
        ) : (
          <CertificadosGrid certificados={certificadosOrdenados} />
        )}
      </div>
    </>
  );
}