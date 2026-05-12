"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Artigo = { slug: string; titulo: string; data: string; publicado: boolean; tags: string[] };

export default function AdminArtigos() {
  const [items, setItems] = useState<Artigo[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/artigos").then(r => r.json()).then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false); });
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete article "${slug}"?`)) return;
    setDeleting(slug);
    await fetch(`/api/admin/artigos/${slug}`, { method: "DELETE" });
    setItems(prev => prev.filter(a => a.slug !== slug));
    setDeleting(null);
  };

  const filtered = items.filter(a => a.titulo?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex items-center justify-center py-32"><div className="w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">📝 Articles <span className="text-sm font-normal text-zinc-500">({items.length})</span></h1>
        <Link href="/admin/artigos/novo" className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-400 hover:bg-blue-300 text-zinc-950 text-sm font-bold transition-colors">+ New Article</Link>
      </div>
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-400/40 transition-colors" />
      </div>
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden divide-y divide-white/[0.04]">
        {filtered.length === 0 ? <p className="text-zinc-600 text-sm text-center py-12">No articles found</p> : filtered.map(a => (
          <div key={a.slug} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] group transition-colors">
            <div className="min-w-0">
              <p className="text-sm text-zinc-200 truncate group-hover:text-white transition-colors font-medium">{a.titulo}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <time className="text-[10px] text-zinc-600 font-mono">{a.data}</time>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${a.publicado ? "text-emerald-400 bg-emerald-400/10" : "text-zinc-500 bg-zinc-800"}`}>{a.publicado ? "PUBLISHED" : "DRAFT"}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-3">
              <Link href={`/admin/artigos/${a.slug}`} className="font-mono text-[10px] text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-lg bg-blue-400/8 hover:bg-blue-400/15 border border-blue-400/20 transition-all">EDIT</Link>
              <button onClick={() => handleDelete(a.slug)} disabled={deleting === a.slug} className="font-mono text-[10px] text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg bg-red-400/8 hover:bg-red-400/15 border border-red-400/20 transition-all disabled:opacity-40">{deleting === a.slug ? "..." : "DELETE"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
