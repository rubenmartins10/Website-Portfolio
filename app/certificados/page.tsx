// app/certificados/page.tsx
import { certificados } from "#site/content";
import { Metadata } from "next";
import CertificadosGrid from "@/components/certificados/CertificadosGrid";

export const metadata: Metadata = {
  title: "Certificações | Rúben Martins",
  description: "As minhas certificações e formações em Computer Science.",
};

export default function CertificadosPage() {
  const certificadosOrdenados = [...certificados].sort((a, b) => 
    new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 w-full">
      <header className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Formação & Certificações
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
          Acredito na aprendizagem contínua como o grande motor de evolução profissional. 
          Aqui partilho o meu percurso de especialização. <strong className="text-zinc-300 font-medium">Clica em qualquer certificado</strong> para explorares em detalhe as competências que desenvolvi e o que aprendi.
        </p>
      </header>

      {certificadosOrdenados.length === 0 ? (
        <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/30 text-center">
          <p className="text-zinc-500">Ainda não há certificados processados pelo Velite.</p>
        </div>
      ) : (
        <CertificadosGrid certificados={certificadosOrdenados} />
      )}
    </div>
  );
}