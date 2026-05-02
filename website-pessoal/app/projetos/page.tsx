import { projetos } from "#site/content";
import { Metadata } from "next";
import ProjetosGrid from "@/components/projetos/ProjetosGrid";

export const metadata: Metadata = {
  title: "Projects | Rúben Martins",
  description: "Portfolio of projects and applications developed by Rúben Martins.",
};

export default function ProjetosPage() {
  const projetosOrdenados = [...projetos].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-28 w-full">
      {/* Header */}
      <header className="mb-20">
        <p className="section-label mb-2">Portfolio</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Projects</h1>
        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
          Real-world applications, full-stack systems and technical challenges. Click a project to see the gallery,
          technologies and full details.
        </p>
        <div className="glow-line w-20 mt-6" />
      </header>

      {projetosOrdenados.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
          </div>
          <p className="text-zinc-500 text-sm">No projects added yet.</p>
        </div>
      ) : (
        <ProjetosGrid projetos={projetosOrdenados} />
      )}
    </div>
  );
}
