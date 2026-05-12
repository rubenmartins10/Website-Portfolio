import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { projetos, artigos, certificados } from "@/.velite";
import StarfieldCanvas from "@/components/home/StarfieldCanvas";
import TypewriterText from "@/components/home/TypewriterText";
import GlobeDome3D from "@/components/home/GlobeDome3D";
import SkillCategoryCard from "@/components/ui/SkillBar";
import ProjectsCarousel from "@/components/home/ProjectsCarousel";
import Footer from "@/components/layout/Footer";
import BioGenerator from "@/components/home/BioGenerator";
import ScrollSection from "@/components/animations/ScrollSection";

export const metadata: Metadata = {
  title: "Rúben Martins | Junior Engineer",
  description:
    "Rúben Martins' professional portfolio — Junior Engineer specializing in Data, AI & ML.",
};

const SKILL_CATEGORIES = [
  {
    category: "AI & Machine Learning",
    skills: [
      { name: "Python",           keywords: ["python"] },
      { name: "Machine Learning", keywords: ["machine learning", "ml", "predictive", "scikit", "regression", "classification"] },
      { name: "Deep Learning",    keywords: ["deep learning", "neural", "keras", "tensorflow", "pytorch"] },
      { name: "Data Analysis",    keywords: ["data analysis", "exploratory data analysis", "eda", "pandas", "numpy", "mathematical modeling"] },
      { name: "NLP",              keywords: ["natural language processing", "nlp", "chatbot", "text"] },
      { name: "Computer Vision",  keywords: ["computer vision", "image", "opencv"] },
      { name: "MLOps",            keywords: ["mlops", "model deployment", "experiment tracking", "ci/cd", "machine learning lifecycle"] },
    ],
  },
  {
    category: "Web Development",
    skills: [
      { name: "React / Next.js",  keywords: ["react", "next.js", "nextjs"] },
      { name: "TypeScript",       keywords: ["typescript"] },
      { name: "Node.js / Express",keywords: ["node.js", "express"] },
      { name: "JavaScript",       keywords: ["javascript", "js"] },
      { name: "Tailwind CSS",     keywords: ["tailwind"] },
      { name: "PHP",              keywords: ["php"] },
      { name: "Java",             keywords: ["java"] },
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
      { name: "Git / GitHub",  keywords: ["git"] },
      { name: "Linux / Shell", keywords: ["unix", "linux", "shell", "cli", "bash", "task automation"] },
      { name: "Docker",        keywords: ["docker", "container"] },
      { name: "Security",      keywords: ["jwt", "rbac", "helmet", "gdpr", "security", "authentication"] },
      { name: "Figma",         keywords: ["figma"] },
      { name: "REST / API",    keywords: ["rest", "api", "http", "nodemailer"] },
      { name: "CI/CD",         keywords: ["ci/cd", "pipeline", "microservices"] },
    ],
  },
];

function computeSkillScores() {
  const projectTechs: string[] = projetos.flatMap((p) =>
    (p.tecnologias ?? []).map((t) => t.toLowerCase())
  );
  const certSkills: string[] = certificados.flatMap((c) =>
    (c.skills ?? []).map((s: string) => s.toLowerCase())
  );

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

const timeline = [
  {
    role: "Freelance Full-Stack Developer",
    company: "MeClinic — Urgências Dentárias 24h",
    location: "Vila Nova de Gaia, Portugal",
    period: "Sep 2025 – May 2026",
    color: "emerald" as const,
    highlights: [
      "Engineered a production-grade full-stack clinical management platform now deployed and used daily by clinical staff for inventory, appointments, billing and patient records.",
      "Automated physical stock control via USB barcode scanner with real-time low-stock alerts, reducing average inventory update time by approximately 60%.",
      "Implemented an integrated billing and checkout flow with atomic SQL transactions, ensuring inventory deductions and invoice generation are always consistent.",
      "Secured the platform with JWT authentication, Role-Based Access Control, GDPR-compliant patient data handling, bcrypt hashing, rate limiting and HTTPS/TLS encryption.",
      "Delivered automated weekly consumption reports and a real-time KPI dashboard providing management with actionable data without any manual aggregation.",
      "Architected a modular three-tier SPA (React, Node.js, PostgreSQL) designed for scalability and future SaaS commercialisation across multiple clinics.",
    ],
  },
] as const;

const TIMELINE_COLORS = {
  emerald: {
    dot: 'rgb(110, 231, 183)',
    dotGlow: 'rgba(110, 231, 183, 0.3)',
    dotGlow2: 'rgba(110, 231, 183, 0.12)',
    card: 'bg-emerald-950/40',
    cardBorder: 'border-emerald-800/20',
    cardHoverBorder: 'hover:border-emerald-500/30',
    accent: 'text-emerald-400',
    glow: 'bg-emerald-400/8',
    glow2: 'bg-emerald-500/10',
  },
};

export default function HomePage() {
  const skillData = computeSkillScores();
  const projetosFallback = projetos.slice(0, 6);
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
      borderColor: "border-l-yellow-500",
    },
    {
      icon: "📜",
      label: "CERTIFICATIONS",
      title: `${certificados.length}+ Certificates`,
      description:
        "IBM, Forage & Coursera certified in AI, ML, Data Science and Python.",
      borderColor: "border-l-cyan-400",
    },
    {
      icon: "💼",
      label: "PROJECTS",
      title: `${projetosFallback.length}+ Live Projects`,
      description:
        "Full-stack SaaS and data engineering projects built for real use cases.",
      borderColor: "border-l-purple-500",
    },
    {
      icon: "🌐",
      label: "STACK",
      title: "Full Stack + AI",
      description:
        "Python, React, Node.js, PostgreSQL, TensorFlow — end-to-end.",
      borderColor: "border-l-green-500",
    },
  ];

  const stats = [
    { value: `${projetos.length}+`, label: "PROJECTS", color: "text-white", glowColor: "shadow-white/5" },
    { value: `${certificados.length}`, label: "CERTIFICATIONS", color: "text-emerald-400", glowColor: "shadow-emerald-500/10" },
    { value: "3+", label: "YEARS CODING", color: "text-purple-400", glowColor: "shadow-purple-500/10" },
    { value: "2", label: "TECH AREAS", color: "text-white", glowColor: "shadow-white/5" },
  ];

  return (
    <>
      <StarfieldCanvas />

      {/* ================================================
          HERO
      ================================================ */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center overflow-hidden pt-24 md:pt-28 pb-0"
      >
        {/* SYSTEM ONLINE badge */}
        <div className="flex items-center gap-2.5 px-5 py-2 border border-emerald-400/20 rounded-full font-mono text-xs tracking-[0.25em] text-emerald-400 mb-8 bg-emerald-400/3 z-10 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SYSTEM ONLINE
        </div>

        {/* Profile photo + globe */}
        <div className="relative z-10 mb-6 flex items-center justify-center w-[300px] h-[300px] md:w-[360px] md:h-[360px]">
          <div className="absolute inset-0 pointer-events-none" style={{ margin: '-40px' }}>
            <GlobeDome3D />
          </div>
          <div className="absolute inset-0 rounded-full bg-emerald-500/6 blur-3xl scale-125 pointer-events-none" />
          <div className="relative z-10 w-36 h-36 md:w-44 md:h-44 rounded-full ring-2 ring-emerald-300/20 ring-offset-4 ring-offset-zinc-950 overflow-hidden shadow-xl shadow-emerald-500/10">
            <Image
              src="/perfil.jpg"
              alt="Rúben Martins"
              fill
              sizes="(max-width: 768px) 144px, 176px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content below globe */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 mt-2 pb-24 w-full max-w-4xl mx-auto">
          {/* Name */}
          <h1 className="font-mono font-bold text-white leading-[0.9] tracking-tight text-[clamp(1.8rem,5vw,4rem)] mb-4">
            RÚBEN MARTINS
          </h1>

          {/* Typewriter role */}
          <h2 className="font-mono font-bold text-emerald-400 tracking-[0.3em] text-sm md:text-base lg:text-lg mb-8 h-7">
            <TypewriterText
              texts={["JUNIOR ENGINEER", "DATA SPECIALIST", "AI ENTHUSIAST"]}
            />
          </h2>

          {/* Bio Generator — replaces static terminal box */}
          <div className="mb-10 w-full flex justify-center">
            <BioGenerator />
          </div>

          {/* Stats cards — glassmorphism style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12 w-full max-w-2xl">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`text-center py-5 px-3 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm hover:border-emerald-400/20 hover:bg-white/[0.04] transition-all duration-300 shadow-lg ${s.glowColor}`}
              >
                <div className={`font-mono font-bold text-3xl md:text-4xl mb-1 ${s.color}`}>
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
              className="font-mono text-sm font-bold tracking-[0.15em] px-8 py-3.5 bg-emerald-400 text-black hover:bg-emerald-300 transition-all duration-200 rounded hover:shadow-[0_8px_30px_rgba(52,211,153,0.3)]"
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
          <ScrollSection>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-16 flex items-center gap-4 uppercase tracking-widest">
              <span className="w-2 md:w-3 h-10 md:h-12 bg-emerald-400 block rounded-r-lg shrink-0" />
              CAREER IMPACT
            </h2>
          </ScrollSection>

          <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-8">
            {timeline.map((entry, entryIdx) => {
              const colors = TIMELINE_COLORS[entry.color];
              return (
                <ScrollSection key={entry.role} delay={entryIdx * 0.15}>
                  <div className="mb-12 relative pl-8 md:pl-12">
                    {/* Glowing dot */}
                    <div
                      className="absolute w-5 h-5 rounded-full z-10 -left-2.75 top-1"
                      style={{
                        backgroundColor: colors.dot,
                        boxShadow: `${colors.dotGlow} 0px 0px 12px, ${colors.dotGlow2} 0px 0px 24px`,
                        border: '3px solid #08090c',
                      }}
                    />

                    <div className={`${colors.card} backdrop-blur-md rounded-2xl p-6 md:p-8 border ${colors.cardBorder} ${colors.cardHoverBorder} hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}>
                      {/* Radial glow accents */}
                      <div className={`absolute -top-10 -right-10 w-52 h-52 rounded-full ${colors.glow} blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className={`absolute top-1/2 right-8 w-28 h-28 rounded-full ${colors.glow2} blur-2xl pointer-events-none`} />
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2 relative z-10">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {entry.role}
                          </h3>
                          <p className={`font-mono text-sm font-semibold tracking-widest uppercase ${colors.accent}`}>
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
                      <ul className="space-y-3 mt-4 text-zinc-300 relative z-10">
                        {entry.highlights.map((h) => (
                          <li key={h} className="flex gap-3 text-sm md:text-base">
                            <span className={`${colors.accent} shrink-0 mt-1`}>
                              ✦
                            </span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollSection>
              );
            })}
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
        <div className="max-w-5xl mx-auto">
          <ScrollSection>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-12 flex items-center gap-4 uppercase tracking-widest">
              <span className="w-2 md:w-3 h-10 md:h-12 bg-emerald-400 block rounded-r-lg shrink-0" />
              FEATURED PROJECTS
            </h2>
          </ScrollSection>

          <ScrollSection delay={0.1}>
            <ProjectsCarousel projetos={projetosFallback} />
          </ScrollSection>

          <ScrollSection delay={0.2}>
            <div className="mt-8">
              <Link
                href="/projetos"
                className="font-mono text-xs text-zinc-500 hover:text-emerald-400 tracking-[0.25em] transition-colors duration-200"
              >
                ALL PROJECTS →
              </Link>
            </div>
          </ScrollSection>
        </div>
      </section>

      {/* ================================================
          CREDIBILITY
      ================================================ */}
      <section className="relative z-10 py-28 px-6 sm:px-8 lg:px-16 border-t border-white/5">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-emerald-500/3 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollSection>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-12 flex items-center gap-4 uppercase tracking-widest">
              <span className="w-2 md:w-3 h-10 md:h-12 bg-emerald-400 block rounded-r-lg shrink-0" />
              CREDIBILITY
            </h2>
          </ScrollSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <ScrollSection key={h.label} delay={i * 0.1}>
                <div
                  className={`flex flex-col gap-3 p-6 rounded-2xl border border-l-4 ${h.borderColor} border-emerald-800/30 bg-emerald-950/50 backdrop-blur-sm hover:border-emerald-500/20 hover:-translate-y-2 transition-all duration-300 group h-full`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{h.icon}</span>
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
              </ScrollSection>
            ))}
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
        <div className="max-w-5xl mx-auto">
          <ScrollSection>
            <div className="mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-3 flex items-center gap-4 uppercase tracking-widest">
                <span className="w-2 md:w-3 h-10 md:h-12 bg-emerald-400 block rounded-r-lg shrink-0" />
                SKILLS &amp; EXPERTISE
              </h2>
              <p className="font-mono text-zinc-600 text-[11px] tracking-wide pl-6">
                Percentages computed from technologies used across projects and certifications.
              </p>
            </div>
          </ScrollSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillData.map((cat, i) => (
              <ScrollSection key={cat.category} delay={i * 0.1}>
                <SkillCategoryCard
                  category={cat.category}
                  skills={cat.skills}
                />
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          RECENT ARTICLES
      ================================================ */}
      {artigosRecentes.length > 0 && (
        <section className="relative z-10 py-28 px-6 sm:px-8 lg:px-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <ScrollSection>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-12 flex items-center gap-4 uppercase tracking-widest">
                <span className="w-2 md:w-3 h-10 md:h-12 bg-emerald-400 block rounded-r-lg shrink-0" />
                ARTICLES
              </h2>
            </ScrollSection>

            <div className="flex flex-col gap-px">
              {artigosRecentes.map((artigo, i) => (
                <ScrollSection key={artigo.slug} delay={i * 0.08}>
                  <Link
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
                </ScrollSection>
              ))}
            </div>

            <ScrollSection delay={0.3}>
              <div className="mt-10">
                <Link
                  href="/artigos"
                  className="font-mono text-xs text-zinc-500 hover:text-emerald-400 tracking-[0.25em] transition-colors duration-200"
                >
                  ALL ARTICLES →
                </Link>
              </div>
            </ScrollSection>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
