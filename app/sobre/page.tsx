import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Mim | Rúben Martins",
  description: "Conhece um pouco mais sobre o meu percurso e as tecnologias com que trabalho.",
};

// Usar next/dynamic para componentes com Framer Motion (para evitar erros de SSR)
const FadeIn = dynamic(() => import("@/components/animations/FadeIn"), { ssr: true });
const PageTransition = dynamic(() => import("@/components/animations/PageTransition"), { ssr: true });

export default function SobrePage() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-20 w-full">
        
        {/* CABEÇALHO */}
        <FadeIn className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sobre Mim
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-8 max-w-2xl">
            Olá! Sou o Rúben Martins. Sou um apaixonado por tecnologia, desenvolvimento web e por transformar ideias em produtos digitais rápidos e elegantes.
          </p>
        </FadeIn>

        {/* SECÇÃO PRINCIPAL: TEXTO + IMAGEM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          
          {/* Coluna do Texto */}
          <FadeIn delay={0.2} className="md:col-span-2 space-y-6 text-zinc-400 leading-relaxed text-lg">
            <p>
              O meu percurso na área de desenvolvimento começou com a curiosidade de perceber como a internet funciona por trás do ecrã. Desde então, tenho-me dedicado a aprender continuamente e a criar soluções práticas.
            </p>
            <p>
              Gosto de focar-me no &quot;front-end&quot; e na experiência do utilizador, garantindo que o código é limpo, a performance é de topo e o design é apelativo. Acredito que um bom produto digital deve ser tão bonito quanto rápido.
            </p>
            <p>
              Quando não estou a escrever código ou a partir a cabeça com um bug, gosto de relaxar [escreve aqui um hobby teu, ex: a jogar, a ler, a passear], e explorar as últimas tendências do mundo da tecnologia. O meu grande objetivo é continuar a evoluir como developer.
            </p>
          </FadeIn>

          {/* Coluna da Imagem (AGORA SEMPRE A CORES) */}
          <FadeIn delay={0.4} className="md:col-span-1">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50">
              <Image 
                src="/perfil.jpg" 
                alt="Rúben Martins" 
                fill 
                className="object-cover transition-transform duration-500 hover:scale-105" 
              />
            </div>
          </FadeIn>
        </div>

        {/* SECÇÃO DE SKILLS */}
        <FadeIn delay={0.6} className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-6">O que uso no dia a dia</h2>
          <div className="flex flex-wrap gap-3">
            {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'Git', 'Figma'].map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 text-sm font-medium hover:border-zinc-700 hover:text-white transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* CALL TO ACTION (CTA) */}
        <FadeIn delay={0.8}>
          <div className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Gostaste do que viste?</h3>
              <p className="text-zinc-400">Dá uma vista de olhos nos projetos que tenho construído.</p>
            </div>
            <Link 
              href="/projetos" 
              className="px-6 py-3 rounded-lg bg-white text-zinc-950 font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap"
            >
              Ver Projetos
            </Link>
          </div>
        </FadeIn>

      </div>
    </PageTransition>
  );
}