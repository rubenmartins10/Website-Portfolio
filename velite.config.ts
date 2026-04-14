import { defineConfig, defineCollection, s } from 'velite'

const artigos = defineCollection({
  name: 'Artigo',
  pattern: 'artigos/**/*.mdx',
  schema: s.object({
    titulo: s.string().max(99),
    data: s.isodate(),
    resumo: s.string().max(999),
    tags: s.array(s.string()).optional(),
    publicado: s.boolean().default(true),
    slug: s.path(),      
    conteudo: s.mdx()    
  })
})

const projetos = defineCollection({
  name: 'Projeto',
  pattern: 'projetos/**/*.mdx',
  schema: s.object({
    nome: s.string().max(99),
    data: s.isodate(),
    url: s.string().optional(),
    imagem: s.string(),
    galeria: s.array(s.string()).default([]), // NOVO CAMPO PARA A GALERIA
    tecnologias: s.array(s.string()).default([]),
    destaque: s.boolean().default(false),
    slug: s.path(),
    descricao: s.mdx()
  })
})

const certificados = defineCollection({
  name: 'Certificado',
  pattern: 'certificados/**/*.yaml',
  schema: s.object({
    titulo: s.string().max(99),
    emissor: s.string(),
    imagem: s.string().optional(),
    aprendizado: s.string().optional(),
    skills: s.array(s.string()).default([]),
    data: s.isodate(),
    link: s.string().optional(),
    ficheiro: s.string(),
    categoria: s.enum([
      'software-engineering', 'frontend', 'backend', 'mobile', 
      'cloud-devops', 'data-ai', 'cybersecurity', 'networks', 'database'
    ]).default('software-engineering'),
    slug: s.path()
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
    artigos,
    projetos,
    certificados
  }
})