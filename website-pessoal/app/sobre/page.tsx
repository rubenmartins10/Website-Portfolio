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

          <div className="md:col-span-2 flex items-start justify-center md:justify-start">
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden ring-2 ring-emerald-400/40 ring-offset-4 ring-offset-zinc-950 shadow-2xl shadow-emerald-500/20 shrink-0">
              <Image
                src="/perfil.jpg"
                alt="Rúben Martins"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
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

        {/* Education */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-10 flex items-center gap-4 uppercase tracking-widest">
            <span className="w-2 md:w-3 h-10 md:h-12 bg-emerald-400 block rounded-r-lg shrink-0" />
            EDUCATION
          </h2>
          <div className="bg-emerald-950/30 backdrop-blur-sm border border-emerald-800/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Bachelor&apos;s Degree in Computer Engineering</h3>
                <p className="font-mono text-sm font-semibold tracking-widest uppercase text-emerald-400">
                  Universidade Lusófona — Centro Universitário Porto
                </p>
                <p className="font-mono text-xs text-zinc-500 mt-0.5">Porto, Portugal</p>
              </div>
              <span className="font-mono text-xs text-zinc-400 border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap shrink-0">
                Sep 2023 – May 2026 (Expected)
              </span>
            </div>
            <ul className="space-y-2.5 text-zinc-300 text-sm">
              <li className="flex gap-3">
                <span className="text-emerald-400 shrink-0 mt-0.5">✦</span>
                <span><strong className="text-white">Relevant coursework:</strong> Algorithms & Data Structures, Distributed Systems, Software Engineering, Computer Networks, Databases, Operating Systems, Object-Oriented Programming.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 shrink-0 mt-0.5">✦</span>
                <span><strong className="text-white">Final Year Project:</strong> MeClinic — a full-stack clinical management platform built in partnership with a real dental clinic, now in daily production use.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 shrink-0 mt-0.5">✦</span>
                <span><strong className="text-white">Languages:</strong> Portuguese (Native) · English B2/C1 · Spanish (Conversational)</span>
              </li>
            </ul>
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
