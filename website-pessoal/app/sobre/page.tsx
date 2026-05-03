import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import StarfieldCanvas from "@/components/home/StarfieldCanvas";
import SkillCategoryCard from "@/components/ui/SkillBar";
import { projetos, certificados } from "#site/content";

export const metadata: Metadata = {
  title: "About | Rúben Martins",
  description: "Learn more about my background and the technologies I work with.",
};

// ── Skill categories with individual skills and their keyword matchers ────────
const SKILL_CATEGORIES = [
  {
    category: "AI & Machine Learning",
    skills: [
      { name: "Python",              keywords: ["python"] },
      { name: "Machine Learning",    keywords: ["machine learning", "ml", "predictive", "scikit", "regression", "classification"] },
      { name: "Deep Learning",       keywords: ["deep learning", "neural", "keras", "tensorflow", "pytorch"] },
      { name: "Data Analysis",       keywords: ["data analysis", "exploratory data analysis", "eda", "pandas", "numpy", "mathematical modeling"] },
      { name: "NLP",                 keywords: ["natural language processing", "nlp", "chatbot", "text"] },
      { name: "Computer Vision",     keywords: ["computer vision", "image", "opencv"] },
      { name: "MLOps",               keywords: ["mlops", "model deployment", "experiment tracking", "ci/cd", "machine learning lifecycle"] },
    ],
  },
  {
    category: "Web Development",
    skills: [
      { name: "React / Next.js",     keywords: ["react", "next.js", "nextjs"] },
      { name: "TypeScript",          keywords: ["typescript"] },
      { name: "Node.js / Express",   keywords: ["node.js", "express"] },
      { name: "JavaScript",          keywords: ["javascript", "js"] },
      { name: "Tailwind CSS",        keywords: ["tailwind"] },
      { name: "PHP",                 keywords: ["php"] },
      { name: "Java",                keywords: ["java"] },
    ],
  },
  {
    category: "Data & Analytics",
    skills: [
      { name: "SQL / PostgreSQL",    keywords: ["postgresql", "sql", "mysql", "sqlite"] },
      { name: "Data Visualization",  keywords: ["data visualization", "visualization", "dashboard"] },
      { name: "Data Science",        keywords: ["data science", "data engineering", "business understanding", "model analysis"] },
      { name: "EDA",                 keywords: ["exploratory data analysis", "eda", "hypothesis"] },
      { name: "Pandas / NumPy",      keywords: ["pandas", "numpy"] },
      { name: "MongoDB",             keywords: ["mongodb", "supabase", "database", "nosql"] },
    ],
  },
  {
    category: "Tools & Technologies",
    skills: [
      { name: "Git / GitHub",        keywords: ["git"] },
      { name: "Linux / Shell",       keywords: ["unix", "linux", "shell", "cli", "bash", "task automation"] },
      { name: "Docker",              keywords: ["docker", "container"] },
      { name: "Security",            keywords: ["jwt", "rbac", "helmet", "gdpr", "security", "authentication"] },
      { name: "Figma",               keywords: ["figma"] },
      { name: "REST / API",          keywords: ["rest", "api", "http", "nodemailer"] },
      { name: "CI/CD",               keywords: ["ci/cd", "pipeline", "microservices"] },
    ],
  },
];

function computeSkillScores() {
  // Gather all project tecnologias + cert skills into one pool
  const projectTechs: string[] = projetos.flatMap((p) => (p.tecnologias ?? []).map((t) => t.toLowerCase()));
  const certSkills: string[] = certificados.flatMap((c) => (c.skills ?? []).map((s) => s.toLowerCase()));

  return SKILL_CATEGORIES.map(({ category, skills }) => {
    const scored = skills.map(({ name, keywords }) => {
      let pts = 0;
      for (const kw of keywords) {
        pts += projectTechs.filter((t) => t.includes(kw)).length * 3;
        pts += certSkills.filter((s) => s.includes(kw)).length * 1;
      }
      return { name, pts };
    });

    const maxPts = Math.max(...scored.map((s) => s.pts), 1);
    const withPercent = scored.map(({ name, pts }) => ({
      name,
      percent: pts === 0 ? 30 : Math.min(95, Math.round(40 + (pts / maxPts) * 55)),
    }));

    return { category, skills: withPercent };
  });
}

export default function SobrePage() {
  const skillData = computeSkillScores();

  return (
    <>
      <StarfieldCanvas />
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-28 w-full">

        {/* Header */}
        <header className="mb-20">
          <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-4">ABOUT ME</div>
          <h1 className="font-mono font-black text-white text-3xl md:text-5xl uppercase tracking-widest mb-4 flex items-center gap-4">
            <span className="w-2 md:w-3 h-10 md:h-12 bg-emerald-400 block rounded-r-lg shrink-0" />
            WHO I AM
          </h1>
          <p className="text-zinc-400 text-sm font-mono max-w-2xl leading-relaxed">
            I build software that makes a difference.
          </p>
        </header>

        {/* Main Bio + Photo */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-24">
          <div className="md:col-span-3 space-y-5 text-zinc-400 leading-relaxed text-sm md:text-base">
            <p>
              I&apos;m <strong className="text-white font-semibold">Rúben Martins</strong>, a{" "}
              <strong className="text-white font-semibold">Computer Engineering</strong> finalist based in Trofa,
              Portugal. Highly self-driven, with a results-oriented mindset and a strong commitment to continuous
              improvement.
            </p>
            <p>
              My main area of interest is{" "}
              <span className="text-emerald-400 font-semibold">Data, AI &amp; Machine Learning</span>, where I use{" "}
              <strong className="text-white font-semibold">Python</strong> to build data pipelines and models that solve
              real-world problems. I complement this with full-stack web development using{" "}
              <strong className="text-white font-semibold">React, Next.js and Node.js</strong>, making sure technical
              solutions reach users in an intuitive way.
            </p>
            <p>
              When I&apos;m not writing code, I&apos;m exploring new technologies, reading about distributed systems
              or contributing to open-source projects. My goal is to grow into an engineering role where I can have
              real impact from day one.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden border border-white/7 bg-zinc-900 ring-1 ring-white/4">
              <Image
                src="/perfil.jpg"
                alt="Rúben Martins"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <section className="mb-24">
          <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-2">SKILLS &amp; EXPERTISE</div>
          <p className="font-mono text-zinc-600 text-[11px] tracking-wide mb-8">
            Percentages computed from technologies used across projects and certifications.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillData.map((cat) => (
              <SkillCategoryCard
                key={cat.category}
                category={cat.category}
                skills={cat.skills}
              />
            ))}
          </div>
        </section>

        {/* Selected Work */}
        <section className="mb-24">
          <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-8">SELECTED WORK</div>
          <div className="space-y-8">
            {projetos.filter((p) => p.destaque).slice(0, 2).map((projeto) => (
              <div
                key={projeto.slug}
                className="group border border-sky-900/40 rounded-2xl bg-[#0c1827] hover:border-cyan-500/30 transition-all duration-300 overflow-hidden shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 min-h-[380px]">
                  {/* LEFT */}
                  <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                          {new Date(projeto.data).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </span>
                        {projeto.destaque && (
                          <span className="font-mono text-[10px] text-cyan-400 border border-cyan-400/25 bg-cyan-400/8 px-2.5 py-0.5 rounded-full tracking-widest uppercase">
                            ★ FEATURED
                          </span>
                        )}
                      </div>
                      <h2 className="font-bold text-cyan-400 text-2xl md:text-3xl mb-2 leading-tight">
                        {projeto.nome}
                      </h2>
                      {projeto.resumo && (
                        <p className="text-zinc-300 text-sm leading-relaxed mb-6 max-w-lg">
                          {projeto.resumo}
                        </p>
                      )}
                      {projeto.conquistas?.length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span className="font-mono text-[10px] text-cyan-400 tracking-[0.3em] uppercase font-bold">Key Achievements</span>
                          </div>
                          <ul className="space-y-2">
                            {projeto.conquistas.map((c, i) => (
                              <li key={i} className="flex items-start gap-2 text-zinc-300 text-xs leading-relaxed">
                                <svg className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div>
                      {projeto.tecnologias?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {projeto.tecnologias.map((tech) => (
                            <span key={tech} className="font-mono text-[10px] text-zinc-300 border border-zinc-600/50 bg-zinc-800/50 px-3 py-1 rounded-full tracking-wide">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-3">
                        {projeto.url && (
                          <a
                            href={projeto.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-zinc-950 bg-cyan-400 hover:bg-cyan-300 px-6 py-2.5 rounded-full font-bold tracking-widest uppercase transition-colors flex items-center gap-2"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            CODE
                          </a>
                        )}
                        <Link
                          href="/projetos"
                          className="font-mono text-xs text-zinc-300 border border-zinc-600/50 hover:border-cyan-400/40 hover:text-cyan-300 px-6 py-2.5 rounded-full tracking-widest uppercase transition-colors"
                        >
                          All Projects →
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* RIGHT — image */}
                  <div className="md:col-span-2 relative min-h-[200px] md:min-h-0 overflow-hidden">
                    {projeto.imagem ? (
                      <Image
                        src={projeto.imagem}
                        alt={projeto.nome}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
                        <span className="font-mono text-xs text-zinc-700 tracking-widest">NO IMAGE</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-r from-[#0c1827]/70 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline — Education */}
        <section className="mb-24">
          <div className="font-mono text-xs text-emerald-400 tracking-[0.3em] mb-6">BACKGROUND</div>
          <div className="space-y-4">
            {[
              {
                period: "2022 – Present",
                title: "BSc in Computer Engineering",
                place: "Universidade Lusófona do Porto",
                status: "Ongoing",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-white/6 bg-white/2 p-5 hover:border-emerald-400/20 transition-colors">
                <div className="shrink-0 flex flex-col items-center pt-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="w-px flex-1 bg-white/6 mt-2" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-mono text-xs text-zinc-600">{item.period}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/15">
                      {item.status}
                    </span>
                  </div>
                  <h4 className="font-mono text-white font-semibold text-sm">{item.title}</h4>
                  <p className="font-mono text-zinc-500 text-xs mt-0.5">{item.place}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/3 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-mono font-black text-xl text-white uppercase tracking-widest mb-1">LET&apos;S WORK TOGETHER?</h3>
              <p className="text-zinc-400 text-sm">Available for freelance projects and job opportunities.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="mailto:rubendavidsilvamartins@gmail.com"
                className="font-mono text-xs text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-5 py-2.5 rounded-lg font-bold tracking-widest uppercase transition-colors"
              >
                CONTACT
              </Link>
              <Link
                href="/projetos"
                className="font-mono text-xs text-emerald-400 border border-emerald-400/40 hover:border-emerald-400 px-5 py-2.5 rounded-lg font-bold tracking-widest uppercase transition-colors"
              >
                PROJECTS
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
