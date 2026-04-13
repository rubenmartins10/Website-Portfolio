import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import dynamic from "next/dynamic";

// 1. IMPORTAÇÃO DINÂMICA DO 3D (Sem SSR e com Loading Skeleton)
const ProjectScreen3D = dynamic(() => import('@/components/canvas/ProjectScreen'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-zinc-900/50 animate-pulse rounded-xl border border-zinc-800 flex items-center justify-center mb-12">
      <span className="text-zinc-600 text-sm">A carregar visualização interativa...</span>
    </div>
  )
});

// Interface para garantir a segurança dos dados
interface ProjetoDetalhe {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
  imagem_url: string | null;
  em_progresso: boolean;
  linguagens: string;
  conteudo: string | null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("projetos").select("titulo, descricao").eq("slug", slug).single();

  // Substituímos o any por unknown -> Tipo Correto
  const projeto = (data as unknown) as ProjetoDetalhe;

  if (!projeto) return { title: "Projeto não encontrado | Rúben Martins" };

  return {
    title: `${projeto.titulo} | Rúben Martins`,
    description: projeto.descricao,
  };
}

export default async function ProjetoDetalhePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("projetos")
    .select("*")
    .eq("slug", slug)
    .single();

  // Substituímos o any por unknown -> Tipo Correto
  const projeto = (data as unknown) as ProjetoDetalhe;

  if (!projeto) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-20 w-full">
      <Link href="/projetos" className="text-sm text-zinc-400 hover:text-white mb-8 inline-flex items-center gap-2 transition-colors">
        &larr; Voltar aos Projetos
      </Link>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {projeto.titulo}
          </h1>
          
          {projeto.em_progresso && (
            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-bold rounded-full flex items-center gap-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Em Progresso
            </span>
          )}
        </div>
        <p className="text-xl text-zinc-400 leading-relaxed">
          {projeto.descricao}
        </p>
      </header>

      {/* 2. RENDERIZAÇÃO CONDICIONAL DA IMAGEM 3D VS IMAGEM ESTÁTICA */}
      {projeto.imagem_url ? (
        <div className="mb-12">
          <ProjectScreen3D imageUrl={projeto.imagem_url} />
          <p className="text-center text-xs text-zinc-500 mt-4 uppercase tracking-wider">
            Podes arrastar o ecrã para rodar
          </p>
        </div>
      ) : (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 mb-12 bg-zinc-900/30 flex items-center justify-center">
          <Image src="/file.svg" alt="Sem imagem" width={64} height={64} className="opacity-50" />
        </div>
      )}

      <div className="prose prose-invert max-w-none text-zinc-300">
        {projeto.conteudo ? (
          <div dangerouslySetInnerHTML={{ __html: String(projeto.conteudo).replace(/\n/g, '<br/>') }} />
        ) : (
          <p className="text-zinc-500 italic p-6 border border-zinc-800 rounded-lg bg-zinc-900/30">
            Detalhes aprofundados sobre este projeto serão adicionados brevemente.
          </p>
        )}
      </div>
    </article>
  );
}