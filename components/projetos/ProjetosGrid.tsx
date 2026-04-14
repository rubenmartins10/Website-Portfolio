// components/projetos/ProjetosGrid.tsx
"use client";

import { useState, useMemo } from "react";
import * as runtime from "react/jsx-runtime";
import Image from "next/image";

// 1. O "Descodificador" mágico (Otimizado com useMemo)
function MDXContent({ code }: { code: string }) {
  const Component = useMemo(() => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
  }, [code]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return <Component />;
}

// 2. Tipos de dados do Projeto
type Projeto = {
  nome: string;
  data: string;
  url?: string;
  imagem: string;
  galeria: string[];
  tecnologias: string[];
  destaque: boolean;
  slug: string;
  descricao: string;
};

export default function ProjetosGrid({ projetos }: { projetos: Projeto[] }) {
  const [selected, setSelected] = useState<Projeto | null>(null);

  return (
    <>
      {/* --- GRELHA DE CARTÕES (Pequenos) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projetos.map((projeto) => (
          <div
            key={projeto.slug}
            onClick={() => setSelected(projeto)}
            className="flex flex-col border border-zinc-800 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-emerald-500/50 transition-all overflow-hidden cursor-pointer group"
          >
            {/* Imagem de Capa */}
            <div className="relative w-full aspect-video border-b border-zinc-800 bg-zinc-950 overflow-hidden">
              {projeto.imagem ? (
                <Image
                  src={projeto.imagem}
                  alt={projeto.nome}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-700 text-sm font-medium">
                  Sem capa
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight mb-2">
                {projeto.nome}
              </h2>

              {/* Apenas um "bocadinho" de texto */}
              <div className="line-clamp-3 text-sm text-zinc-400 mb-6 prose prose-invert prose-p:m-0">
                <MDXContent code={projeto.descricao} />
              </div>

              {/* Tecnologias */}
              {projeto.tecnologias && projeto.tecnologias.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto mb-4">
                  {projeto.tecnologias.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 text-[10px] uppercase tracking-wider font-semibold rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {projeto.tecnologias.length > 4 && (
                    <span className="px-2.5 py-1 text-zinc-500 text-[10px] font-bold">
                      +{projeto.tecnologias.length - 4}
                    </span>
                  )}
                </div>
              )}

              <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest group-hover:underline">
                Ver Projeto Completo →
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL / POP-UP (Ao Clicar) --- */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            /* CORREÇÃO: Removido o flex-col, agora é apenas um bloco (block) que faz scroll normalmente */
            className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl block"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de Fechar */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors backdrop-blur-md border border-white/10"
            >
              ✕
            </button>

            {/* Imagem Gigante de Capa (CORREÇÃO: shrink-0 e overflow-hidden garantem que não vaza por cima da galeria) */}
            <div className="w-full aspect-video md:aspect-[21/9] bg-zinc-950 relative border-b border-zinc-800 overflow-hidden shrink-0">
              {selected.imagem && (
                <Image
                  src={selected.imagem}
                  alt={selected.nome}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Galeria de Fotos Extra (CORREÇÃO: shrink-0 para não ser esmagada) */}
            {selected.galeria && selected.galeria.length > 0 && (
              <div className="flex gap-4 p-6 overflow-x-auto bg-zinc-950/50 border-b border-zinc-800 scrollbar-thin scrollbar-thumb-zinc-700 snap-x shrink-0">
                {selected.galeria.map((foto, index) => (
                  <div key={index} className="relative shrink-0 h-32 md:h-48 aspect-video rounded-lg overflow-hidden border border-zinc-700 snap-center bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={foto} 
                      alt={`Galeria ${index}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" 
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Conteúdo do Modal */}
            <div className="p-6 md:p-10 shrink-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                {selected.nome}
              </h2>
              <time className="text-sm text-emerald-400 font-bold uppercase tracking-widest block mb-8">
                {new Date(selected.data).toLocaleDateString('pt-PT', { year: 'numeric', month: 'long' })}
              </time>

              {/* Tecnologias */}
              {selected.tecnologias && selected.tecnologias.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-10">
                  {selected.tecnologias.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-md uppercase tracking-widest"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Texto Inteiro */}
              <div className="prose prose-invert prose-zinc max-w-none mb-10 leading-relaxed text-zinc-300">
                <MDXContent code={selected.descricao} />
              </div>

              {/* Botões Finais */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-800">
                {selected.url && selected.url !== "" ? (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    Ver Repositório no GitHub
                  </a>
                ) : (
                  <span className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 font-bold cursor-not-allowed">
                    Repositório Privado
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}