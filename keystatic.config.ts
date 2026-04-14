// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    artigos: collection({
      label: 'Artigos',
      slugField: 'titulo',
      path: 'content/artigos/*',
      format: { contentField: 'conteudo' },
      schema: {
        titulo: fields.slug({ name: { label: 'Título' } }),
        data: fields.date({ label: 'Data', defaultValue: { kind: 'today' } }),
        resumo: fields.text({ label: 'Resumo', multiline: true, defaultValue: '' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        publicado: fields.checkbox({ label: 'Publicado', defaultValue: true }),
        conteudo: fields.mdx({ label: 'Conteúdo' }),
      },
    }),
    projetos: collection({
      label: 'Projetos',
      slugField: 'nome',
      path: 'content/projetos/*',
      format: { contentField: 'descricao' },
      schema: {
        nome: fields.slug({ name: { label: 'Nome do Projeto' } }),
        data: fields.date({ label: 'Data de Conclusão' }),
        url: fields.text({ label: 'Link do Projeto (Opcional)', defaultValue: '' }),
        imagem: fields.image({
          label: 'Capa do Projeto',
          directory: 'public/projetos',
          publicPath: '/projetos/',
        }),
        tecnologias: fields.array(fields.text({ label: 'Tecnologia' }), { label: 'Stack Tecnológica' }),
        destaque: fields.checkbox({ label: 'Destaque na Home', defaultValue: false }),
        descricao: fields.mdx({ label: 'Descrição Detalhada' }),
      },
    }),
    certificados: collection({
      label: 'Certificações',
      slugField: 'titulo',
      path: 'content/certificados/*',
      schema: {
        titulo: fields.slug({ name: { label: 'Nome do Certificado' } }),
        emissor: fields.text({ label: 'Entidade Emissora', defaultValue: '' }),
        imagem: fields.image({
          label: 'Imagem ou Logo da Instituição',
          directory: 'public/certificados',
          publicPath: '/certificados/',
        }),
        data: fields.date({ label: 'Data de Emissão' }),
        aprendizado: fields.text({ 
          label: 'O que aprendi no curso', 
          multiline: true, 
          defaultValue: '' 
        }),
        // NOVO: Campo para Skills
        skills: fields.array(fields.text({ label: 'Skill (ex: React, Python)' }), {
          label: 'Skills Adquiridas',
          itemLabel: props => props.value
        }),
        link: fields.text({ label: 'Link de Verificação (Opcional)', defaultValue: '' }),
        ficheiro: fields.file({
          label: 'Ficheiro do Certificado (PDF)',
          directory: 'public/certificados',
          publicPath: '/certificados/',
        }),
        categoria: fields.select({
          label: 'Categoria CS',
          options: [
            { label: 'Software Engineering', value: 'software-engineering' },
            { label: 'Web Development (Frontend)', value: 'frontend' },
            { label: 'Web Development (Backend)', value: 'backend' },
            { label: 'Mobile Development', value: 'mobile' },
            { label: 'Cloud Computing & DevOps', value: 'cloud-devops' },
            { label: 'Data Science & AI', value: 'data-ai' },
            { label: 'Cybersecurity', value: 'cybersecurity' },
            { label: 'Computer Networks', value: 'networks' },
            { label: 'Database Management', value: 'database' },
          ],
          defaultValue: 'software-engineering',
        }),
      },
    }),
  },
})