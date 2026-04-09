import { getArtigosPublicados } from "@/lib/velite";
import { notFound } from "next/navigation";

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. A NOVA FORMA OBRIGATÓRIA DO NEXT.JS LER OS LINKS (usando await)
  const { slug } = await params;
  
  // 2. Ir buscar todos os artigos
  const artigos = getArtigosPublicados();
  
  // 3. Encontrar o artigo exato. 
  // O Velite às vezes guarda o path como "artigos/teste", por isso verificamos os dois casos!
  const artigo = artigos.find((a) => a.slug === slug || a.slug === `artigos/${slug}`);

  // Se o artigo não existir, manda o utilizador para uma página 404
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

      {/* Como o conteúdo MDX vem processado, no futuro vamos usar um componente MDX. 
          Por agora, mostramos só o resumo e a confirmação que a página abriu! */}
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