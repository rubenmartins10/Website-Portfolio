import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-white">
          Rúben Martins
        </Link>
        
        <div className="flex gap-6 text-sm font-medium text-zinc-400">
          <Link href="/projetos" className="hover:text-white transition-colors">Projetos</Link>
          <Link href="/artigos" className="hover:text-white transition-colors">Artigos</Link>
          {/* NOVA LINHA AQUI */}
          <Link href="/certificados" className="hover:text-white transition-colors">Certificações</Link>
          <Link href="/sobre" className="hover:text-white transition-colors">Sobre</Link>
        </div>
      </div>
    </nav>
  )
}