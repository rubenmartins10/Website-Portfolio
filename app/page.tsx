import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { projetos, artigos, certificados } from "@/.velite";

// Importações dinâmicas para animações
const FadeIn = dynamic(() => import("@/components/animations/FadeIn"), { ssr: true });
const PageTransition = dynamic(() => import("@/components/animations/PageTransition"), { ssr: true });

export const metadata: Metadata = {
  title: "Rúben Martins | Junior Engineer",
  description: "Portefólio profissional de Rúben Martins, Junior Engineer e estudante de Engenharia Informática.",
};

// --- LÓGICA DO GRÁFICO DIÁRIO (Últimos 365 dias = 1 Ano) ---
const GERAR_DADOS_GRAFICO = () => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // Normalizar para o início do dia
  
  const msInDay = 24 * 60 * 60 * 1000;
  const totalDias = 365; // Um ano completo
  const startTime = hoje.getTime() - (totalDias - 1) * msInDay;

  const dias = Array.from({ length: totalDias }).map((_, i) => {
    const startOfDay = startTime + i * msInDay;
    const endOfDay = startOfDay + msInDay - 1;

    // Filtra os itens criados/editados neste dia específico
    const countProjetos = projetos.filter(p => {
      const t = new Date(p.data).getTime();
      return t >= startOfDay && t <= endOfDay;
    }).length;

    const countArtigos = artigos.filter(a => {
      const t = new Date(a.data).getTime();
      return t >= startOfDay && t <= endOfDay;
    }).length;

    const countCertificados = certificados.filter(c => {
      const t = new Date(c.data).getTime();
      return t >= startOfDay && t <= endOfDay;
    }).length;

    return { 
      countProjetos, 
      countArtigos, 
      countCertificados, 
      dataStr: new Date(startOfDay).toLocaleDateString('pt-PT'),
      dataObj: new Date(startOfDay)
    };
  });

  return dias;
};

// --- STACK TECNOLÓGICA (ÍCONES SVG) ---
const techStack = [
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' }
];

export default function HomePage() {
  const diasDados = GERAR_DADOS_GRAFICO();

  // O valor máximo do eixo Y será pelo menos 5.
  const maxCount = Math.max(5, ...diasDados.flatMap(d => [d.countProjetos, d.countArtigos, d.countCertificados]));

  // Configurações e Geometria do SVG
  const svgWidth = 800; 
  const svgHeight = 180;
  const paddingLeft = 30;
  const paddingRight = 30;
  const paddingBottom = 145;
  const paddingTop = 20;
  const graphHeight = paddingBottom - paddingTop;
  const graphWidth = svgWidth - paddingLeft - paddingRight;

  const getY = (val: number) => paddingBottom - (val / maxCount) * graphHeight;

  const getPoints = (key: 'countProjetos' | 'countArtigos' | 'countCertificados') => {
    return diasDados.map((d, i) => {
      const x = paddingLeft + (i / (diasDados.length - 1)) * graphWidth;
      const y = getY(d[key]);
      return `${x},${y}`;
    }).join(" ");
  };

  const yStep = maxCount > 10 ? Math.ceil(maxCount / 5) : 1;
  const yAxisLabels = [];
  for (let i = yStep; i <= maxCount; i += yStep) {
    yAxisLabels.push(i);
  }

  const projetosDestaque = projetos.filter(p => p.destaque).slice(0, 2);
  const projetosMostrar = projetosDestaque.length > 0 ? projetosDestaque : projetos.slice(0, 2);

  const artigosRecentes = [...artigos]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 2);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 w-full">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* --- SIDEBAR ESQUERDA --- */}
          <aside className="md:w-[296px] shrink-0">
            <FadeIn>
              <div className="relative w-full aspect-square rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 mb-6 group">
                <Image 
                  src="/perfil.jpg" 
                  alt="Rúben Martins" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  priority
                />
              </div>

              <div className="mb-6">
                <h1 className="text-2xl font-bold text-white leading-tight">Rúben Martins</h1>
                <p className="text-xl text-zinc-400 font-light">Junior Engineer</p>
              </div>

              <p className="text-zinc-300 text-sm mb-6 leading-relaxed">
                Estudante de Engenharia Informática e Atleta Federado. Foco na excelência técnica e resolução de problemas complexos.
              </p>

              <div className="space-y-3 border-t border-zinc-800 pt-6">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>Trofa, Portugal</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span className="truncate">rubendavidsilvamartins@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <span>(+351) 925 474 521</span>
                </div>
              </div>

              {/* --- LINGUAGENS E TECH (ÍCONES SVG) --- */}
              <div className="mt-8 border-t border-zinc-800 pt-6">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Linguagens & Tech</h3>
                
                {/* Ícones de Tecnologias */}
                <div className="flex flex-wrap gap-3">
                  {techStack.map((tech) => (
                    <div key={tech.name} className="relative group cursor-pointer">
                      <img 
                        src={tech.icon} 
                        alt={tech.name} 
                        className="w-8 h-8 hover:scale-110 transition-transform drop-shadow-md"
                        title={tech.name}
                      />
                    </div>
                  ))}
                </div>

                {/* Botões de Contacto (Gmail + LinkedIn) */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <Link 
                    href="mailto:rubendavidsilvamartins@gmail.com" 
                    className="flex items-center gap-2 bg-[#ea4335] text-white px-3 py-1.5 rounded-sm text-xs font-bold hover:brightness-110 transition-all tracking-wider"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
                    GMAIL
                  </Link>
                  <Link 
                    href="https://linkedin.com/in/teu-link-aqui" // <-- Substitui pelo teu link do LinkedIn!
                    target="_blank" 
                    className="flex items-center gap-2 bg-[#0077b5] text-white px-3 py-1.5 rounded-sm text-xs font-bold hover:brightness-110 transition-all tracking-wider"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LINKEDIN
                  </Link>
                </div>

              </div>
            </FadeIn>
          </aside>

          {/* --- CONTEÚDO PRINCIPAL (DIREITA) --- */}
          <main className="flex-1 min-w-0">
            
            {/* 1. Biografia */}
            <FadeIn delay={0.2} className="mb-14">
              <h2 className="text-3xl font-bold text-white mb-6">Sobre Mim</h2>
              <div className="space-y-4 text-zinc-400 text-lg leading-relaxed">
                <p>
                  Acredito que código excelente é a base de software que impacta. Como finalista de <strong className="text-zinc-200">Engenharia Informática</strong> e atleta federado, transpunho a disciplina, mentalidade de alta competição e orientação para resultados do desporto para o design de sistemas robustos e escaláveis.
                </p>
                <p>
                  A minha principal área é <strong className="text-emerald-400">Data, AI e Machine Learning</strong>, onde combino <strong className="text-zinc-200">Python, Java e Go</strong> para construir pipelines de dados eficientes e modelos que resolvem problemas reais. Complemento essa expertise com o desenvolvimento de interfaces e aplicações web em <strong className="text-zinc-200">React e Next.js</strong>, garantindo que insights gerados por IA chegam aos utilizadores de forma intuitiva e impactante. O que me diferencia é a obsessão por qualidade em toda a cadeia: desde a limpeza e preparação de dados até à otimização de modelos e à experiência final do utilizador.
                </p>
                <p>
                  Tenho a motivação de um atleta de competição: sempre a procurar o próximo desafio que me permita aprender, contribuir com impacto real e elevar a excelência técnica de quem me rodeia. Procuro ambientes onde a ambição técnica é bem-vinda e onde posso deixar um rasto de trabalho que dura.
                </p>
              </div>
            </FadeIn>

            {/* 2. Gráfico de Atividade Diária (365 Dias) */}
            <FadeIn delay={0.3} className="mb-14 p-6 sm:p-8 border border-zinc-800 rounded-xl bg-zinc-900/20 overflow-hidden">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Métricas de Atividade (Últimos 365 Dias)</h3>
              
              <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                <div className="min-w-[600px] pt-4">
                  
                  <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-[180px] overflow-visible">
                    
                    {/* Eixo Y: Linhas Guias e Números (Fundo) */}
                    {yAxisLabels.map((val) => {
                      const y = getY(val);
                      return (
                        <g key={`y-${val}`}>
                          <text x="12" y={y + 4} fill="#71717a" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
                            {val}
                          </text>
                          <line x1={paddingLeft} y1={y} x2={svgWidth} y2={y} stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
                        </g>
                      );
                    })}

                    {/* Eixo Y: O zero "0" */}
                    <text x="12" y={paddingBottom + 4} fill="#71717a" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
                      0
                    </text>

                    {/* --- LINHAS DE DADOS (Espessura ligeiramente menor para 365 dias) --- */}
                    <polyline points={getPoints('countProjetos')} fill="none" stroke="#34d399" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] opacity-80" />
                    <polyline points={getPoints('countArtigos')} fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] opacity-80" />
                    <polyline points={getPoints('countCertificados')} fill="none" stroke="#a855f7" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] opacity-80" />

                    {/* Círculos de pico - Raio menor (2.5) para não amontoar num ano */}
                    {diasDados.map((d, i) => {
                      const x = paddingLeft + (i / (diasDados.length - 1)) * graphWidth;
                      return (
                        <g key={`circle-${i}`}>
                          {d.countProjetos > 0 && (
                            <circle cx={x} cy={getY(d.countProjetos)} r="2.5" fill="#18181b" stroke="#34d399" strokeWidth="1.5">
                              <title>{d.countProjetos} Projeto(s) em {d.dataStr}</title>
                            </circle>
                          )}
                          {d.countArtigos > 0 && (
                            <circle cx={x} cy={getY(d.countArtigos)} r="2.5" fill="#18181b" stroke="#3b82f6" strokeWidth="1.5">
                              <title>{d.countArtigos} Artigo(s) em {d.dataStr}</title>
                            </circle>
                          )}
                          {d.countCertificados > 0 && (
                            <circle cx={x} cy={getY(d.countCertificados)} r="2.5" fill="#18181b" stroke="#a855f7" strokeWidth="1.5">
                              <title>{d.countCertificados} Certificado(s) em {d.dataStr}</title>
                            </circle>
                          )}
                        </g>
                      );
                    })}

                    {/* --- EIXOS BRANCOS --- */}
                    <line x1={paddingLeft} y1={paddingTop - 10} x2={paddingLeft} y2={paddingBottom} stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1={paddingLeft} y1={paddingBottom} x2={svgWidth} y2={paddingBottom} stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

                    {/* Eixo X: Rótulos de Tempo (Início de cada mês apenas) */}
                    {diasDados.map((d, i) => {
                      const isFirstOfMonth = d.dataObj.getDate() === 1;

                      // Só desenha se for o dia 1 do mês
                      if (!isFirstOfMonth) return null;

                      const x = paddingLeft + (i / (diasDados.length - 1)) * graphWidth;
                      const label = d.dataObj.toLocaleDateString('pt-PT', { month: 'short' }).replace('.', '');

                      return (
                        <g key={`x-${i}`}>
                          <line x1={x} y1={paddingBottom} x2={x} y2={paddingBottom + 5} stroke="#ffffff" strokeWidth="1.5" />
                          <text x={x} y={paddingBottom + 20} fill="#71717a" fontSize="10" fontFamily="sans-serif" textAnchor="middle" className="capitalize">
                            {label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                </div>
              </div>

              {/* Legenda do Gráfico */}
              <div className="flex flex-wrap gap-8 mt-4 border-t border-zinc-800/50 pt-5 text-xs font-medium text-zinc-400">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span> Projetos
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span> Artigos
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span> Certificações
                </span>
              </div>
            </FadeIn>

            {/* 3. Projetos Reais */}
            <FadeIn delay={0.4} className="mb-12">
              <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-2">
                <h3 className="text-xl font-bold text-white">Projetos em Destaque</h3>
                <Link href="/projetos" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">Ver todos os projetos →</Link>
              </div>
              
              {projetosMostrar.length === 0 ? (
                <p className="text-zinc-500 text-sm">Ainda não adicionaste projetos no painel.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projetosMostrar.map((projeto) => (
                    <div key={projeto.slug} className="p-5 border border-zinc-800 rounded-xl bg-zinc-900/30 hover:bg-zinc-900/60 transition-all flex flex-col group">
                      <div className="flex items-center justify-between mb-3">
                        <Link href="/projetos" className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {projeto.nome}
                        </Link>
                        {projeto.destaque && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Destaque</span>
                        )}
                      </div>
                      
                      {projeto.tecnologias && projeto.tecnologias.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto pt-4">
                          {projeto.tecnologias.slice(0, 3).map(tech => (
                            <span key={tech} className="text-[10px] px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md">
                              {tech}
                            </span>
                          ))}
                          {projeto.tecnologias.length > 3 && <span className="text-[10px] text-zinc-500 py-1">+{projeto.tecnologias.length - 3}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </FadeIn>

            {/* 4. Artigos Recentes */}
            <FadeIn delay={0.5}>
              <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-2">
                <h3 className="text-xl font-bold text-white">Artigos Recentes</h3>
                <Link href="/artigos" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">Ler o blog →</Link>
              </div>
              
              {artigosRecentes.length === 0 ? (
                <p className="text-zinc-500 text-sm">Ainda não publicaste nenhum artigo.</p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {artigosRecentes.map((artigo) => (
                    <Link 
                      href={`/artigos/${artigo.slug}`} 
                      key={artigo.slug}
                      className="p-5 border border-zinc-800 rounded-xl bg-zinc-900/30 hover:bg-zinc-900/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">{artigo.titulo}</h4>
                        <p className="text-zinc-400 text-sm line-clamp-1">{artigo.resumo}</p>
                      </div>
                      <time className="text-xs text-zinc-500 font-medium whitespace-nowrap bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-800 group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-colors">
                        {new Date(artigo.data).toLocaleDateString('pt-PT')}
                      </time>
                    </Link>
                  ))}
                </div>
              )}
            </FadeIn>

          </main>
        </div>
      </div>
    </PageTransition>
  );
}