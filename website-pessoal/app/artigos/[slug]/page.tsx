import { getArtigosPublicados } from "@/lib/velite";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { MDXContent } from "@/components/mdx-content";

export async function generateStaticParams() {
  const artigos = getArtigosPublicados();
  return artigos.map((a) => ({ slug: a.slug.replace("artigos/", "") }));
}

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
    <article className="max-w-3xl mx-auto px-6 py-16 w-full">
      <Link href="/artigos" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-10">
        &larr; Voltar aos Artigos
      </Link>

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {artigo.tags?.map((tag) => (
            <span key={tag} className="badge badge-zinc">{tag}</span>
          ))}
          <time className="text-xs text-zinc-600">
            {new Date(artigo.data).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" })}
          </time>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">{artigo.titulo}</h1>
        <p className="text-xl text-zinc-400 leading-relaxed border-l-2 border-emerald-400/40 pl-5 italic">
          {artigo.resumo}
        </p>
        <div className="glow-line w-16 mt-8" />
      </header>

      <div className="prose-custom">
        <MDXContent code={artigo.conteudo} />
      </div>
    </article>
  );
}