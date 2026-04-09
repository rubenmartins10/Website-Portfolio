import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase' // Importa os tipos que já geraste!

export function createClient() {
  // O createBrowserClient já lida automaticamente com o armazenamento seguro da sessão no browser
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}