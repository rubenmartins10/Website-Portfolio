import { config, fields, collection } from '@keystatic/core'

export default config({
  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: 'rubenmartins10/Website-Portfolio',
        branchPrefix: 'keystatic/',
      }
    : {
        kind: 'local',
      },
  collections: {
    artigos: collection({
      label: 'Articles',
      slugField: 'titulo',
      path: 'content/artigos/*',
      format: { contentField: 'conteudo' },
      schema: {
        titulo: fields.slug({ name: { label: 'Title' } }),
        data: fields.date({ label: 'Date', defaultValue: { kind: 'today' } }),
        resumo: fields.text({ label: 'Summary', multiline: true, defaultValue: '' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        publicado: fields.checkbox({ label: 'Published', defaultValue: true }),
        conteudo: fields.mdx({ label: 'Content' }),
      },
    }),
    projetos: collection({
      label: 'Projects',
      slugField: 'nome',
      path: 'content/projetos/*',
      format: { contentField: 'descricao' },
      schema: {
        nome: fields.slug({ name: { label: 'Project Name' } }),
        data: fields.date({ label: 'Completion Date' }),
        url: fields.text({ label: 'GitHub Link (Repository)', defaultValue: '' }),
        
        // MAIN COVER IMAGE
        imagem: fields.image({
          label: 'Project Cover (Main)',
          directory: 'public/projetos',
          publicPath: '/projetos/',
        }),

        // EXTRA PHOTO GALLERY
        galeria: fields.array(
          fields.image({
            label: 'Gallery Photo',
            directory: 'public/projetos',
            publicPath: '/projetos/',
          }),
          {
            label: 'Photo Gallery (Optional)',
            itemLabel: props => props.value ? 'Photo Added' : 'New Photo'
          }
        ),

        tecnologias: fields.array(fields.text({ label: 'Technology' }), { label: 'Tech Stack' }),
        destaque: fields.checkbox({ label: 'Featured on Home', defaultValue: false }),
        resumo: fields.text({ label: 'Project Summary', multiline: true, defaultValue: '' }),
        conquistas: fields.array(fields.text({ label: 'Achievement' }), { label: 'Achievements / Features', itemLabel: props => props.value || 'New Achievement' }),
        descricao: fields.mdx({ label: 'Detailed Description' }),
      },
    }),
    certificados: collection({
      label: 'Certifications',
      slugField: 'titulo',
      path: 'content/certificados/*',
      schema: {
        titulo: fields.slug({ name: { label: 'Certificate Name' } }),
        emissor: fields.text({ label: 'Issuing Organization', defaultValue: '' }),
        imagem: fields.image({
          label: 'Institution Image or Logo',
          directory: 'public/certificados',
          publicPath: '/certificados/',
        }),
        data: fields.date({ label: 'Issue Date' }),
        aprendizado: fields.text({ label: 'What I learned in this course', multiline: true, defaultValue: '' }),
        skills: fields.array(fields.text({ label: 'Skill (e.g. React, Python)' }), {
          label: 'Skills Acquired',
          itemLabel: props => props.value
        }),
        link: fields.text({ label: 'Verification Link (Optional)', defaultValue: '' }),
        ficheiro: fields.file({
          label: 'Certificate File (PDF)',
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