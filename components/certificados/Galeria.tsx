"use client";

import { useState } from "react";
import CertificadoCard from "./CertificadoCard";
import Lightbox from "./Lightbox";

// Interface 100% fiel à tua base de dados
interface Certificado {
  id: string;
  nome: string;
  instituicao: string;
  data: string;
  imagem_url: string | null;
}

// Em vez de "any[]", usamos "Certificado[]" (uma lista de Certificados)
export default function Galeria({ certificados }: { certificados: Certificado[] }) {
  const [certificadoAberto, setCertificadoAberto] = useState<Certificado | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {certificados.map((cert) => (
          <CertificadoCard 
            key={cert.id} 
            certificado={cert} 
            onClick={() => setCertificadoAberto(cert)} 
          />
        ))}
      </div>

      {certificadoAberto && certificadoAberto.imagem_url && (
        <Lightbox 
          imagemUrl={certificadoAberto.imagem_url} 
          nome={certificadoAberto.nome} 
          onClose={() => setCertificadoAberto(null)} 
        />
      )}
    </>
  );
}