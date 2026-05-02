import { getArtigosPublicados } from "@/lib/velite";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | Rúben Martins",
  description: "Technical articles and notes on software engineering, AI and web development.",
};

export default function ArtigosPage() {
  const artigos = getArtigosPublicados();

  return (
    <div className="max-w-3xl mx-auto px-6 py-28 w-full">
      {/* Header */}
      <header className="mb-20">
        <p className="section-label mb-2">Blog</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Articles</h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Technical notes, learnings and reflections on software engineering, AI and web development.
        </p>
        <div className="glow-line w-20 mt-6" />
      </header>

      {artigos.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <p className="text-zinc-500 text-sm">No articles published yet.</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-white/[0.05]">
          {artigos.map((artigo, index) => {
            if (!artigo.slug) return null;
            const urlSlug = artigo.slug.replace("artigos/", "");
            return (
              <Link
                href={`/artigos/${urlSlug}`}
                key={index}
                className="group py-8 first:pt-0 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 hover:opacity-80 transition-opacity"
              >
                <article className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    {artigo.tags && artigo.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="badge badge-zinc">{tag}</span>
                    ))}
                  </div>
                  <h2 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2 leading-snug">
                    {artigo.titulo}
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">{artigo.resumo}</p>
                </article>
                <time className="shrink-0 text-xs text-zinc-600 bg-white/[0.04] border border-white/[0.07] px-3 py-1.5 rounded-lg self-start whitespace-nowrap">
                  {new Date(artigo.data).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                </time>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
