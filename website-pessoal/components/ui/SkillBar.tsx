"use client";

import { useEffect, useRef, useState } from "react";

type SkillEntry = { name: string; percent: number };

type SkillCategoryCardProps = {
  category: string;
  skills: SkillEntry[];
};

function SkillCategoryCard({ category, skills }: SkillCategoryCardProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-2xl border border-white/5 bg-white/2 p-6 hover:border-emerald-400/20 transition-colors">
      <h3 className="font-mono text-sm text-emerald-400 font-bold mb-6">{category}</h3>
      <div className="space-y-4">
        {skills.map(({ name, percent }) => (
          <div key={name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs text-zinc-300">{name}</span>
              <span className="font-mono text-xs text-zinc-500 tabular-nums">{percent}%</span>
            </div>
            <div className="h-0.5 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: animated ? `${percent}%` : "0%",
                  transitionDelay: "100ms",
                  background: "linear-gradient(90deg, #34d399, #6ee7b7)",
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
