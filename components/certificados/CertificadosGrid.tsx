// components/certificados/CertificadosGrid.tsx
"use client";

import { useState } from "react";

type Certificado = {
  titulo: string;
  emissor: string;
  imagem?: string;
  aprendizado?: string;
  skills: string[];
  data: string;
  link?: string;
  ficheiro: string;
  categoria: string;
  slug: string;
};

// 🏆 DICIONÁRIO DE LOGOS AUTOMÁTICOS
const logosPredefinidos: Record<string, string> = {
  "Nova SBE": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Nova_School_of_Business_and_Economics_logo.svg/512px-Nova_School_of_Business_and_Economics_logo.svg.png",
  "Coursera": "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg",
  "Harvard": "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/512px-Harvard_shield_wreath.svg.png",
  "Harvard University": "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/512px-Harvard_shield_wreath.svg.png",
  "Udemy": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
  "Google": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
  "Microsoft": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "University of Helsinki": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/University_of_Helsinki_Logo.svg/512px-University_of_Helsinki_Logo.svg.png",
  "MinnaLearn": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/University_of_Helsinki_Logo.svg/512px-University_of_Helsinki_Logo.svg.png",
  "EF SET": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Logo_EF_Education_First.svg/512px-Logo_EF_Education_First.svg.png",
  "EF Education First": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Logo_EF_Education_First.svg/512px-Logo_EF_Education_First.svg.png",
};

// Função inteligente que decide qual logo mostrar
function getLogo(cert: Certificado) {
  if (cert.imagem) return cert.imagem; // Se fizeste upload no Keystatic, usa esse
  
  if (!cert.emissor) return null;

  // Procura no dicionário (ignora espaços extras e maiúsculas/minúsculas)
  const emissorMatch = Object.keys(logosPredefinidos).find(
    (key) => key.toLowerCase() === cert.emissor.toLowerCase().trim()
  );
  
  return emissorMatch ? logosPredefinidos[emissorMatch] : null;
}

export default function CertificadosGrid({ certificados }: { certificados: Certificado[] }) {
  const [selected, setSelected] = useState<Certificado | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificados.map((cert) => {
          const logoSrc = getLogo(cert);

          return (
            <div
              key={cert.slug}
              onClick={() => setSelected(cert)}
              className="flex flex-col p-5 border border-zinc-800 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-600 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={`Logo ${cert.emissor}`}
                    className="w-12 h-12 object-contain rounded bg-white p-1.5"
                  />
                ) : (
                  <div className="w-12 h-12 rounded bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-xl uppercase">
                    {cert.emissor ? cert.emissor.charAt(0) : "C"}
                  </div>
                )}
                <span className="text-[10px] font-semibold px-2 py-1 bg-zinc-800 text-zinc-400 rounded uppercase tracking-wider">
                  {cert.categoria.replace("-", " ")}
                </span>
              </div>

              <h2 className="text-lg font-bold text-white leading-tight mb-1 group-hover:text-emerald-400 transition-colors">
                {cert.titulo}
              </h2>
              <p className="text-sm text-zinc-400 font-medium mb-3">{cert.emissor}</p>

              {cert.aprendizado && (
                <p className="text-xs text-zinc-500 line-clamp-2 mt-auto">
                  {cert.aprendizado}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* POP-UP DETALHADO */}
      {selected && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div 
            className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-2"
            >
              ✕
            </button>

            <div className="flex items-start gap-5 mb-6 mt-2">
              {getLogo(selected) && (
                <img
                  src={getLogo(selected)!}
                  alt={selected.emissor}
                  className="w-16 h-16 object-contain rounded bg-white p-2 shrink-0"
                />
              )}
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{selected.titulo}</h2>
                <p className="text-zinc-400 text-lg">{selected.emissor}</p>
                <time className="text-sm text-zinc-500 block mt-1">
                  Emitido em {new Date(selected.data).toLocaleDateString("pt-PT", { year: "numeric", month: "long" })}
                </time>
              </div>
            </div>

            {selected.aprendizado && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-white mb-2">O que aprendi:</h3>
                <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {selected.aprendizado}
                </p>
              </div>
            )}

            {selected.skills && selected.skills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-white mb-3">Skills Adquiridas:</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map((skill) => (
                    <span key={skill} className="text-xs font-medium px-3 py-1.5 bg-zinc-800/80 text-zinc-300 border border-zinc-700 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-800/80">
              {selected.ficheiro && (
                <a
                  href={selected.ficheiro}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 px-6 py-2.5 rounded-lg transition-colors"
                >
                  Ver Certificado
                </a>
              )}
              {selected.link && selected.link !== "" && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-zinc-300 hover:text-white px-6 py-2.5 border border-zinc-700 hover:border-zinc-500 bg-zinc-800/50 rounded-lg transition-colors"
                >
                  Verificar Online
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}