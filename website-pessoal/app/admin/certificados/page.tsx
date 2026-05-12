"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Cert = { slug: string; titulo: string; emissor: string; data: string; categoria: string };

export default function AdminCertificados() {
  const [items, setItems] = useState<Cert[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/certificados").then(r => r.json()).then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false); });
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete certification "${slug}"?`)) return;
    setDeleting(slug);
    await fetch(`/api/admin/certificados/${slug}`, { method: "DELETE" });
    setItems(prev => prev.filter(c => c.slug !== slug));
    setDeleting(null);
  };

  const filtered = items.filter(c => c.titulo?.toLowerCase().includes(search.toLowerCase()) || c.emissor?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex items-center justify-center py-32"><div className="w-6 h-6 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">🏅 Certifications <span className="text-sm font-normal text-zinc-500">({items.length})</span></h1>
        <Link href="/admin/certificados/novo" className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-400 hover:bg-purple-300 text-zinc-950 text-sm font-bold transition-colors">+ New Certification</Link>
      </div>
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input type="text" placeholder="Search certifications..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-400/40 transition-colors" />
      </div>
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden divide-y divide-white/[0.04]">
        {filtered.length === 0 ? <p className="text-zinc-600 text-sm text-center py-12">No certifications found</p> : filtered.map(c => (
          <div key={c.slug} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] group transition-colors">
            <div className="min-w-0">
              <p className="text-sm text-zinc-200 truncate group-hover:text-white transition-colors font-medium">{c.titulo}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-zinc-500 font-mono">{c.emissor}</span>
                <time className="text-[10px] text-zinc-600 font-mono">{c.data}</time>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-3">
              <Link href={`/admin/certificados/${c.slug}`} className="font-mono text-[10px] text-purple-400 hover:text-purple-300 px-3 py-1.5 rounded-lg bg-purple-400/8 hover:bg-purple-400/15 border border-purple-400/20 transition-all">EDIT</Link>
              <button onClick={() => handleDelete(c.slug)} disabled={deleting === c.slug} className="font-mono text-[10px] text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg bg-red-400/8 hover:bg-red-400/15 border border-red-400/20 transition-all disabled:opacity-40">{deleting === c.slug ? "..." : "DELETE"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
