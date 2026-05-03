import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { projetos, artigos, certificados } from "@/.velite";
import AdminSignOut from "./AdminSignOut";

export const metadata = {
  title: "Admin | Rúben Martins",
};

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const recentProjetos = [...projetos]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5);

  const recentArtigos = [...artigos]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5);

  const recentCerts = [...certificados]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5);

  const firstName = session.user?.name?.split(" ")[0] || "Admin";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="min-h-screen bg-[#07080b] text-white">

      {/* ── Topbar ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#07080b]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">Admin Panel</span>
          </div>

          {/* Nav */}
          <div className="flex items-center gap-1 hidden sm:flex">
            <Link href="/" className="font-mono text-[11px] text-zinc-500 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all tracking-wide">
              ← Site
            </Link>
            <Link href="/keystatic" className="font-mono text-[11px] text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-lg hover:bg-emerald-400/8 transition-all tracking-wide border border-emerald-400/20">
              Keystatic CMS ↗
            </Link>
          </div>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[11px] text-white font-medium leading-none">{session.user?.name}</span>
              <span className="text-[10px] text-zinc-500 leading-none mt-0.5">{session.user?.email}</span>
            </div>
            <AdminSignOut />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* ── Hero greeting ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">
              {greeting}, {firstName} 👋
            </h1>
            <p className="text-zinc-500 text-sm mt-0.5">
              {new Date().toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <Link
            href="/keystatic"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-sm font-bold tracking-wide transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Abrir Editor
          </Link>
        </div>

        {/* ── Stats + Quick Actions ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Projetos */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-1">Projetos</p>
                <p className="text-4xl font-black text-white">{projetos.length}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
            </div>
            <div className="flex gap-2 mt-auto">
              <Link href="/keystatic/collections/projetos" className="flex-1 text-center py-2 text-xs font-mono font-semibold text-zinc-400 hover:text-white rounded-lg bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] transition-all tracking-wide">
                VER TODOS
              </Link>
              <Link href="/keystatic/collections/projetos/create" className="flex-1 text-center py-2 text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 rounded-lg bg-emerald-400/8 hover:bg-emerald-400/12 border border-emerald-400/20 transition-all tracking-wide">
                + CRIAR
              </Link>
            </div>
          </div>

          {/* Artigos */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-1">Artigos</p>
                <p className="text-4xl font-black text-white">{artigos.length}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
            </div>
            <div className="flex gap-2 mt-auto">
              <Link href="/keystatic/collections/artigos" className="flex-1 text-center py-2 text-xs font-mono font-semibold text-zinc-400 hover:text-white rounded-lg bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] transition-all tracking-wide">
                VER TODOS
              </Link>
              <Link href="/keystatic/collections/artigos/create" className="flex-1 text-center py-2 text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 rounded-lg bg-blue-400/8 hover:bg-blue-400/12 border border-blue-400/20 transition-all tracking-wide">
                + CRIAR
              </Link>
            </div>
          </div>

          {/* Certificações */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-1">Certificações</p>
                <p className="text-4xl font-black text-white">{certificados.length}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg>
              </div>
            </div>
            <div className="flex gap-2 mt-auto">
              <Link href="/keystatic/collections/certificados" className="flex-1 text-center py-2 text-xs font-mono font-semibold text-zinc-400 hover:text-white rounded-lg bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] transition-all tracking-wide">
                VER TODOS
              </Link>
              <Link href="/keystatic/collections/certificados/create" className="flex-1 text-center py-2 text-xs font-mono font-semibold text-purple-400 hover:text-purple-300 rounded-lg bg-purple-400/8 hover:bg-purple-400/12 border border-purple-400/20 transition-all tracking-wide">
                + CRIAR
              </Link>
            </div>
          </div>

        </div>

        {/* ── Recent Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Projetos recentes */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h2 className="font-mono text-[11px] text-white font-bold tracking-widest uppercase">Projetos</h2>
              </div>
              <Link href="/keystatic/collections/projetos" className="font-mono text-[10px] text-zinc-500 hover:text-emerald-400 transition-colors tracking-wide">
                VER TODOS →
              </Link>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {recentProjetos.length === 0 ? (
                <p className="text-zinc-600 text-xs text-center py-8">Sem projetos ainda.</p>
              ) : recentProjetos.map(p => (
                <div key={p.slug} className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] group transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {p.destaque
                      ? <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400" title="Destaque" />
                      : <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    }
                    <span className="text-xs text-zinc-300 truncate group-hover:text-white transition-colors">{p.nome}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    <time className="text-[10px] text-zinc-600 font-mono">
                      {new Date(p.data).toLocaleDateString("pt-PT", { month: "short", year: "2-digit" })}
                    </time>
                    <Link href={`/keystatic/collections/projetos/${p.slug}`} className="text-[10px] font-mono text-zinc-600 hover:text-emerald-400 transition-colors">
                      EDITAR
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Artigos recentes */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <h2 className="font-mono text-[11px] text-white font-bold tracking-widest uppercase">Artigos</h2>
              </div>
              <Link href="/keystatic/collections/artigos" className="font-mono text-[10px] text-zinc-500 hover:text-blue-400 transition-colors tracking-wide">
                VER TODOS →
              </Link>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {recentArtigos.length === 0 ? (
                <p className="text-zinc-600 text-xs text-center py-8">Sem artigos ainda.</p>
              ) : recentArtigos.map(a => (
                <div key={a.slug} className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] group transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${a.publicado ? "bg-emerald-400" : "bg-zinc-600"}`} title={a.publicado ? "Publicado" : "Rascunho"} />
                    <span className="text-xs text-zinc-300 truncate group-hover:text-white transition-colors">{a.titulo}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    <span className={`text-[10px] font-mono ${a.publicado ? "text-emerald-500" : "text-zinc-600"}`}>
                      {a.publicado ? "PUB" : "DRAFT"}
                    </span>
                    <Link href={`/keystatic/collections/artigos/${a.slug.replace("artigos/", "")}`} className="text-[10px] font-mono text-zinc-600 hover:text-blue-400 transition-colors">
                      EDITAR
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificações recentes */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <h2 className="font-mono text-[11px] text-white font-bold tracking-widest uppercase">Certificações</h2>
              </div>
              <Link href="/keystatic/collections/certificados" className="font-mono text-[10px] text-zinc-500 hover:text-purple-400 transition-colors tracking-wide">
                VER TODOS →
              </Link>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {recentCerts.map(c => (
                <div key={c.slug} className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] group transition-colors">
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-300 truncate group-hover:text-white transition-colors">{c.titulo}</p>
                    <p className="text-[10px] text-zinc-600 font-mono mt-0.5 truncate">{c.emissor}</p>
                  </div>
                  <Link href={`/keystatic/collections/certificados/${c.slug}`} className="text-[10px] font-mono text-zinc-600 hover:text-purple-400 transition-colors shrink-0 ml-2">
                    EDITAR
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Quick Links ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Ver Site", href: "/", icon: "🌐", desc: "Homepage pública" },
            { label: "Projetos", href: "/projetos", icon: "💼", desc: "Página de projetos" },
            { label: "Artigos", href: "/artigos", icon: "📝", desc: "Blog público" },
            { label: "Certificações", href: "/certificados", icon: "🏅", desc: "Página de certs" },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 p-4 flex flex-col gap-1 transition-all group"
            >
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
