import { projetos } from "#site/content";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { MDXContent } from "@/components/mdx-content";

export async function generateStaticParams() {
  return projetos.map((p) => ({ slug: p.slug.replace("projetos/", "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const projeto = projetos.find((p) => p.slug === `projetos/${slug}` || p.slug === slug);
  if (!projeto) return { title: "Project not found | Rúben Martins" };
  return { title: `${projeto.nome} | Rúben Martins` };
}

export default async function ProjetoDetalhePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projeto = projetos.find((p) => p.slug === `projetos/${slug}` || p.slug === slug);
  if (!projeto) notFound();

  return (
    <article className="max-w-4xl mx-auto px-6 py-28 w-full">
      <Link href="/projetos" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-10">
        &larr; Back to Projects
      </Link>

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {projeto.destaque && <span className="badge badge-emerald">Featured</span>}
          <time className="text-xs text-zinc-600">
            {new Date(projeto.data).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
          </time>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">{projeto.nome}</h1>
        <div className="flex flex-wrap gap-2">
          {projeto.tecnologias.map((tec) => (
            <span key={tec} className="badge badge-zinc">{tec}</span>
          ))}
        </div>
        {projeto.url && (
          <a href={projeto.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
            View live project &rarr;
          </a>
        )}
      </header>

      {projeto.imagem && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.07] mb-12">
          <Image src={projeto.imagem} alt={projeto.nome} fill className="object-cover" />
        </div>
      )}

      <div className="prose-custom">
        <MDXContent code={projeto.descricao} />
      </div>

      {projeto.galeria.length > 0 && (
        <section className="mt-16">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projeto.galeria.map((img, i) => (
              <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-white/[0.07]">
                <Image src={img} alt={`${projeto.nome} screenshot ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}