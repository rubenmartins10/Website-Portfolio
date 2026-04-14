// app/projetos/page.tsx
import { projetos } from "#site/content";
import { Metadata } from "next";
import ProjetosGrid from "@/components/projetos/ProjetosGrid";

export const metadata: Metadata = {
  title: "Projetos | Rúben Martins",
  description: "Portefólio de projetos e aplicações desenvolvidas.",
};

export default function ProjetosPage() {
  // Ordena os projetos do mais recente para o mais antigo
  const projetosOrdenados = [...projetos].sort((a, b) => 
    new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 w-full">
      
      {/* Cabeçalho */}
      <header className="mb-16 border-b border-zinc-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Projetos
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Uma coleção de aplicações reais, sistemas descentralizados e desafios técnicos que tenho construído. Clica num projeto para ver a galeria e as tecnologias usadas.
        </p>
      </header>

      {projetosOrdenados.length === 0 ? (
        <div className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900/30 text-center">
          <p className="text-zinc-500 text-lg">Ainda não adicionei projetos pelo painel.</p>
        </div>
      ) : (
        <ProjetosGrid projetos={projetosOrdenados} />
      )}
    </div>
  );
}