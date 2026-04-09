import { getArtigosPublicados } from "@/lib/velite"
import Link from "next/link"

export default function ArtigosPage() {
  const artigos = getArtigosPublicados()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 w-full">
      <h1 className="text-3xl font-bold mb-8 text-white">Os Meus Artigos</h1>
      
      {artigos.length === 0 ? (
        <p className="text-zinc-400">Ainda não há artigos publicados.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {artigos.map((artigo, index) => {
            // PROTEÇÃO EXTRA: Se o slug não existir, não deixamos o site ir abaixo!
            if (!artigo.slug) return null;

            // Limpamos o link caso o Velite adicione "artigos/" no início
            const urlSlug = artigo.slug.replace('artigos/', '');
            
            return (
              <Link 
                href={`/artigos/${urlSlug}`} 
                key={index}
                className="block p-6 border border-zinc-800 rounded-lg bg-zinc-900/30 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all cursor-pointer group"
              >
                <article>
                  <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {artigo.titulo}
                  </h2>
                  
                  <div className="flex gap-4 items-center mb-4 text-sm text-zinc-500">
                    <time>{new Date(artigo.data).toLocaleDateString('pt-PT')}</time>
                  </div>
                  
                  <p className="text-zinc-400 leading-relaxed">
                    {artigo.resumo}
                  </p>
                </article>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}