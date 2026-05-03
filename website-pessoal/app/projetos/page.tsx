import { projetos } from "#site/content";
import { Metadata } from "next";
import ProjetosGrid from "@/components/projetos/ProjetosGrid";
import StarfieldCanvas from "@/components/home/StarfieldCanvas";

export const metadata: Metadata = {
  title: "Projects | Rúben Martins",
  description: "Portfolio of projects and applications developed by Rúben Martins.",
};

export default function ProjetosPage() {
  const projetosOrdenados = [...projetos].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  return (
    <>
      <StarfieldCanvas />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28 w-full">
        {/* Header */}
        <header className="mb-20">
          <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-4">PROJECTS</div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-0 flex items-center gap-4 uppercase tracking-widest">
            <span className="w-2 md:w-3 h-10 md:h-12 bg-emerald-400 block rounded-r-lg shrink-0" />
            FEATURED PROJECTS
          </h1>
        </header>

        {projetosOrdenados.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-white/2 p-16 text-center">
            <p className="font-mono text-zinc-500 text-xs tracking-widest">NO PROJECTS ADDED YET</p>
          </div>
        ) : (
          <ProjetosGrid projetos={projetosOrdenados} />
        )}
      </div>
    </>
  );
}
