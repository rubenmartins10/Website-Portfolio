import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl mx-auto px-6 py-20 text-center">
      
      {/* Etiqueta de Status */}
      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        Disponível para novos projetos
      </div>

      {/* Título Principal */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
        Olá, eu sou o Rúben.
      </h1>
      
      {/* Subtítulo */}
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
        Bem-vindo ao meu espaço na internet. Aqui partilho o meu portefólio, as minhas aprendizagens e os projetos que vou construindo.
      </p>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
        <Link 
          href="/projetos" 
          className="px-6 py-3 rounded-lg bg-white text-zinc-950 font-medium hover:bg-zinc-200 transition-colors"
        >
          Projetos
        </Link>
        
        <Link 
          href="/artigos" 
          className="px-6 py-3 rounded-lg bg-zinc-900 text-white font-medium border border-zinc-800 hover:bg-zinc-800 transition-colors"
        >
          Artigos
        </Link>

        {/* NOVO BOTÃO DE CERTIFICAÇÕES */}
        <Link 
          href="/certificados" 
          className="px-6 py-3 rounded-lg bg-zinc-900 text-white font-medium border border-zinc-800 hover:bg-zinc-800 transition-colors"
        >
          Certificações
        </Link>
      </div>

    </div>
  );
}