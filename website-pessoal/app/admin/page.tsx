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

  const stats = [
    {
      label: "Projetos",
      value: projetos.length,
      href: "/keystatic/collections/projetos",
      createHref: "/keystatic/collections/projetos/create",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
        </svg>
      ),
      color: "emerald",
    },
    {
      label: "Artigos",
      value: artigos.length,
      href: "/keystatic/collections/artigos",
      createHref: "/keystatic/collections/artigos/create",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      ),
      color: "blue",
    },
    {
      label: "Certificações",
      value: certificados.length,
      href: "/keystatic/collections/certificados",
      createHref: "/keystatic/collections/certificados/create",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
        </svg>
      ),
      color: "purple",
    },
  ];

  const colorMap: Record<string, string> = {
    emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  };

  const recentProjetos = [...projetos]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5);

  const recentArtigos = [...artigos]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#08090c]">
      {/* Admin Header */}
      <div className="border-b border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">Painel de Administração</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500 hidden sm:block">
              {session.user?.email}
            </span>
            <Link href="/" className="text-xs text-zinc-500 hover:text-white transition-colors">
              ← Voltar ao site
            </Link>
            <AdminSignOut />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white mb-1">
            Bem-vindo, {session.user?.name?.split(" ")[0] || "Admin"} 👋
          </h1>
          <p className="text-zinc-500 text-sm">Gere o conteúdo do teu website aqui.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 flex items-center gap-4"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${colorMap[stat.color]}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-zinc-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CMS Quick Access */}
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Gestão de Conteúdo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(stat => (
              <div key={stat.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 ${colorMap[stat.color]}`}>
                  {stat.icon}
                </div>
                <h3 className="font-semibold text-white mb-1">{stat.label}</h3>
                <p className="text-xs text-zinc-500 mb-4">Gerir todos os {stat.label.toLowerCase()}</p>
                <div className="flex gap-2">
                  <Link
                    href={stat.href}
                    className="flex-1 text-center py-2 px-3 rounded-lg bg-white/[0.05] border border-white/[0.07] text-xs text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all"
                  >
                    Ver Todos
                  </Link>
                  <Link
                    href={stat.createHref}
                    className="flex-1 text-center py-2 px-3 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-xs text-emerald-400 hover:bg-emerald-400/15 transition-all"
                  >
                    + Criar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Projects */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-white">Projetos Recentes</h2>
              <Link href="/keystatic/collections/projetos" className="text-xs text-emerald-400 hover:text-emerald-300">
                Ver todos →
              </Link>
            </div>
            {recentProjetos.length === 0 ? (
              <p className="text-zinc-600 text-sm text-center py-6">Sem projetos ainda.</p>
            ) : (
              <div className="space-y-2">
                {recentProjetos.map(p => (
                  <div key={p.slug} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                    <div className="flex items-center gap-3 min-w-0">
                      {p.destaque && <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      <span className="text-sm text-zinc-300 truncate">{p.nome}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <time className="text-xs text-zinc-600">
                        {new Date(p.data).toLocaleDateString("pt-PT", { day: "2-digit", month: "short" })}
                      </time>
                      <Link href={`/keystatic/collections/projetos/${p.slug}`} className="text-xs text-zinc-600 hover:text-emerald-400 transition-colors">
                        Editar
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Articles */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-white">Artigos Recentes</h2>
              <Link href="/keystatic/collections/artigos" className="text-xs text-emerald-400 hover:text-emerald-300">
                Ver todos →
              </Link>
            </div>
            {recentArtigos.length === 0 ? (
              <p className="text-zinc-600 text-sm text-center py-6">Sem artigos ainda.</p>
            ) : (
              <div className="space-y-2">
                {recentArtigos.map(a => (
                  <div key={a.slug} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${a.publicado ? "bg-emerald-400" : "bg-zinc-600"}`} />
                      <span className="text-sm text-zinc-300 truncate">{a.titulo}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <time className="text-xs text-zinc-600">
                        {new Date(a.data).toLocaleDateString("pt-PT", { day: "2-digit", month: "short" })}
                      </time>
                      <Link href={`/keystatic/collections/artigos/${a.slug.replace("artigos/", "")}`} className="text-xs text-zinc-600 hover:text-emerald-400 transition-colors">
                        Editar
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Open Keystatic */}
        <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-white mb-1">Editor de Conteúdo Completo</h3>
            <p className="text-zinc-500 text-sm">Abre o Keystatic CMS para edição avançada com editor visual.</p>
          </div>
          <Link
            href="/keystatic"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            Abrir Keystatic
          </Link>
        </div>

      </div>
    </div>
  );
}
