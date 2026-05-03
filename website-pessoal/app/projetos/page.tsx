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
        <header className="mb-20 text-center">
          <h1 className="font-black text-white text-4xl md:text-6xl mb-4">
            <span className="text-cyan-400">Featured</span> Projects
          </h1>
          <div className="w-14 h-0.5 bg-cyan-400 mx-auto mb-5" />
          <p className="text-zinc-500 text-sm md:text-base">
            Swipe to explore my latest work
          </p>
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
