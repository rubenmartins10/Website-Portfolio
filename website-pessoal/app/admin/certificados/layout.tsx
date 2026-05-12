import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07080b] text-white">
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#07080b]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">Admin</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-1 ml-4">
              <Link href="/admin/projetos" className="font-mono text-[11px] text-zinc-500 hover:text-emerald-400 px-3 py-1.5 rounded-lg hover:bg-emerald-400/5 transition-all">Projects</Link>
              <Link href="/admin/artigos" className="font-mono text-[11px] text-zinc-500 hover:text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-400/5 transition-all">Articles</Link>
              <Link href="/admin/certificados" className="font-mono text-[11px] text-zinc-500 hover:text-purple-400 px-3 py-1.5 rounded-lg hover:bg-purple-400/5 transition-all">Certs</Link>
            </nav>
          </div>
          <Link href="/" className="font-mono text-[11px] text-zinc-500 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all">← Site</Link>
        </div>
      </header>
      {children}
    </div>
  );
}
