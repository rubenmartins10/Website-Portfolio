import { createClient } from "@/lib/supabase/server";
import Galeria from "@/components/certificados/Galeria";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificações | Rúben Martins",
  description: "Galeria de certificados e formações que concluí.",
};

export default async function CertificadosPage() {
  const supabase = await createClient();
  
  // Busca os certificados à base de dados
  const { data: certificados } = await supabase
    .from("certificados")
    .select("*")
    .order("data", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 w-full">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        As Minhas Certificações
      </h1>
      <p className="text-zinc-400 text-lg mb-12">
        Um registo das minhas formações, cursos e conquistas de aprendizagem contínua.
      </p>
      
      {(!certificados || certificados.length === 0) ? (
        <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/30 text-center">
          <p className="text-zinc-500">Ainda não adicionei certificados à base de dados.</p>
        </div>
      ) : (
        <Galeria certificados={certificados} />
      )}
    </div>
  );
}