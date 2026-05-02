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

const techStack = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
];

const projectColors = [
  "text-emerald-400",
  "text-purple-400",
  "text-orange-400",
  "text-sky-400",
];

export default function HomePage() {
  const projetosMostrar = projetos.filter((p) => p.destaque).slice(0, 4);
  const projetosFallback = projetosMostrar.length > 0 ? projetosMostrar : projetos.slice(0, 4);
  const artigosRecentes = [...artigos]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 3);

  return (
    <>
      <StarfieldCanvas />

      {/* --------------------------------------------------
          HERO
      -------------------------------------------------- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-24 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

        {/* SYSTEM ONLINE badge */}
        <div className="relative z-10 flex items-center gap-2.5 px-5 py-2 border border-emerald-400/30 rounded-full font-mono text-xs tracking-[0.25em] text-emerald-400 mb-10 bg-emerald-400/[0.05]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SYSTEM ONLINE
        </div>

        {/* Photo + wireframe globe */}
        <div className="relative z-10 flex flex-col items-center mb-2 animate-float">
          {/* Outer glow ring */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Profile photo */}
          <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full ring-2 ring-emerald-400/40 ring-offset-4 ring-offset-[#08090c] overflow-hidden shadow-2xl shadow-emerald-500/10 z-10">
            <Image
              src="/perfil.jpg"
              alt="Rúben Martins"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Wireframe hemisphere SVG */}
          <div className="-mt-10 w-80 md:w-96 pointer-events-none select-none">
            <svg viewBox="0 0 380 160" xmlns="http://www.w3.org/2000/svg" className="w-full opacity-70">
              {/* Equator */}
              <ellipse cx="190" cy="80" rx="175" ry="75" fill="none" stroke="#34d399" strokeOpacity="0.35" strokeWidth="0.8"/>
              {/* Latitude lines */}
              <ellipse cx="190" cy="100" rx="155" ry="18" fill="none" stroke="#34d399" strokeOpacity="0.28" strokeWidth="0.7"/>
              <ellipse cx="190" cy="118" rx="120" ry="14" fill="none" stroke="#34d399" strokeOpacity="0.22" strokeWidth="0.6"/>
              <ellipse cx="190" cy="132" rx="80" ry="10" fill="none" stroke="#34d399" strokeOpacity="0.17" strokeWidth="0.5"/>
              <ellipse cx="190" cy="142" rx="45" ry="6" fill="none" stroke="#34d399" strokeOpacity="0.12" strokeWidth="0.4"/>
              <ellipse cx="190" cy="60" rx="155" ry="18" fill="none" stroke="#34d399" strokeOpacity="0.20" strokeWidth="0.6"/>
              <ellipse cx="190" cy="42" rx="120" ry="14" fill="none" stroke="#34d399" strokeOpacity="0.14" strokeWidth="0.5"/>
              {/* Longitude arcs */}
              <ellipse cx="190" cy="80" rx="45" ry="75" fill="none" stroke="#34d399" strokeOpacity="0.22" strokeWidth="0.7"/>
              <ellipse cx="190" cy="80" rx="90" ry="75" fill="none" stroke="#34d399" strokeOpacity="0.18" strokeWidth="0.6"/>
              <ellipse cx="190" cy="80" rx="140" ry="75" fill="none" stroke="#34d399" strokeOpacity="0.15" strokeWidth="0.5"/>
            </svg>
          </div>
        </div>

        {/* Name */}
        <h1 className="relative z-10 font-mono font-bold text-center text-white leading-none tracking-[0.05em] text-[clamp(2.8rem,9vw,7.5rem)] mb-3 animate-fade-in">
          RÚBEN MARTINS
        </h1>

        {/* Title typewriter */}
        <h2 className="relative z-10 font-mono font-bold text-center text-emerald-400 tracking-[0.3em] text-[clamp(0.8rem,2.5vw,1.4rem)] mb-8 h-8">
          <TypewriterText texts={["JUNIOR ENGINEER", "DATA SPECIALIST", "AI ENTHUSIAST"]} />
        </h2>

        {/* Terminal bio */}
        <div className="relative z-10 w-full max-w-lg mx-auto font-mono mb-10 text-center">
          <div className="text-zinc-600 text-xs tracking-[0.2em] mb-2">NEURAL_CORE // BIO_LOADER</div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            <span className="text-emerald-400">{">"}</span>{" "}
            Computer Engineering finalist in Trofa, Portugal.
            Focused on{" "}
            <span className="text-emerald-400">Data, AI & ML</span>,
            building systems that solve real problems.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-6 md:gap-12 mb-10 text-center">
          {[
            { value: `${projetos.length}+`, label: "PROJECTS" },
            { value: `${certificados.length}`, label: "CERTIFICATIONS" },
            { value: "3+", label: "YEARS CODING" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-mono font-bold text-4xl md:text-5xl text-white mb-1">{stat.value}</div>
              <div className="font-mono text-[10px] text-zinc-500 tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="relative z-10 flex gap-4 flex-wrap justify-center mb-16">
          <Link
            href="/projetos"
            className="font-mono text-sm font-bold tracking-[0.15em] px-8 py-3.5 border border-zinc-600 text-white hover:border-emerald-400/60 hover:text-emerald-400 transition-all duration-200 rounded"
          >
            VIEW PROJECTS
          </Link>
          <Link
            href="/sobre"
            className="font-mono text-sm font-bold tracking-[0.15em] px-8 py-3.5 bg-emerald-400 text-[#08090c] hover:bg-emerald-300 transition-all duration-200 rounded"
          >
            ABOUT ME
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 font-mono text-[10px] text-zinc-600 tracking-[0.25em] animate-bounce">
          <span>SCROLL</span>
          <span>&#8595;</span>
        </div>
      </section>

      {/* --------------------------------------------------
          PROJETOS DESTAQUE
      -------------------------------------------------- */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-14">
            <div className="w-1 h-8 bg-emerald-400 rounded-full flex-shrink-0" />
            <span className="font-mono font-bold text-xl md:text-2xl tracking-[0.1em] text-white">
              FEATURED PROJECTS
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projetosFallback.map((projeto, i) => (
              <Link
                key={projeto.slug}
                href={`/${projeto.slug}`}
                className="project-card group block"
              >
                <h3 className={`font-mono font-bold text-2xl md:text-3xl ${projectColors[i % projectColors.length]} mb-3 leading-tight`}>
                  {projeto.nome}
                </h3>
                {projeto.resumo && (
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {projeto.resumo}
                  </p>
                )}
                {projeto.tecnologias && projeto.tecnologias.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projeto.tecnologias.slice(0, 4).map((tag) => (
                      <span key={tag} className="font-mono text-[10px] text-zinc-500 border border-zinc-700/60 px-2.5 py-1 rounded tracking-[0.1em]">
                        {tag}
                      </span>
                    ))}
                    {projeto.tecnologias.length > 4 && (
                      <span className="font-mono text-[10px] text-zinc-600 border border-zinc-800 px-2.5 py-1 rounded tracking-[0.1em]">
                        +{projeto.tecnologias.length - 4}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400/60 tracking-[0.15em] group-hover:text-emerald-400 transition-colors duration-200">
                  VIEW PROJECT &rarr;
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/projetos"
              className="font-mono text-xs text-zinc-500 hover:text-emerald-400 tracking-[0.25em] transition-colors duration-200"
            >
              ALL PROJECTS &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          COMPETÊNCIAS / TECH STACK
      -------------------------------------------------- */}
      <section className="relative z-10 py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-14">
            <div className="w-1 h-8 bg-emerald-400 rounded-full flex-shrink-0" />
            <span className="font-mono font-bold text-xl md:text-2xl tracking-[0.1em] text-white">
              SKILLS
            </span>
          </div>

          <div className="flex flex-wrap gap-3 justify-start">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group flex items-center gap-2.5 px-4 py-2.5 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-400/20 transition-all duration-200 rounded-lg"
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <span className="font-mono text-xs text-zinc-400 group-hover:text-white tracking-[0.08em] transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          ARTIGOS RECENTES
      -------------------------------------------------- */}
      {artigosRecentes.length > 0 && (
        <section className="relative z-10 py-24 px-6 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-14">
              <div className="w-1 h-8 bg-emerald-400 rounded-full flex-shrink-0" />
              <span className="font-mono font-bold text-xl md:text-2xl tracking-[0.1em] text-white">
                RECENT ARTICLES
              </span>
            </div>

            <div className="flex flex-col gap-px">
              {artigosRecentes.map((artigo, i) => (
                <Link
                  key={artigo.slug}
                  href={`/${artigo.slug}`}
                  className="group flex items-start justify-between gap-6 py-6 border-b border-white/[0.05] hover:border-emerald-400/20 transition-colors duration-200"
                >
                  <div className="flex items-start gap-5 flex-1 min-w-0">
                    <span className="font-mono text-xs text-zinc-700 mt-1 flex-shrink-0">
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
                  <div className="flex items-center gap-4 flex-shrink-0">
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
                ALL ARTICLES &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------
          CONTACTO CTA
      -------------------------------------------------- */}
      <section className="relative z-10 py-32 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-6">CONTACT</div>
          <h2 className="font-mono font-bold text-[clamp(2rem,6vw,4.5rem)] text-white tracking-[0.05em] leading-tight mb-6">
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
              className="font-mono text-sm font-bold tracking-[0.15em] px-8 py-3.5 bg-emerald-400 text-[#08090c] hover:bg-emerald-300 transition-all duration-200 rounded"
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