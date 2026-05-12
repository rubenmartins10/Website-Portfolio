"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Projeto {
  slug: string;
  nome: string;
  resumo?: string;
  conquistas: string[];
  tecnologias: string[];
  imagem: string;
  data: string;
  destaque: boolean;
  url?: string;
}

// Per-project metric highlight cards — shown on the right panel
const PROJECT_METRICS: Record<
  string,
  { stat: string; label: string; sublabel?: string; gradient: string; icon: string }
> = {
  "aplicacao-de-gestao-de-inventario-me-clinic": {
    stat: "~60%",
    label: "FASTER INVENTORY",
    sublabel: "Average stock update time reduced",
    gradient: "from-emerald-500/50 via-emerald-800/70 to-emerald-950",
    icon: "📦",
  },
  "incorrupt-tamper-proof-evidence-auditing": {
    stat: "3",
    label: "ISOLATED AUDIT NODES",
    sublabel: "No single point of failure",
    gradient: "from-violet-500/50 via-violet-800/70 to-emerald-950",
    icon: "🔒",
  },
};

const DEFAULT_METRIC = {
  stat: "✦",
  label: "FEATURED PROJECT",
  sublabel: "Production ready",
  gradient: "from-emerald-700/40 via-emerald-900/60 to-emerald-950",
  icon: "🚀",
};

function MetricCard({
  metric,
}: {
  metric: (typeof PROJECT_METRICS)[string];
}) {
  return (
    <div
      className={`relative w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-linear-to-br ${metric.gradient} p-8 overflow-hidden`}
    >
      {/* decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="w-64 h-64 rounded-full border border-white/5" />
        <div className="absolute w-44 h-44 rounded-full border border-white/8" />
        <div className="absolute w-24 h-24 rounded-full border border-white/10" />
      </div>

      {/* content */}
      <div className="relative z-10 text-center">
        <div className="text-4xl mb-4 select-none">{metric.icon}</div>
        <div className="font-black text-white tracking-tight leading-none mb-2"
          style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
        >
          {metric.stat}
        </div>
        <div className="font-mono text-[11px] font-bold text-white/90 tracking-[0.25em] uppercase mb-1.5">
          {metric.label}
        </div>
        {metric.sublabel && (
          <div className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
            {metric.sublabel}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsCarousel({
  projetos,
}: {
  projetos: Projeto[];
}) {
  const [current, setCurrent] = useState(0);
  const total = projetos.length;
  const direction = useRef(0);

  const goTo = (index: number) => {
    direction.current = index > current ? 1 : -1;
    setCurrent(index);
  };
  const prev = () => goTo((current - 1 + total) % total);
  const next = () => goTo((current + 1) % total);

  const projeto = projetos[current];
  const metric = PROJECT_METRICS[projeto.slug] ?? DEFAULT_METRIC;

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? "60px" : "-60px",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d > 0 ? "-60px" : "60px",
      opacity: 0,
    }),
  };

  return (
    <div>
      {/* Swipe hint + navigation */}
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-[11px] text-zinc-500 tracking-widest uppercase">
          Swipe to explore my latest work
        </p>
        <div className="flex items-center gap-3">
          {/* dot indicators */}
          <div className="flex gap-1.5">
            {projetos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-emerald-400 w-4"
                    : "bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>
          {/* arrows */}
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-zinc-700/60 hover:border-emerald-400/60 text-zinc-400 hover:text-emerald-400 flex items-center justify-center transition-all duration-200 ml-2"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M10.5 3L5.5 8l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-zinc-700/60 hover:border-emerald-400/60 text-zinc-400 hover:text-emerald-400 flex items-center justify-center transition-all duration-200"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M5.5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-800/40 bg-emerald-950/80 backdrop-blur-sm shadow-2xl min-h-[420px]">
        <AnimatePresence custom={direction.current} mode="wait">
          <motion.div
            key={projeto.slug}
            custom={direction.current}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="grid grid-cols-1 md:grid-cols-5 min-h-[420px]"
          >
            {/* ── LEFT — info ── */}
            <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between">
              <div>
                {/* date + badge */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                    {new Date(projeto.data).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  {projeto.destaque && (
                    <span className="font-mono text-[10px] text-emerald-400 border border-emerald-400/25 bg-emerald-400/8 px-2.5 py-0.5 rounded-full tracking-widest uppercase">
                      ★ Featured
                    </span>
                  )}
                </div>

                {/* title */}
                <h3 className="font-bold text-white text-2xl md:text-3xl mb-1.5 leading-tight">
                  {projeto.nome}
                </h3>

                {/* description */}
                {projeto.resumo && (
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-lg">
                    {projeto.resumo}
                  </p>
                )}

                {/* achievements */}
                {projeto.conquistas?.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <svg
                        className="w-3.5 h-3.5 text-emerald-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span className="font-mono text-[10px] text-emerald-400 tracking-[0.3em] uppercase font-bold">
                        Key Achievements
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {projeto.conquistas.slice(0, 3).map((c, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-zinc-300 text-xs leading-relaxed"
                        >
                          <svg
                            className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                          </svg>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* bottom — tech + buttons */}
              <div>
                {projeto.tecnologias?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {projeto.tecnologias.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] text-zinc-300 border border-zinc-700/60 bg-zinc-800/60 px-2.5 py-0.5 rounded-full tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  {projeto.url && (
                    <a
                      href={projeto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-5 py-2.5 rounded-full font-bold tracking-widest uppercase transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      Code
                    </a>
                  )}
                  <Link
                    href={`/projetos/${projeto.slug}`}
                    className="font-mono text-xs text-zinc-300 border border-zinc-600/50 hover:border-emerald-400/40 hover:text-emerald-300 px-5 py-2.5 rounded-full tracking-widest uppercase transition-colors"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* ── RIGHT — image with metric overlay ── */}
            <div className="md:col-span-2 relative min-h-[200px] md:min-h-0 overflow-hidden rounded-b-2xl md:rounded-b-none md:rounded-r-2xl">
              {projeto.imagem ? (
                <>
                  <Image
                    src={projeto.imagem}
                    alt={projeto.nome}
                    fill
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-[#07080b]/70 via-transparent to-transparent" />
                  {/* Floating metric overlay */}
                  <div className="absolute inset-0 flex items-end justify-end p-6">
                    <div className={`rounded-xl bg-gradient-to-br ${metric.gradient} border border-white/10 px-5 py-4 backdrop-blur-sm`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{metric.icon}</span>
                        <span className="font-mono text-2xl font-black text-white">{metric.stat}</span>
                      </div>
                      <p className="font-mono text-[10px] text-white/80 tracking-widest uppercase">{metric.label}</p>
                    </div>
                  </div>
                </>
              ) : (
                <MetricCard metric={metric} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
