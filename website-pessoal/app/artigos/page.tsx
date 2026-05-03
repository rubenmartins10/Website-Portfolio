import { getArtigosPublicados } from "@/lib/velite";
import Link from "next/link";
import { Metadata } from "next";
import StarfieldCanvas from "@/components/home/StarfieldCanvas";

export const metadata: Metadata = {
  title: "Articles | Rúben Martins",
  description: "Technical articles and notes on software engineering, AI and web development.",
};

export default function ArtigosPage() {
  const artigos = getArtigosPublicados();

  return (
    <>
      <StarfieldCanvas />
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 py-28 w-full">
        {/* Header */}
        <header className="mb-20">
          <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-4">BLOG</div>
          <h1 className="font-mono font-black text-white text-3xl md:text-5xl uppercase tracking-widest mb-6 flex items-center gap-4">
            <span className="w-2 md:w-3 h-10 md:h-12 bg-emerald-400 block rounded-r-lg shrink-0" />
            ARTICLES
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-mono">
            Technical notes, learnings and reflections on software engineering, AI and web development.
          </p>
        </header>

        {artigos.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-white/2 p-16 text-center">
            <p className="font-mono text-zinc-500 text-xs tracking-widest">NO ARTICLES PUBLISHED YET</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-white/5">
            {artigos.map((artigo, index) => {
              if (!artigo.slug) return null;
              const urlSlug = artigo.slug.replace("artigos/", "");
              return (
                <Link
                  href={`/artigos/${urlSlug}`}
                  key={index}
                  className="group py-8 first:pt-0 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 hover:bg-white/1.5 transition-colors rounded-xl px-2 -mx-2"
                >
                  <article className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      {artigo.tags && artigo.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="font-mono text-[10px] text-zinc-500 border border-zinc-700/60 px-2 py-0.5 rounded tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-mono text-base font-bold text-white group-hover:text-emerald-400 transition-colors mb-2 leading-snug">
                      {artigo.titulo}
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">{artigo.resumo}</p>
                  </article>
                  <div className="flex items-center gap-3 shrink-0">
                    <time className="font-mono text-xs text-zinc-600 border border-white/5 px-3 py-1.5 rounded-full whitespace-nowrap">
                      {new Date(artigo.data).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </time>
                    <span className="font-mono text-xs text-emerald-400/40 group-hover:text-emerald-400 transition-colors">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
