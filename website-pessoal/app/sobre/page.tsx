import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import StarfieldCanvas from "@/components/home/StarfieldCanvas";
import SkillBar from "@/components/ui/SkillBar";
import { projetos, certificados } from "#site/content";

export const metadata: Metadata = {
  title: "About | Rúben Martins",
  description: "Learn more about my background and the technologies I work with.",
};

// ── Skill categories: keywords for matching + fixed display tags ──────────────
const SKILL_CATEGORIES = [
  {
    label: "AI & Machine Learning",
    keywords: ["python", "machine learning", "deep learning", "keras", "tensorflow", "pytorch",
      "scikit", "pandas", "numpy", "nlp", "natural language", "computer vision",
      "neural", "data analysis", "predictive", "recommender", "mlops", "reinforcement",
      "artificial intelligence", "generative", "llm", "model deployment",
      "machine learning lifecycle", "experiment tracking", "feature stores", "ml"],
    displaySkills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "Keras", "MLOps", "NLP", "Computer Vision"],
  },
  {
    label: "Web Development",
    keywords: ["react", "next.js", "typescript", "javascript", "node.js", "express",
      "php", "java", "tailwind", "html", "css", "context api", "react router",
      "redux", "graphql", "rest", "websocket", "web", "frontend", "backend"],
    displaySkills: ["React", "Next.js", "TypeScript", "Node.js", "Express", "JavaScript", "Tailwind CSS"],
  },
  {
    label: "Data & Analytics",
    keywords: ["postgresql", "sql", "mongodb", "supabase", "mysql", "sqlite", "database",
      "data visualization", "analytics", "data science", "data engineering",
      "etl", "pipeline", "cloud computing", "cluster computing", "microservices"],
    displaySkills: ["PostgreSQL", "SQL", "Python", "Data Science", "Pandas", "NumPy", "Data Visualization"],
  },
  {
    label: "Tools & Technologies",
    keywords: ["git", "docker", "figma", "jwt", "rbac", "helmet", "linux", "unix",
      "bash", "nginx", "aws", "azure", "shell", "cli", "jspdf", "pdf",
      "security", "ci/cd", "task automation", "shell scripting", "process automation",
      "model deployment", "microservices", "nodemailer"],
    displaySkills: ["Git", "Docker", "Unix / CLI", "JWT", "REST API", "CI/CD", "Figma"],
  },
];

function computeSkillScores() {
  const scores: Record<string, number> = {};
  for (const cat of SKILL_CATEGORIES) scores[cat.label] = 0;

  // Project technologies — each match = 3 pts
  for (const projeto of projetos) {
    for (const tech of projeto.tecnologias ?? []) {
      const t = tech.toLowerCase();
      for (const cat of SKILL_CATEGORIES) {
        if (cat.keywords.some((kw) => t.includes(kw))) {
          scores[cat.label] += 3;
        }
      }
    }
  }

  // Certification skills — each match = 1 pt
  for (const cert of certificados) {
    for (const skill of cert.skills ?? []) {
      const s = skill.toLowerCase();
      for (const cat of SKILL_CATEGORIES) {
        if (cat.keywords.some((kw) => s.includes(kw))) {
          scores[cat.label] += 1;
        }
      }
    }
  }

  // Normalise: highest score → 95%, rest proportional, minimum 28%
  const maxScore = Math.max(...Object.values(scores), 1);
  const result: Record<string, number> = {};
  for (const [label, score] of Object.entries(scores)) {
    result[label] = Math.min(95, Math.round(28 + (score / maxScore) * 67));
  }
  return result;
}

export default function SobrePage() {
  const scores = computeSkillScores();

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILL_CATEGORIES.map((cat) => (
              <SkillBar
                key={cat.label}
                label={cat.label}
                percent={scores[cat.label]}
                skills={cat.displaySkills}
              />
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
                place: "Instituto Politécnico",
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
