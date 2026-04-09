import { defineConfig, defineCollection, s } from 'velite'

const artigos = defineCollection({
  name: 'Artigo',
  pattern: 'artigos/**/*.mdx', // Procura ficheiros .mdx dentro de content/artigos/
  schema: s.object({
    titulo: s.string().max(99),
    data: s.isodate(),
    resumo: s.string().max(999),
    tags: s.array(s.string()).optional(),
    publicado: s.boolean().default(true)
  })
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: {
    artigos
  }
})