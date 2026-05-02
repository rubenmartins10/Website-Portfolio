"use client";

import Link from "next/link";
import Image from "next/image";

// Interface alinhada com a base de dados
interface Projeto {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
  imagem_url: string | null;
  em_progresso: boolean;
  linguagens: string;      
  conteudo: string | null; 
}

export default function ProjetoCard({ projeto }: { projeto: Projeto }) {
  const imagemSegura = projeto.imagem_url || "/file.svg";

  return (
    <Link 
      href={`/projetos/${projeto.slug}`}
      className="group flex flex-col border border-zinc-800 rounded-xl bg-zinc-900/30 overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/50 transition-all"
    >
      <div className="relative w-full aspect-video bg-zinc-800 overflow-hidden">
        <Image 
          src={imagemSegura} 
          alt={projeto.titulo} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* CHECKLIST: Indicador Visual de "Em Progresso" */}
        {projeto.em_progresso && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500/90 text-white text-xs font-bold rounded-full backdrop-blur-md shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            Em Progresso
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {projeto.titulo}
        </h3>
        <p className="text-zinc-400 text-sm mb-6 line-clamp-3 flex-1">
          {projeto.descricao}
        </p>
        <span className="text-sm font-medium text-white group-hover:underline mt-auto inline-block">
          Ver detalhes do projeto →
        </span>
      </div>
    </Link>
  );
}