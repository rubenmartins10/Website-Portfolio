"use client";

import Image from "next/image";

// Interface atualizada com a tua base de dados real
interface Certificado {
  id: string;
  nome: string; // <-- Estava titulo, agora é nome
  instituicao: string;
  data: string;
  imagem_url: string | null; // <-- Pode vir vazio da BD
}

interface CertificadoCardProps {
  certificado: Certificado;
  onClick: () => void;
}

export default function CertificadoCard({ certificado, onClick }: CertificadoCardProps) {
  // Se não houver imagem, usamos um fundo cinzento ou um placeholder
  const imagemSegura = certificado.imagem_url || "/file.svg";

  return (
    <div 
      onClick={onClick} 
      className="group cursor-pointer border border-zinc-800 rounded-xl bg-zinc-900/30 overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/50 transition-all"
    >
      <div className="relative w-full aspect-video bg-zinc-800 overflow-hidden">
        <Image 
          src={imagemSegura} 
          alt={certificado.nome} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
          {certificado.nome}
        </h3>
        <p className="text-zinc-400 text-sm">{certificado.instituicao}</p>
        <time className="text-zinc-500 text-xs mt-3 block">
          {new Date(certificado.data).toLocaleDateString('pt-PT')}
        </time>
      </div>
    </div>
  );
}