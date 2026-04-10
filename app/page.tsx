import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { getArtigosPublicados } from "@/lib/velite";

import ScrollReveal from "@/components/animations/ScrollReveal";
import PageTransition from "@/components/animations/PageTransition";
// Importamos as nossas duas novas magias
import AnimatedTitle from "@/components/animations/AnimatedTitle";
import ParallaxCard from "@/components/animations/ParallaxCard";

export default async function Home() {
  const supabase = await createClient();
  const { data: projetos } = await supabase
    .from("projetos")
    .select("*")
    .eq("destacado", true)
    .order("created_at", { ascending: false })
    .limit(3);

  const artigos = getArtigosPublicados()
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 3);

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl mx-auto px-6 py-20">

        <ScrollReveal direction="up" distance={40}>
          <div className="w-full text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-24">
            
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0 overflow-hidden rounded-full border-4 border-zinc-800">
              <Image src="/perfil.jpg" alt="Rúben Martins" fill className="object-cover" />
            </div>

            <div>
              <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Disponível para novos projetos
              </div>

              {/* O NOVO TÍTULO ANIMADO */}
              <AnimatedTitle 
                text="Olá, eu sou o Rúben." 
                className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6" 
              />

              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                Bem-vindo ao meu espaço na internet. Aqui partilho o meu portefólio, as minhas aprendizagens e os projetos que vou construindo.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-start gap-4">
                <Link href="/projetos" className="px-6 py-3 rounded-lg bg-white text-zinc-950 font-medium hover:bg-zinc-200 transition-colors">
                  Projetos
                </Link>
                <Link href="/artigos" className="px-6 py-3 rounded-lg bg-zinc-900 text-white font-medium border border-zinc-800 hover:bg-zinc-800 transition-colors">
                  Artigos
                </Link>
                <Link href="/certificados" className="px-6 py-3 rounded-lg bg-zinc-900 text-white font-medium border border-zinc-800 hover:bg-zinc-800 transition-colors">
                  Certificações
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" distance={50} stagger={0.15}>
          <div className="w-full mb-20">
            <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-4">
              <h2 className="text-2xl font-bold text-white">Projetos em Destaque</h2>
              <Link href="/projetos" className="text-sm text-zinc-400 hover:text-white transition-colors">Ver todos →</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projetos && projetos.length > 0 ? (
                projetos.map((projeto) => (
                  /* O NOVO CARTÃO PARALLAX */
                  <ParallaxCard key={projeto.id} className="stagger-item block h-full">
                    <div className="h-full p-6 border border-zinc-800 rounded-lg bg-zinc-900/30 hover:border-zinc-700 transition-colors flex flex-col">
                      <h3 className="text-xl font-semibold text-white mb-2">{projeto.titulo}</h3>
                      <p className="text-zinc-400 text-sm mb-4 line-clamp-2 flex-grow">{projeto.descricao}</p>
                      <Link href="/projetos" className="text-sm text-white hover:underline mt-auto inline-block">Detalhes</Link>
                    </div>
                  </ParallaxCard>
                ))
              ) : (
                <p className="text-zinc-500 text-sm">Ainda não há projetos destacados.</p>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* SECÇÃO DE ARTIGOS (Mantida igual, com ScrollReveal) */}
        <ScrollReveal direction="up" distance={50} stagger={0.15}>
          <div className="w-full">
            <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-4">
              <h2 className="text-2xl font-bold text-white">Artigos Recentes</h2>
              <Link href="/artigos" className="text-sm text-zinc-400 hover:text-white transition-colors">Ver todos →</Link>
            </div>

            <div className="flex flex-col gap-4">
              {artigos && artigos.length > 0 ? (
                artigos.map((artigo, idx) => {
                  if (!artigo.slug) return null;
                  const urlSlug = artigo.slug.replace('artigos/', '');
                  
                  return (
                    <Link 
                      href={`/artigos/${urlSlug}`} 
                      key={idx} 
                      className="stagger-item block p-6 border border-zinc-800 rounded-lg bg-zinc-900/30 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all group"
                    >
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {artigo.titulo}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-2">{artigo.resumo}</p>
                      <time className="text-xs text-zinc-500">{new Date(artigo.data).toLocaleDateString('pt-PT')}</time>
                    </Link>
                  )
                })
              ) : (
                <p className="text-zinc-500 text-sm">Ainda não há artigos publicados.</p>
              )}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </PageTransition>
  );
}