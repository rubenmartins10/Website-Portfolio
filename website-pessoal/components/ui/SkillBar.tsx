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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-10">
      <h3 className="font-mono text-sm text-emerald-400 tracking-[0.25em] uppercase mb-5 pb-2 border-b border-white/6">
        {category}
      </h3>
      <div className="space-y-4">
        {skills.map(({ name, percent }, idx) => (
          <div key={name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs text-zinc-300">{name}</span>
              <span className="font-mono text-xs text-zinc-500 tabular-nums">{percent}%</span>
            </div>
            <div className="h-px bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: animated ? `${percent}%` : "0%",
                  transitionDelay: `${idx * 70}ms`,
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

