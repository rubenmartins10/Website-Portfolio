"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ContentItem = { slug: string; [key: string]: unknown };

function StatCard({ label, count, color, icon, href }: { label: string; count: number; color: string; icon: string; href: string }) {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-400/10 border-emerald-400/20 text-emerald-400",
    blue: "bg-blue-400/10 border-blue-400/20 text-blue-400",
    purple: "bg-purple-400/10 border-purple-400/20 text-purple-400",
  };
  return (
    <Link href={href} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] p-6 flex flex-col gap-4 transition-all group">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-1">{label}</p>
          <p className="text-4xl font-black text-white">{count}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${colors[color]}`}>
          <span className="text-lg">{icon}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-auto">
        <span className="flex-1 text-center py-2 text-xs font-mono font-semibold text-zinc-400 group-hover:text-white rounded-lg bg-white/[0.04] border border-white/[0.06] transition-all tracking-wide">
          MANAGE →
        </span>
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  const [projetos, setProjetos] = useState<ContentItem[]>([]);
  const [artigos, setArtigos] = useState<ContentItem[]>([]);
  const [certificados, setCertificados] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/projetos").then(r => r.json()),
      fetch("/api/admin/artigos").then(r => r.json()),
      fetch("/api/admin/certificados").then(r => r.json()),
    ]).then(([p, a, c]) => {
      setProjetos(Array.isArray(p) ? p : []);
      setArtigos(Array.isArray(a) ? a : []);
      setCertificados(Array.isArray(c) ? c : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07080b] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
          <p className="font-mono text-xs text-zinc-500 tracking-widest">LOADING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080b] text-white">
      {/* Topbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#07080b]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">Admin Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="font-mono text-[11px] text-zinc-500 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all">← Site</Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-white">Content Management 🛠️</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage your projects, articles, and certifications</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Projects" count={projetos.length} color="emerald" icon="💼" href="/admin/projetos" />
          <StatCard label="Articles" count={artigos.length} color="blue" icon="📝" href="/admin/artigos" />
          <StatCard label="Certifications" count={certificados.length} color="purple" icon="🏅" href="/admin/certificados" />
        </div>

        {/* Recent items grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Projects */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h2 className="font-mono text-[11px] text-white font-bold tracking-widest uppercase">Recent Projects</h2>
              </div>
              <Link href="/admin/projetos" className="font-mono text-[10px] text-zinc-500 hover:text-emerald-400 transition-colors">VIEW ALL →</Link>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {projetos.slice(0, 5).map(p => (
                <Link key={p.slug} href={`/admin/projetos/${p.slug}`} className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] group transition-colors">
                  <span className="text-xs text-zinc-300 truncate group-hover:text-white transition-colors">{String(p.nome)}</span>
                  <span className="text-[10px] text-zinc-600 font-mono shrink-0 ml-2">EDIT →</span>
                </Link>
              ))}
              {projetos.length === 0 && <p className="text-zinc-600 text-xs text-center py-6">No projects yet</p>}
            </div>
          </div>

          {/* Recent Articles */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <h2 className="font-mono text-[11px] text-white font-bold tracking-widest uppercase">Recent Articles</h2>
              </div>
              <Link href="/admin/artigos" className="font-mono text-[10px] text-zinc-500 hover:text-blue-400 transition-colors">VIEW ALL →</Link>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {artigos.slice(0, 5).map(a => (
                <Link key={a.slug} href={`/admin/artigos/${a.slug}`} className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] group transition-colors">
                  <span className="text-xs text-zinc-300 truncate group-hover:text-white transition-colors">{String(a.titulo)}</span>
                  <span className="text-[10px] text-zinc-600 font-mono shrink-0 ml-2">EDIT →</span>
                </Link>
              ))}
              {artigos.length === 0 && <p className="text-zinc-600 text-xs text-center py-6">No articles yet</p>}
            </div>
          </div>

          {/* Recent Certs */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <h2 className="font-mono text-[11px] text-white font-bold tracking-widest uppercase">Recent Certs</h2>
              </div>
              <Link href="/admin/certificados" className="font-mono text-[10px] text-zinc-500 hover:text-purple-400 transition-colors">VIEW ALL →</Link>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {certificados.slice(0, 5).map(c => (
                <Link key={c.slug} href={`/admin/certificados/${c.slug}`} className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] group transition-colors">
                  <span className="text-xs text-zinc-300 truncate group-hover:text-white transition-colors">{String(c.titulo)}</span>
                  <span className="text-[10px] text-zinc-600 font-mono shrink-0 ml-2">EDIT →</span>
                </Link>
              ))}
              {certificados.length === 0 && <p className="text-zinc-600 text-xs text-center py-6">No certs yet</p>}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "View Site", href: "/", icon: "🌐", desc: "Public homepage" },
            { label: "Projects", href: "/projetos", icon: "💼", desc: "Projects page" },
            { label: "Articles", href: "/artigos", icon: "📝", desc: "Public blog" },
            { label: "Certs", href: "/certificados", icon: "🏅", desc: "Certs page" },
          ].map(link => (
            <Link key={link.href} href={link.href} className="rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 p-4 flex flex-col gap-1 transition-all group">
              <span className="text-xl">{link.icon}</span>
              <span className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">{link.label}</span>
              <span className="text-[10px] text-zinc-600 font-mono">{link.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
