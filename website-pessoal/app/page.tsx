import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { projetos, artigos, certificados } from "@/.velite";
import StarfieldCanvas from "@/components/home/StarfieldCanvas";
import TypewriterText from "@/components/home/TypewriterText";

export const metadata: Metadata = {
  title: "Rúben Martins | Junior Engineer",
  description: "Rúben Martins' professional portfolio — Junior Engineer specializing in Data, AI & ML.",
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
    role: "BSc Computer Engineering",
    company: "Universidade do Minho",
    period: "2022 – Present",
    highlights: [
      "Specializing in Data Engineering, AI & Machine Learning.",
      "Final year project: full-stack SaaS inventory management platform (MeClinic).",
      "Key modules: Algorithms, Networks, Database Systems, AI, Software Engineering.",
    ],
  },
];

export default function HomePage() {
  const projetosMostrar = projetos.filter((p) => p.destaque).slice(0, 4);
  const projetosFallback = projetosMostrar.length > 0 ? projetosMostrar : projetos.slice(0, 4);
  const artigosRecentes = [...artigos]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 3);

  const highlights = [
    {
      icon: "🎓",
      label: "EDUCATION",
      title: "Computer Engineering",
      description: "Final year at Universidade do Minho — specializing in AI, Data & Software Engineering.",
    },
    {
      icon: "📜",
      label: "CERTIFICATIONS",
      title: `${certificados.length}+ Certificates`,
      description: "IBM, Forage & Coursera certified in AI, ML, Data Science and Python.",
    },
    {
      icon: "💼",
      label: "PROJECTS",
      title: `${projetosFallback.length}+ Live Projects`,
      description: "Full-stack SaaS and data engineering projects built for real use cases.",
    },
    {
      icon: "🌐",
      label: "STACK",
      title: "Full Stack + AI",
      description: "Python, React, Node.js, PostgreSQL, TensorFlow — end-to-end.",
    },
  ];

  return (
    <>
      <StarfieldCanvas />

      {/* ================================================
          HERO — centered, photo + globe, huge name
      ================================================ */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-10">

        {/* SYSTEM ONLINE */}
        <div className="flex items-center gap-2.5 px-5 py-2 border border-emerald-400/40 rounded-full font-mono text-xs tracking-[0.25em] text-emerald-400 mb-10 bg-emerald-400/5 z-10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SYSTEM ONLINE
        </div>

        {/* Photo + globe visual */}
        <div className="relative flex flex-col items-center z-10">
          {/* Ambient glow behind photo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Circular profile photo */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full ring-2 ring-emerald-400/50 ring-offset-4 ring-offset-black overflow-hidden z-10 mx-auto shadow-2xl shadow-emerald-500/20">
            <Image
              src="/perfil.jpg"
              alt="Rúben Martins"
              fill
              sizes="(max-width: 768px) 192px, 224px"
              className="object-cover"
              priority
            />
          </div>

          {/* Wireframe globe — positioned below photo with overlap */}
          <div className="-mt-16 w-[340px] md:w-[420px] pointer-events-none select-none">
            <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" className="w-full">
              {/* Main sphere outline */}
              <ellipse cx="210" cy="110" rx="196" ry="105" fill="none" stroke="#34d399" strokeOpacity="0.40" strokeWidth="0.9"/>
              {/* Latitude lines */}
              <ellipse cx="210" cy="82"  rx="178" ry="21"  fill="none" stroke="#34d399" strokeOpacity="0.28" strokeWidth="0.65"/>
              <ellipse cx="210" cy="59"  rx="145" ry="15"  fill="none" stroke="#34d399" strokeOpacity="0.20" strokeWidth="0.55"/>
              <ellipse cx="210" cy="40"  rx="98"  ry="10"  fill="none" stroke="#34d399" strokeOpacity="0.14" strokeWidth="0.45"/>
              <ellipse cx="210" cy="26"  rx="46"  ry="6"   fill="none" stroke="#34d399" strokeOpacity="0.09" strokeWidth="0.35"/>
              <ellipse cx="210" cy="138" rx="178" ry="21"  fill="none" stroke="#34d399" strokeOpacity="0.25" strokeWidth="0.65"/>
              <ellipse cx="210" cy="162" rx="145" ry="15"  fill="none" stroke="#34d399" strokeOpacity="0.17" strokeWidth="0.55"/>
              <ellipse cx="210" cy="180" rx="98"  ry="10"  fill="none" stroke="#34d399" strokeOpacity="0.11" strokeWidth="0.45"/>
              <ellipse cx="210" cy="194" rx="46"  ry="6"   fill="none" stroke="#34d399" strokeOpacity="0.07" strokeWidth="0.35"/>
              {/* Longitude arcs */}
              <ellipse cx="210" cy="110" rx="52"  ry="105" fill="none" stroke="#34d399" strokeOpacity="0.24" strokeWidth="0.7"/>
              <ellipse cx="210" cy="110" rx="105" ry="105" fill="none" stroke="#34d399" strokeOpacity="0.18" strokeWidth="0.6"/>
              <ellipse cx="210" cy="110" rx="158" ry="105" fill="none" stroke="#34d399" strokeOpacity="0.13" strokeWidth="0.5"/>
            </svg>
          </div>
        </div>

        {/* Huge name */}
        <h1 className="relative z-10 font-mono font-bold text-center text-white leading-[0.85] tracking-tight text-[clamp(3.2rem,10vw,8rem)] -mt-10 mb-4">
          RÚBEN MARTINS
        </h1>

        {/* Typewriter role */}
        <h2 className="relative z-10 font-mono font-bold text-emerald-400 tracking-[0.3em] text-base md:text-lg mb-8 h-7">
          <TypewriterText texts={["JUNIOR ENGINEER", "DATA SPECIALIST", "AI ENTHUSIAST"]} />
        </h2>

        {/* Bio — NEURAL_CORE style */}
        <div className="relative z-10 max-w-xl mx-auto text-center mb-10">
          <div className="font-mono text-[10px] text-zinc-600 tracking-[0.2em] mb-2">NEURAL_CORE // BIO_LOADER</div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            <span className="text-emerald-400">&gt;</span>{" "}
            Computer Engineering finalist in Trofa, Portugal. Focused on{" "}
            <strong className="text-emerald-400 font-semibold">Data, AI &amp; ML</strong>,
            building systems that solve real problems.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-10 text-center">
          {[
            { value: `${projetos.length}+`, label: "PROJECTS" },
            { value: `${certificados.length}`, label: "CERTIFICATIONS" },
            { value: "3+", label: "YEARS CODING" },
            { value: "2", label: "TECH AREAS" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-mono font-bold text-4xl md:text-5xl text-white mb-1">{s.value}</div>
              <div className="font-mono text-[10px] text-zinc-500 tracking-[0.2em]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="relative z-10 flex gap-4 flex-wrap justify-center mb-16">
          <Link
            href="#projects"
            className="font-mono text-sm font-bold tracking-[0.15em] px-8 py-3.5 bg-emerald-400 text-black hover:bg-emerald-300 transition-all duration-200 rounded"
          >
            VIEW MY WORK
          </Link>
          <Link
            href="/sobre"
            className="font-mono text-sm font-bold tracking-[0.15em] px-8 py-3.5 border border-zinc-600 text-white hover:border-emerald-400/60 hover:text-emerald-400 transition-all duration-200 rounded"
          >
            ABOUT ME
          </Link>
        </div>

        {/* Scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] text-zinc-600 tracking-[0.25em] animate-bounce text-center">
          SCROLL ↓
        </div>
      </section>

      {/* ================================================
          EDUCATION & EXPERIENCE
      ================================================ */}
      <section id="experience" className="relative z-10 py-28 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono font-bold text-2xl md:text-3xl text-white tracking-[0.08em] text-center mb-16">
            EDUCATION &amp; EXPERIENCE
          </h2>

          <div className="flex flex-col gap-8">
            {timeline.map((entry) => (
              <div
                key={entry.role}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-emerald-400/20 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-5">
                  <div>
                    <h3 className="font-mono font-bold text-lg text-emerald-400">{entry.role}</h3>
                    <p className="font-mono text-sm text-zinc-400">{entry.company}</p>
                  </div>
                  <span className="font-mono text-xs text-zinc-600 border border-zinc-800 px-3 py-1.5 rounded-full self-start md:self-auto">
                    {entry.period}
                  </span>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {entry.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-zinc-400">
                      <span className="text-emerald-400 mt-0.5 shrink-0">✦</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          FEATURED PROJECTS
      ================================================ */}
      <section id="projects" className="relative z-10 py-28 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-mono font-bold text-2xl md:text-3xl text-white tracking-[0.08em] mb-3">
              Featured Projects
            </h2>
            <p className="font-mono text-xs text-zinc-500 tracking-[0.2em]">My latest work</p>
          </div>

          <div className="flex flex-col gap-14">
            {projetosFallback.map((projeto) => (
              <div
                key={projeto.slug}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-emerald-400/20 transition-all duration-300"
              >
                {/* Left: details */}
                <div className="flex flex-col">
                  <h3 className="font-mono font-bold text-xl md:text-2xl text-emerald-400 mb-2 leading-tight">
                    {projeto.nome}
                  </h3>
                  {projeto.resumo && (
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">{projeto.resumo}</p>
                  )}

                  {/* Tech tags */}
                  {projeto.tecnologias.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projeto.tecnologias.slice(0, 6).map((tag) => (
                        <span key={tag} className="font-mono text-[10px] text-zinc-500 border border-zinc-700/60 px-2.5 py-1 rounded tracking-wide">
                          {tag}
                        </span>
                      ))}
                      {projeto.tecnologias.length > 6 && (
                        <span className="font-mono text-[10px] text-zinc-600 border border-zinc-800 px-2.5 py-1 rounded">
                          +{projeto.tecnologias.length - 6}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-4 mt-auto">
                    <Link
                      href={`/${projeto.slug}`}
                      className="flex items-center gap-2 font-mono text-xs text-emerald-400 border border-emerald-400/30 px-4 py-2 rounded hover:bg-emerald-400/10 transition-all duration-200"
                    >
                      View Details →
                    </Link>
                    {projeto.url && (
                      <a
                        href={projeto.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-mono text-xs text-zinc-400 border border-zinc-700 px-4 py-2 rounded hover:border-zinc-500 transition-all duration-200"
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: image */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-950 border border-white/5">
                  {projeto.imagem ? (
                    <Image
                      src={projeto.imagem}
                      alt={projeto.nome}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-zinc-700 text-xs tracking-widest">NO PREVIEW</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

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
      <section className="relative z-10 py-28 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono font-bold text-2xl md:text-3xl text-white tracking-[0.08em] text-center mb-16">
            HIGHLIGHTS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="flex flex-col gap-3 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-emerald-400/20 transition-all duration-300"
              >
                <span className="text-2xl">{h.icon}</span>
                <span className="font-mono text-[10px] text-emerald-400 tracking-[0.2em]">{h.label}</span>
                <h3 className="font-mono font-bold text-white text-sm leading-tight">{h.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          SKILLS & EXPERTISE
      ================================================ */}
      <section id="skills" className="relative z-10 py-28 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono font-bold text-2xl md:text-3xl text-white tracking-[0.08em] text-center mb-16">
            Skills &amp; Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <h3 className="font-mono font-bold text-sm text-emerald-400 tracking-[0.15em] mb-6 pb-3 border-b border-emerald-400/20">
                  {group.category}
                </h3>
                <div className="flex flex-col gap-5">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="font-mono text-xs text-zinc-300">{skill.name}</span>
                        <span className="font-mono text-xs text-zinc-500">{skill.level}%</span>
                      </div>
                      <div className="h-0.5 bg-zinc-800 rounded-full">
                        <div
                          className="h-0.5 bg-emerald-400 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          RECENT ARTICLES
      ================================================ */}
      {artigosRecentes.length > 0 && (
        <section className="relative z-10 py-28 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-mono font-bold text-2xl md:text-3xl text-white tracking-[0.08em] text-center mb-16">
              Recent Articles
            </h2>

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
                        <p className="text-zinc-500 text-sm line-clamp-1">{artigo.resumo}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-mono text-xs text-zinc-600">
                      {new Date(artigo.data).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                    <span className="font-mono text-xs text-emerald-400/40 group-hover:text-emerald-400 transition-colors duration-200">&rarr;</span>
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

      {/* ================================================
          CONTACT CTA
      ================================================ */}
      <section id="contact" className="relative z-10 py-40 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-6">CONTACT</div>
          <h2 className="font-mono font-bold text-[clamp(2rem,6vw,4rem)] text-white tracking-tight leading-tight mb-6">
            LET&apos;S BUILD<br />
            <span className="text-emerald-400">SOMETHING GREAT.</span>
          </h2>
          <p className="text-zinc-400 text-sm mb-10 max-w-md mx-auto leading-relaxed">
            Available for freelance projects, internship opportunities and collaborations.
            Don&apos;t hesitate to reach out.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:rubendavidsilvamartins@gmail.com"
              className="font-mono text-sm font-bold tracking-[0.15em] px-8 py-3.5 bg-emerald-400 text-black hover:bg-emerald-300 transition-all duration-200 rounded"
            >
              SEND EMAIL
            </a>
            <Link
              href="/sobre"
              className="font-mono text-sm font-bold tracking-[0.15em] px-8 py-3.5 border border-zinc-600 text-white hover:border-emerald-400/60 hover:text-emerald-400 transition-all duration-200 rounded"
            >
              ABOUT ME
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
