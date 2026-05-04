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
  ficheiro?: string;
  categoria: string;
  slug: string;
};

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
  "IBM": "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
};

function getLogo(cert: Certificado) {
  if (cert.imagem) return cert.imagem;
  if (!cert.emissor) return null;
  const emissorMatch = Object.keys(logosPredefinidos).find(
    (key) => key.toLowerCase() === cert.emissor.toLowerCase().trim()
  );
  return emissorMatch ? logosPredefinidos[emissorMatch] : null;
}

export default function CertificadosGrid({ certificados }: { certificados: Certificado[] }) {
  const [selected, setSelected] = useState<Certificado | null>(null);

  return (
    <>
      {/* GRID DE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificados.map((cert) => {
          const logoSrc = getLogo(cert);
          return (
            <div
              key={cert.slug}
              onClick={() => setSelected(cert)}
              className="group flex flex-col p-5 border border-white/5 rounded-2xl bg-zinc-900/50 backdrop-blur-md hover:border-emerald-400/30 hover:bg-zinc-900/80 transition-all duration-300 cursor-pointer"
            >
              {/* Topo: logo + categoria */}
              <div className="flex justify-between items-start mb-5">
                {logoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoSrc}
                    alt={`Logo ${cert.emissor}`}
                    className="w-10 h-10 object-contain rounded-lg bg-white p-1.5 shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg border border-white/5 bg-zinc-800 flex items-center justify-center font-mono font-bold text-sm text-zinc-400 uppercase shrink-0">
                    {cert.emissor ? cert.emissor.charAt(0) : "C"}
                  </div>
                )}
                <span className="font-mono text-[9px] text-zinc-600 border border-zinc-700/50 px-2 py-0.5 rounded tracking-widest uppercase">
                  {cert.categoria.replace(/-/g, " ")}
                </span>
              </div>

              {/* Título */}
              <h2 className="font-mono font-bold text-white text-sm leading-snug mb-1.5 group-hover:text-emerald-400 transition-colors line-clamp-2">
                {cert.titulo}
              </h2>
              {/* Emissor */}
              <p className="font-mono text-[11px] text-zinc-500 mb-3">{cert.emissor}</p>

              {/* Data */}
              <time className="font-mono text-[10px] text-zinc-700 mt-auto pt-3 border-t border-white/5">
                {new Date(cert.data).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </time>
            </div>
          );
        })}
      </div>

      {/* MODAL DETALHADO */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fechar */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-9 h-9 border border-white/10 text-zinc-400 hover:text-white hover:border-emerald-400/40 rounded-full flex items-center justify-center transition-colors font-mono text-xs"
            >
              ✕
            </button>

            {/* Header do modal */}
            <div className="flex items-start gap-5 mb-6 mt-1">
              {getLogo(selected) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getLogo(selected)!}
                  alt={selected.emissor}
                  className="w-14 h-14 object-contain rounded-xl bg-white p-2 shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl border border-white/5 bg-zinc-800 flex items-center justify-center font-mono font-bold text-lg text-zinc-400 uppercase shrink-0">
                  {selected.emissor ? selected.emissor.charAt(0) : "C"}
                </div>
              )}
              <div>
                <div className="font-mono text-[10px] text-emerald-400 tracking-[0.3em] mb-1 uppercase">
                  {selected.categoria.replace(/-/g, " ")}
                </div>
                <h2 className="font-mono font-black text-white text-lg leading-snug uppercase tracking-wide mb-1">
                  {selected.titulo}
                </h2>
                <p className="font-mono text-xs text-zinc-500">{selected.emissor}</p>
                <time className="font-mono text-[10px] text-zinc-700 block mt-1">
                  {new Date(selected.data).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                </time>
              </div>
            </div>

            {/* O que aprendi */}
            {selected.aprendizado && (
              <div className="mb-6">
                <div className="font-mono text-[10px] text-emerald-400 tracking-[0.3em] mb-3 uppercase">WHAT I LEARNED</div>
                <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
                  {selected.aprendizado}
                </p>
              </div>
            )}

            {/* Skills */}
            {selected.skills?.length > 0 && (
              <div className="mb-6">
                <div className="font-mono text-[10px] text-emerald-400 tracking-[0.3em] mb-3 uppercase">SKILLS ACQUIRED</div>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[10px] text-zinc-500 border border-zinc-700/60 px-2.5 py-1 rounded tracking-wide"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex flex-wrap gap-3 pt-5 border-t border-white/5">
              {selected.ficheiro && (
                <a
                  href={selected.ficheiro}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-5 py-2.5 rounded-lg font-bold tracking-widest uppercase transition-colors"
                >
                  VIEW CERTIFICATE
                </a>
              )}
              {selected.link && selected.link !== "" && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-emerald-400 border border-emerald-400/30 hover:border-emerald-400 px-5 py-2.5 rounded-lg font-bold tracking-widest uppercase transition-colors"
                >
                  VERIFY ONLINE
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}