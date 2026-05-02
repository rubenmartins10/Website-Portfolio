import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Rúben Martins",
  description: "Learn more about my background and the technologies I work with.",
};

const FadeIn = dynamic(() => import("@/components/animations/FadeIn"), { ssr: true });
const PageTransition = dynamic(() => import("@/components/animations/PageTransition"), { ssr: true });

const skills = [
  { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "Java", "PHP"] },
  { category: "Data & AI", items: ["Python", "Machine Learning", "PostgreSQL", "SQL"] },
  { category: "Tools", items: ["Git", "Figma", "Supabase", "Docker"] },
];

export default function SobrePage() {
  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-28 w-full">

        {/* Header */}
        <FadeIn className="mb-20">
          <p className="section-label mb-2">About me</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            I build software that<br className="hidden md:block" /> <span className="text-gradient">makes a difference.</span>
          </h1>
          <div className="glow-line w-24 mt-6" />
        </FadeIn>

        {/* Main Bio + Photo */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-24">
          <FadeIn delay={0.15} className="md:col-span-3 space-y-6 text-zinc-400 leading-relaxed text-[1.0625rem]">
            <p>
              I&apos;m <strong className="text-white font-medium">Rúben Martins</strong>, a{" "}
              <strong className="text-white font-medium">Computer Engineering</strong> finalist based in Trofa,
              Portugal. Highly self-driven, with a results-oriented mindset and a strong commitment to continuous
              improvement.
            </p>
            <p>
              My main area of interest is{" "}
              <span className="text-emerald-400 font-medium">Data, AI &amp; Machine Learning</span>, where I use{" "}
              <strong className="text-white font-medium">Python</strong> to build data pipelines and models that solve
              real-world problems. I complement this with full-stack web development using{" "}
              <strong className="text-white font-medium">React, Next.js and Node.js</strong>, making sure technical
              solutions reach users in an intuitive way.
            </p>
            <p>
              When I&apos;m not writing code, I&apos;m exploring new technologies, reading about distributed systems
              or contributing to open-source projects. My goal is to grow into an engineering role where I can have
              real impact from day one.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="md:col-span-2">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.07] bg-zinc-900 ring-1 ring-white/[0.04]">
              <Image
                src="/perfil.jpg"
                alt="Rúben Martins"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </FadeIn>
        </div>

        {/* Skills Grid */}
        <FadeIn delay={0.4} className="mb-24">
          <p className="section-label mb-4">Skills</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map(group => (
              <div key={group.category} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">{group.category}</h3>
                <ul className="space-y-1.5">
                  {group.items.map(item => (
                    <li key={item} className="text-sm text-white flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Timeline — Education */}
        <FadeIn delay={0.5} className="mb-24">
          <p className="section-label mb-4">Background</p>
          <div className="space-y-4">
            {[
              {
                period: "2022 – Present",
                title: "BSc in Computer Engineering",
                place: "Instituto Politécnico",
                status: "Ongoing",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="shrink-0 flex flex-col items-center pt-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="w-px flex-1 bg-white/[0.06] mt-2" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="text-xs text-zinc-600">{item.period}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/15">
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                  <p className="text-zinc-500 text-xs mt-0.5">{item.place}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.6}>
          <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.03] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Let&apos;s work together?</h3>
              <p className="text-zinc-400 text-sm">Available for freelance projects and job opportunities.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="mailto:rubendavidsilvamartins@gmail.com" className="btn-primary">
                Contact
              </Link>
              <Link href="/projetos" className="btn-secondary">
                View Projects
              </Link>
            </div>
          </div>
        </FadeIn>

      </div>
    </PageTransition>
  );
}
