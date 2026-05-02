// Importa os artigos gerados automaticamente pelo Velite na pasta invisível .velite
import { artigos } from '#site/content'

// Função simples para ir buscar apenas os artigos que estão marcados como publicados
export function getArtigosPublicados() {
  return artigos.filter((artigo) => artigo.publicado)
}

// Exportar tudo caso queiras usar o array completo nalgum lado
export { artigos }