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
          HERO  —  2-column on desktop
      -------------------------------------------------- */}
      <section className="relative min-h-screen flex items-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — text content */}
          <div className="flex flex-col items-start">
            {/* SYSTEM ONLINE badge */}
            <div className="flex items-center gap-2.5 px-5 py-2 border border-emerald-400/30 rounded-full font-mono text-xs tracking-[0.25em] text-emerald-400 mb-8 bg-emerald-400/[0.05]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ONLINE
            </div>

            {/* Name */}
            <h1 className="font-mono font-bold text-white leading-none tracking-[0.04em] text-[clamp(2.8rem,6vw,5.5rem)] mb-3">
              RÚBEN<br />MARTINS
            </h1>

            {/* Typewriter */}
            <h2 className="font-mono font-bold text-emerald-400 tracking-[0.25em] text-[clamp(0.75rem,1.5vw,1.1rem)] mb-8 h-7">
              <TypewriterText texts={["JUNIOR ENGINEER", "DATA SPECIALIST", "AI ENTHUSIAST"]} />
            </h2>

            {/* Bio */}
            <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-lg">
              Computer Engineering finalist in Trofa, Portugal. Focused on{" "}
              <span className="text-emerald-400">Data, AI &amp; ML</span>,
              building systems that solve real problems.
            </p>

            {/* Stats */}
            <div className="flex gap-10 mb-10">
              {[
                { value: `${projetos.length}+`, label: "PROJECTS" },
                { value: `${certificados.length}`, label: "CERTIFICATIONS" },
                { value: "3+", label: "YEARS CODING" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono font-bold text-3xl text-white mb-1">{stat.value}</div>
                  <div className="font-mono text-[10px] text-zinc-500 tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/projetos"
                className="font-mono text-sm font-bold tracking-[0.15em] px-8 py-3.5 bg-emerald-400 text-[#08090c] hover:bg-emerald-300 transition-all duration-200 rounded"
              >
                VIEW PROJECTS
              </Link>
              <Link
                href="/sobre"
                className="font-mono text-sm font-bold tracking-[0.15em] px-8 py-3.5 border border-zinc-600 text-white hover:border-emerald-400/60 hover:text-emerald-400 transition-all duration-200 rounded"
              >
                ABOUT ME
              </Link>
            </div>
          </div>

          {/* RIGHT — photo */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative flex flex-col items-center">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Profile photo */}
              <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-2xl ring-1 ring-emerald-400/30 ring-offset-4 ring-offset-[#08090c] overflow-hidden shadow-2xl shadow-emerald-500/10 z-10">
                <Image
                  src="/perfil.jpg"
                  alt="Rúben Martins"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-8 z-20 flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-white/[0.08] rounded-xl shadow-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px] text-zinc-300 tracking-wider">Available for hire</span>
              </div>
              <div className="absolute -bottom-4 -left-8 z-20 flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-white/[0.08] rounded-xl shadow-xl">
                <span className="font-mono text-[11px] text-zinc-300 tracking-wider">📍 Trofa, Portugal</span>
              </div>

              {/* Wireframe hemisphere */}
              <div className="-mt-10 w-96 pointer-events-none select-none opacity-50">
                <svg viewBox="0 0 380 100" xmlns="http://www.w3.org/2000/svg" className="w-full">
                  <ellipse cx="190" cy="50" rx="175" ry="45" fill="none" stroke="#34d399" strokeOpacity="0.3" strokeWidth="0.8"/>
                  <ellipse cx="190" cy="65" rx="145" ry="14" fill="none" stroke="#34d399" strokeOpacity="0.22" strokeWidth="0.6"/>
                  <ellipse cx="190" cy="78" rx="105" ry="10" fill="none" stroke="#34d399" strokeOpacity="0.16" strokeWidth="0.5"/>
                  <ellipse cx="190" cy="50" rx="45" ry="45" fill="none" stroke="#34d399" strokeOpacity="0.18" strokeWidth="0.6"/>
                  <ellipse cx="190" cy="50" rx="90" ry="45" fill="none" stroke="#34d399" strokeOpacity="0.14" strokeWidth="0.5"/>
                </svg>
              </div>
            </div>
          </div>

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
      <section className="relative z-10 py-32 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-14 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-emerald-400 rounded-full flex-shrink-0" />
              <span className="font-mono font-bold text-xl md:text-2xl tracking-[0.1em] text-white">
                FEATURED PROJECTS
              </span>
            </div>
            <Link
              href="/projetos"
              className="font-mono text-xs text-zinc-500 hover:text-emerald-400 tracking-[0.25em] transition-colors duration-200"
            >
              ALL PROJECTS &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projetosFallback.map((projeto, i) => (
              <Link
                key={projeto.slug}
                href={`/${projeto.slug}`}
                className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-emerald-400/20 transition-all duration-300 overflow-hidden"
              >
                {/* Cover image */}
                {projeto.imagem && (
                  <div className="relative w-full aspect-video overflow-hidden bg-zinc-950 border-b border-white/[0.05]">
                    <Image
                      src={projeto.imagem}
                      alt={projeto.nome}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  </div>
                )}

                <div className="p-8">
                  <h3 className={`font-mono font-bold text-xl md:text-2xl ${projectColors[i % projectColors.length]} mb-3 leading-tight`}>
                    {projeto.nome}
                  </h3>
                  {projeto.resumo && (
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {projeto.resumo}
                    </p>
                  )}
                  {projeto.tecnologias && projeto.tecnologias.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projeto.tecnologias.slice(0, 5).map((tag) => (
                        <span key={tag} className="font-mono text-[10px] text-zinc-500 border border-zinc-700/60 px-2.5 py-1 rounded tracking-[0.1em]">
                          {tag}
                        </span>
                      ))}
                      {projeto.tecnologias.length > 5 && (
                        <span className="font-mono text-[10px] text-zinc-600 border border-zinc-800 px-2.5 py-1 rounded tracking-[0.1em]">
                          +{projeto.tecnologias.length - 5}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400/60 tracking-[0.15em] group-hover:text-emerald-400 transition-colors duration-200">
                    VIEW PROJECT &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          COMPETÊNCIAS / TECH STACK
      -------------------------------------------------- */}
      <section className="relative z-10 py-32 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-14">
            <div className="w-1 h-8 bg-emerald-400 rounded-full flex-shrink-0" />
            <span className="font-mono font-bold text-xl md:text-2xl tracking-[0.1em] text-white">
              SKILLS
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group flex flex-col items-center gap-3 p-5 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-400/20 transition-all duration-200 rounded-xl"
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 opacity-75 group-hover:opacity-100 transition-opacity"
                />
                <span className="font-mono text-[11px] text-zinc-500 group-hover:text-zinc-300 tracking-[0.06em] transition-colors text-center">
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
        <section className="relative z-10 py-32 px-6 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto">
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
      <section className="relative z-10 py-40 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto text-center">
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