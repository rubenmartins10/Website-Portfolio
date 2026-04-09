import { createClient } from "@/lib/supabase/server";
import ProjetoCard from "@/components/projetos/ProjetoCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos | Rúben Martins",
  description: "O meu portefólio de projetos de desenvolvimento.",
};

// Explicamos ao ficheiro o que é exatamente um Projeto
interface Projeto {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
  imagem_url: string | null;
  em_progresso: boolean;
  linguagens: string;
  conteudo: string | null;
}

export default async function ProjetosPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("projetos")
    .select("*")
    .order("created_at", { ascending: false });

  // ESLint feliz: Passamos por 'unknown' primeiro!
  const projetos = (data as unknown) as Projeto[];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 w-full">
      <header className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Os Meus Projetos
        </h1>
        <p className="text-zinc-400 text-lg">
          Uma seleção dos trabalhos que desenvolvi, desde experiências a produtos completos.
        </p>
      </header>

      {!projetos || projetos.length === 0 ? (
        <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/30 text-center">
          <p className="text-zinc-500">Ainda não adicionei projetos à base de dados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projetos.map((projeto) => (
            <ProjetoCard key={projeto.id} projeto={projeto} />
          ))}
        </div>
      )}
    </div>
  );
}