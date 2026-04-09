import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  // 1. Inicializa o cliente do lado do servidor
  const supabase = await createClient()

  // 2. Faz uma query super simples à tabela de projetos (como passaste os tipos, vais ver que tens autocomplete!)
  const { data: projetos, error } = await supabase
    .from('projetos')
    .select('*')
    .limit(2)

  return (
    <main className="min-h-screen p-8 bg-zinc-950 text-white">
      <h1 className="text-2xl font-bold mb-4">Teste de Ligação ao Supabase</h1>
      
      <div className="bg-zinc-900 p-4 rounded-lg overflow-auto">
        <h2 className="text-zinc-400 mb-2">Resultado da Query:</h2>
        
        {/* Se houver erro de ligação, mostra aqui */}
        {error && (
          <p className="text-red-500">Erro: {error.message}</p>
        )}

        {/* Se a ligação funcionar, mostra os dados (mesmo que seja um array vazio se não tiveres lá nada) */}
        {!error && (
          <pre className="text-sm text-green-400">
            {JSON.stringify(projetos, null, 2)}
          </pre>
        )}
      </div>
    </main>
  )
}