import { projetos } from "@/.velite"; // <-- Caminho corrigido!
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projetos | Rúben Martins",
  description: "O meu portefólio de projetos de desenvolvimento.",
};

export default function ProjetosPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 w-full">
      <header className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Os Meus Projetos
        </h1>
        <p className="text-zinc-400 text-lg">
          Uma seleção dos trabalhos que desenvolvi, desde experiências a produtos completos.
        </p>
      </header>

      {!projetos || projetos.length === 0 ? (
        <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/30 text-center">
          <p className="text-zinc-500">Ainda não adicionei projetos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projetos.map((projeto) => {
            // Limpamos o link caso o Velite adicione "projetos/" no início
            const urlSlug = projeto.slug.replace('projetos/', '');

            return (
              <div 
                key={projeto.slug} 
                className="flex flex-col p-6 border border-zinc-800 rounded-lg bg-zinc-900/30 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all group"
              >
                {/* Se quiseres mostrar a imagem mais tarde, podes adicionar uma tag <img src={projeto.imagem} /> aqui */}
                
                <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                  {projeto.nome}
                </h2>
                
                <div className="flex gap-4 items-center mb-4 text-sm text-zinc-500">
                  <time>{new Date(projeto.data).toLocaleDateString('pt-PT')}</time>
                </div>

                {projeto.tecnologias && projeto.tecnologias.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projeto.tecnologias.map(tech => (
                      <span key={tech} className="text-xs px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {projeto.url && (
                  <a 
                    href={projeto.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-auto inline-block text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Ver Projeto →
                  </a>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}