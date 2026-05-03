// components/projetos/ProjetosGrid.tsx
"use client";

import { useState, useMemo } from "react";
import * as runtime from "react/jsx-runtime";
import Image from "next/image";

function MDXContent({ code }: { code: string }) {
  const Component = useMemo(() => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
  }, [code]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return <Component />;
}

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
  resumo?: string;
  conquistas: string[];
};

export default function ProjetosGrid({ projetos }: { projetos: Projeto[] }) {
  const [selected, setSelected] = useState<Projeto | null>(null);

  return (
    <>
      {/* FEATURED CARDS */}
      <div className="space-y-8">
        {projetos.map((projeto) => (
          <div
            key={projeto.slug}
            className="group border border-emerald-800/40 rounded-2xl bg-emerald-950/80 backdrop-blur-sm hover:border-emerald-500/40 transition-all duration-300 overflow-hidden shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 min-h-[420px]">
              {/* LEFT — content */}
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  {/* Date + FEATURED badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                      {new Date(projeto.data).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                    {projeto.destaque && (
                      <span className="font-mono text-[10px] text-emerald-400 border border-emerald-400/25 bg-emerald-400/8 px-2.5 py-0.5 rounded-full tracking-widest uppercase">
                        ★ FEATURED
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-bold text-emerald-400 text-2xl md:text-3xl mb-2 leading-tight">
                    {projeto.nome}
                  </h2>

                  {/* Resumo */}
                  {projeto.resumo && (
                    <p className="text-zinc-300 text-sm leading-relaxed mb-6 max-w-lg">
                      {projeto.resumo}
                    </p>
                  )}

                  {/* Key Achievements */}
                  {projeto.conquistas?.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span className="font-mono text-[10px] text-emerald-400 tracking-[0.3em] uppercase font-bold">Key Achievements</span>
                      </div>
                      <ul className="space-y-2">
                        {projeto.conquistas.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-zinc-300 text-xs leading-relaxed">
                            <svg className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  {/* Tech tags */}
                  {projeto.tecnologias?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {projeto.tecnologias.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] text-zinc-300 border border-zinc-600/50 bg-zinc-800/50 px-3 py-1 rounded-full tracking-wide hover:border-emerald-400/40 hover:text-emerald-300 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3">
                    {projeto.url ? (
                      <a
                        href={projeto.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-6 py-2.5 rounded-full font-bold tracking-widest uppercase transition-colors flex items-center gap-2"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Code
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-zinc-500 border border-zinc-700/50 px-6 py-2.5 rounded-full tracking-widest uppercase flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Private
                      </span>
                    )}
                    <button
                      onClick={() => setSelected(projeto)}
                      className="font-mono text-xs text-zinc-300 border border-zinc-600/50 hover:border-emerald-400/40 hover:text-emerald-300 px-6 py-2.5 rounded-full tracking-widest uppercase transition-colors flex items-center gap-2"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT — image */}
              <div className="md:col-span-2 relative min-h-[220px] md:min-h-0 overflow-hidden">
                {projeto.imagem ? (
                  <Image
                    src={projeto.imagem}
                    alt={projeto.nome}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
                    <span className="font-mono text-xs text-zinc-700 tracking-widest">NO IMAGE</span>
                  </div>
                )}
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-950/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-zinc-950 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fechar */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 border border-white/10 text-zinc-400 hover:text-white hover:border-emerald-400/40 rounded-full flex items-center justify-center transition-colors font-mono text-xs bg-zinc-950/80"
            >
              ✕
            </button>

            {/* Capa grande */}
            <div className="w-full aspect-video md:aspect-[21/9] bg-zinc-900 relative overflow-hidden">
              {selected.imagem && (
                <Image src={selected.imagem} alt={selected.nome} fill className="object-cover opacity-90" />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            </div>

            {/* Galeria horizontal */}
            {selected.galeria?.length > 0 && (
              <div className="flex gap-3 p-5 overflow-x-auto bg-zinc-950 border-b border-white/5">
                {selected.galeria.map((foto, i) => (
                  <div key={i} className="relative shrink-0 h-24 md:h-36 aspect-video rounded-lg overflow-hidden border border-white/5 bg-zinc-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={foto} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            )}

            {/* Conteúdo */}
            <div className="p-6 md:p-10">
              <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-2 uppercase">
                {new Date(selected.data).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>
              <h2 className="font-mono font-black text-white text-2xl md:text-3xl uppercase tracking-widest mb-6 leading-tight">
                {selected.nome}
              </h2>

              {/* Tecnologias */}
              {selected.tecnologias?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {selected.tecnologias.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] text-emerald-400 border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 rounded tracking-widest uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Descrição */}
              <div className="prose prose-invert prose-sm max-w-none text-zinc-400 leading-relaxed mb-8 prose-headings:font-mono prose-headings:text-white prose-strong:text-white prose-a:text-emerald-400">
                <MDXContent code={selected.descricao} />
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/5">
                {selected.url ? (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-6 py-3 rounded-lg font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    VIEW ON GITHUB
                  </a>
                ) : (
                  <span className="font-mono text-xs text-zinc-600 border border-white/5 px-6 py-3 rounded-lg tracking-widest uppercase flex items-center justify-center">
                    PRIVATE REPOSITORY
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