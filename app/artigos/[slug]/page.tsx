import { getArtigosPublicados } from "@/lib/velite";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// 1. GERAR METADADOS DINÂMICOS
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artigos = getArtigosPublicados();
  const artigo = artigos.find((a) => a.slug === slug || a.slug === `artigos/${slug}`);

  if (!artigo) {
    return { title: 'Artigo não encontrado | Rúben Martins' };
  }

  return {
    title: `${artigo.titulo} | Rúben Martins`,
    description: artigo.resumo,
  };
}

// 2. A PÁGINA DO ARTIGO
export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const artigos = getArtigosPublicados();
  const artigo = artigos.find((a) => a.slug === slug || a.slug === `artigos/${slug}`);

  if (!artigo) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-20 w-full">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {artigo.titulo}
        </h1>
        <time className="text-zinc-500">
          {new Date(artigo.data).toLocaleDateString('pt-PT')}
        </time>
      </header>

      {/* Por agora mostramos o resumo e a mensagem de sucesso. */}
      <div className="prose prose-invert max-w-none text-zinc-300">
        <p className="text-xl text-zinc-400 border-l-2 border-zinc-800 pl-4 italic">
          {artigo.resumo}
        </p>
        <div className="mt-10 p-6 bg-zinc-900/50 rounded-lg border border-zinc-800">
          <p>🎉 Parabéns! A página do artigo dinâmico funcionou. A URL é: <strong>/artigos/{slug}</strong></p>
        </div>
      </div>
    </article>
  )
}