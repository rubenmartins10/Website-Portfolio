import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { projetos, artigos, certificados } from "@/.velite";
import StarfieldCanvas from "@/components/home/StarfieldCanvas";
import TypewriterText from "@/components/home/TypewriterText";
import GlobeDome3D from "@/components/home/GlobeDome3D";
import ProjectsCarousel from "@/components/projetos/ProjectsCarousel";

export const metadata: Metadata = {
  title: "Rúben Martins | Junior Engineer",
  description:
    "Rúben Martins' professional portfolio — Junior Engineer specializing in Data, AI & ML.",
};

const skillGroups = [
  {
    category: "Data & AI",
    skills: [
      { name: "Python", level: 85 },
      { name: "Machine Learning", level: 72 },
      { name: "Data Analysis", level: 80 },
      { name: "TensorFlow / Keras", level: 65 },
      { name: "SQL / PostgreSQL", level: 80 },
    ],
  },
  {
    category: "Web Development",
    skills: [
      { name: "React / Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Node.js / Express", level: 75 },
      { name: "PHP", level: 60 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    category: "Tools & Systems",
    skills: [
      { name: "Git / GitHub", level: 88 },
      { name: "Linux / Shell", level: 65 },
      { name: "Java", level: 70 },
      { name: "C / C++", level: 60 },
      { name: "Figma", level: 68 },
    ],
  },
];

const timeline = [
  {
    role: "Freelance Full-Stack Developer",
    company: "MeClinic — Urgências Dentárias 24h",
    location: "Vila Nova de Gaia",
    period: "Sep 2025 – Present",
    highlights: [
      "Developed a full-stack SaaS platform currently in use for internal clinic operations — reducing average stock update time by ~60%.",
      "Built inventory control with barcode scanner support, real-time low-stock alerts, appointment scheduling and patient management.",
      "Integrated billing & checkout, automated consumption reports and RBAC with GDPR compliance.",
      "Architecture: three-tier model with JWT authentication, ACID transactional integrity. Stack: React, Node.js, PostgreSQL, REST API.",
    ],
  },
] as const;

export default function HomePage() {
  const projetosMostrar = projetos.filter((p) => p.destaque).slice(0, 4);
  const projetosFallback =
    projetosMostrar.length > 0 ? projetosMostrar : projetos.slice(0, 4);
  const artigosRecentes = [...artigos]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 3);

  const highlights = [
    {
      icon: "🎓",
      label: "EDUCATION",
      title: "Computer Engineering",
      description:
        "Final year at Universidade Lusófona do Porto — specializing in AI, Data & Software Engineering.",
    },
    {
      icon: "📜",
      label: "CERTIFICATIONS",
      title: `${certificados.length}+ Certificates`,
      description:
        "IBM, Forage & Coursera certified in AI, ML, Data Science and Python.",
    },
    {
      icon: "💼",
      label: "PROJECTS",
      title: `${projetosFallback.length}+ Live Projects`,
      description:
        "Full-stack SaaS and data engineering projects built for real use cases.",
    },
    {
      icon: "🌐",
      label: "STACK",
      title: "Full Stack + AI",
      description:
        "Python, React, Node.js, PostgreSQL, TensorFlow — end-to-end.",
    },
  ];

  return (
    <>
      <StarfieldCanvas />

      {/* ================================================
          HERO — photo sitting on globe dome
      ================================================ */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center overflow-hidden pt-24 md:pt-28 pb-0"
      >
        {/* SYSTEM ONLINE */}
        <div className="flex items-center gap-2.5 px-5 py-2 border border-emerald-400/40 rounded-full font-mono text-xs tracking-[0.25em] text-emerald-400 mb-8 bg-emerald-400/5 z-10 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SYSTEM ONLINE
        </div>

        {/* Circular profile photo */}
        <div className="relative z-10 mb-0">
          {/* Ambient glow */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-emerald-500/20 blur-3xl scale-150 pointer-events-none" />
          <div className="relative w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full ring-2 ring-emerald-400/60 ring-offset-4 ring-offset-zinc-950 overflow-hidden shadow-2xl shadow-emerald-500/30">
            <Image
              src="/perfil.jpg"
              alt="Rúben Martins"
              fill
              sizes="(max-width: 768px) 176px, (max-width: 1024px) 224px, 256px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* 3-D Globe dome — full-width, sits right below photo */}
        <div
          className="relative w-full pointer-events-none select-none z-0 overflow-hidden"
          style={{ height: "280px", marginTop: "-55px" }}
        >
          <div style={{ position: 'absolute', top: '-160px', left: 0, right: 0, height: '440px' }}>
            <GlobeDome3D />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-zinc-950 to-transparent" />
        </div>

        {/* Content below globe */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 -mt-16 pb-24 w-full max-w-4xl mx-auto">
          {/* Huge name */}
          <h1 className="font-mono font-bold text-white leading-[0.85] tracking-tight text-[clamp(3rem,9vw,8.5rem)] mb-4">
            RÚBEN MARTINS
          </h1>

          {/* Typewriter role */}
          <h2 className="font-mono font-bold text-emerald-400 tracking-[0.3em] text-sm md:text-base lg:text-lg mb-8 h-7">
            <TypewriterText
              texts={["JUNIOR ENGINEER", "DATA SPECIALIST", "AI ENTHUSIAST"]}
            />
          </h2>

          {/* Bio — terminal box */}
          <div
            className="mb-10 w-full max-w-xl lg:max-w-2xl rounded-lg text-left"
            style={{
              background: 'rgba(10,10,15,0.75)',
              border: '1px solid rgba(52,211,153,0.3)',
              padding: '1rem 1.25rem',
            }}
          >
            {/* macOS traffic lights */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
              <span className="ml-2 font-mono text-zinc-500 text-[10px] tracking-[0.2em]">
                NEURAL_CORE // BIO_LOADER
              </span>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed font-mono">
              <span className="text-emerald-400 mr-1">&gt;</span>
              Computer Engineering finalist in Trofa, Portugal. Focused on{" "}
              <strong className="text-emerald-400 font-semibold">
                Data, AI &amp; ML
              </strong>
              , building systems that solve real problems.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 lg:gap-20 mb-12 w-full">
            {[
              { value: `${projetos.length}+`, label: "PROJECTS", color: "text-white" },
              { value: `${certificados.length}`, label: "CERTIFICATIONS", color: "text-emerald-400" },
              { value: "3+", label: "YEARS CODING", color: "text-purple-400" },
              { value: "2", label: "TECH AREAS", color: "text-white" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className={`font-mono font-bold text-4xl md:text-5xl lg:text-6xl mb-1 ${s.color}`}>
                  {s.value}
                </div>
                <div className="font-mono text-[10px] text-zinc-500 tracking-[0.2em]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="#projects"
              className="font-mono text-sm font-bold tracking-[0.15em] px-8 py-3.5 bg-emerald-400 text-black hover:bg-emerald-300 transition-all duration-200 rounded"
            >
              VIEW MY WORK
            </Link>
            <a
              href="/RubenMartins_CV.pdf"
              download
              className="font-mono text-sm font-bold tracking-[0.15em] px-8 py-3.5 border border-zinc-600 text-white hover:border-emerald-400/60 hover:text-emerald-400 transition-all duration-200 rounded"
            >
              DOWNLOAD CV
            </a>
          </div>

          {/* Scroll hint */}
          <div className="mt-14 font-mono text-[10px] text-zinc-600 tracking-[0.25em] animate-bounce">
            SCROLL ↓
          </div>
        </div>
      </section>

      {/* ================================================
          CAREER IMPACT
      ================================================ */}
      <section
        id="experience"
        className="relative z-10 py-28 px-6 sm:px-8 lg:px-16 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-16 flex items-center gap-4 uppercase tracking-widest">
            <span className="w-2 md:w-3 h-10 md:h-12 bg-emerald-400 block rounded-r-lg shrink-0" />
            CAREER IMPACT
          </h2>

          <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-8">
            {timeline.map((entry) => (
              <div key={entry.role} className="mb-12 relative pl-8 md:pl-12">
                {/* Glowing dot */}
                <div
                  className="absolute w-5 h-5 rounded-full z-10 -left-2.75 top-1"
                  style={{
                    backgroundColor: "rgb(52, 211, 153)",
                    boxShadow:
                      "rgba(52, 211, 153, 0.5) 0px 0px 15px, rgba(52, 211, 153, 0.25) 0px 0px 30px",
                    border: "3px solid #08090c",
                  }}
                />

                <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/5 hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {entry.role}
                      </h3>
                      <p className="font-mono text-sm font-semibold tracking-widest uppercase text-emerald-400">
                        {entry.company}
                      </p>
                      <p className="font-mono text-xs text-zinc-500 mt-0.5">
                        {entry.location}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-zinc-400 border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 mt-2 md:mt-0">
                      {entry.period}
                    </span>
                  </div>
                  <ul className="space-y-3 mt-4 text-zinc-300">
                    {entry.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm md:text-base">
                        <span className="text-emerald-400 shrink-0 mt-1">
                          ✦
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          FEATURED PROJECTS
      ================================================ */}
      <section
        id="projects"
        className="relative z-10 py-28 px-6 sm:px-8 lg:px-16 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-4">
              FEATURED PROJECTS
            </div>
            <h2 className="font-mono font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
              MY LATEST WORK
            </h2>
          </div>

          <ProjectsCarousel projetos={projetosFallback} />

          <div className="mt-12 text-center">
            <Link
              href="/projetos"
              className="font-mono text-xs text-zinc-500 hover:text-emerald-400 tracking-[0.25em] transition-colors duration-200"
            >
              ALL PROJECTS →
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================
          HIGHLIGHTS / CREDIBILITY
      ================================================ */}
      <section className="relative z-10 py-28 px-6 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-4">
              CREDIBILITY
            </div>
            <h2 className="font-mono font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
              HIGHLIGHTS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, i) => {
              const borderColors = ['border-l-yellow-500', 'border-l-cyan-400', 'border-l-purple-500', 'border-l-green-500']
              return (
              <div
                key={h.label}
                className={`flex flex-col gap-3 p-6 rounded-2xl border border-white/5 border-l-4 ${borderColors[i % borderColors.length]} bg-white/2 hover:border-emerald-400/20 hover:-translate-y-2 transition-all duration-300`}
              >
                <span className="text-2xl">{h.icon}</span>
                <span className="font-mono text-[10px] text-emerald-400 tracking-[0.2em]">
                  {h.label}
                </span>
                <h3 className="font-mono font-bold text-white text-sm leading-tight">
                  {h.title}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {h.description}
                </p>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================
          SKILLS & EXPERTISE
      ================================================ */}
      <section
        id="skills"
        className="relative z-10 py-28 px-6 sm:px-8 lg:px-16 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-4">
              EXPERTISE
            </div>
            <h2 className="font-mono font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
              SKILLS &amp; TOOLS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {skillGroups.map((group) => {
              const gradients: Record<string, { from: string; to: string; bar: string }> = {
                'Data & AI': { from: '#34d399', to: '#22d3ee', bar: 'linear-gradient(90deg,#34d399,#22d3ee)' },
                'Web Development': { from: '#60a5fa', to: '#34d399', bar: 'linear-gradient(90deg,#60a5fa,#34d399)' },
                'Tools & Systems': { from: '#c084fc', to: '#f472b6', bar: 'linear-gradient(90deg,#c084fc,#f472b6)' },
              }
              const g = gradients[group.category] ?? { from: '#34d399', to: '#34d399', bar: 'linear-gradient(90deg,#34d399,#34d399)' }
              return (
              <div key={group.category}>
                <h3
                  className="font-mono font-bold text-sm tracking-[0.15em] mb-6 pb-3 border-b border-white/10"
                  style={{ background: `linear-gradient(90deg,${g.from},${g.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {group.category}
                </h3>
                <div className="flex flex-col gap-5">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="font-mono text-xs text-zinc-300">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-zinc-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${skill.level}%`, background: g.bar }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================
          RECENT ARTICLES
      ================================================ */}
      {artigosRecentes.length > 0 && (
        <section className="relative z-10 py-28 px-6 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-4">
                ARTICLES
              </div>
              <h2 className="font-mono font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
                RECENT WRITING
              </h2>
            </div>

            <div className="flex flex-col gap-px">
              {artigosRecentes.map((artigo, i) => (
                <Link
                  key={artigo.slug}
                  href={`/${artigo.slug}`}
                  className="group flex items-start justify-between gap-6 py-6 border-b border-white/5 hover:border-emerald-400/20 transition-colors duration-200"
                >
                  <div className="flex items-start gap-5 flex-1 min-w-0">
                    <span className="font-mono text-xs text-zinc-700 mt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-mono text-base text-white group-hover:text-emerald-400 transition-colors duration-200 truncate mb-1">
                        {artigo.titulo}
                      </h3>
                      {artigo.resumo && (
                        <p className="text-zinc-500 text-sm line-clamp-1">
                          {artigo.resumo}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-mono text-xs text-zinc-600">
                      {new Date(artigo.data).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="font-mono text-xs text-emerald-400/40 group-hover:text-emerald-400 transition-colors duration-200">
                      &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/artigos"
                className="font-mono text-xs text-zinc-500 hover:text-emerald-400 tracking-[0.25em] transition-colors duration-200"
              >
                ALL ARTICLES →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
