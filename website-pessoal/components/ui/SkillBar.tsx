"use client";

import { useEffect, useRef, useState } from "react";

type SkillEntry = { name: string; percent: number };

type SkillCategoryCardProps = {
  category: string;
  skills: SkillEntry[];
};

const GRADIENTS: Record<string, string> = {
  "AI & Machine Learning": "from-emerald-400 to-cyan-400",
  "Web Development":       "from-cyan-400 to-blue-400",
  "Data & Analytics":      "from-teal-400 to-emerald-400",
  "Tools & Technologies":  "from-violet-500 to-fuchsia-500",
};

const GLOW_COLORS: Record<string, string> = {
  "AI & Machine Learning": "rgba(52, 211, 153, 0.6)",
  "Web Development":       "rgba(34, 211, 238, 0.6)",
  "Data & Analytics":      "rgba(45, 212, 191, 0.6)",
  "Tools & Technologies":  "rgba(139, 92, 246, 0.6)",
};

function SkillCategoryCard({ category, skills }: SkillCategoryCardProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const gradient = GRADIENTS[category] ?? "from-emerald-400 to-cyan-400";
  const glowColor = GLOW_COLORS[category] ?? "rgba(52, 211, 153, 0.6)";

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-emerald-800/40 bg-emerald-950/60 backdrop-blur-sm p-6 hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
    >
      <h3 className="font-mono text-sm font-bold text-emerald-400 mb-6">{category}</h3>
      <div className="space-y-4">
        {skills.map(({ name, percent }, idx) => (
          <div key={name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs text-zinc-300">{name}</span>
              <span className="font-mono text-xs font-bold text-zinc-400 tabular-nums">{percent}%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700 ease-out relative`}
                style={{
                  width: animated ? `${percent}%` : "0%",
                  transitionDelay: `${idx * 60}ms`,
                  boxShadow: animated ? `0 0 8px ${glowColor}, 0 0 16px ${glowColor.replace('0.6', '0.2')}` : 'none',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillCategoryCard;
