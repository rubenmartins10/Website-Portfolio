"use client";

import { useEffect, useRef, useState } from "react";

type SkillBarProps = {
  label: string;
  percent: number;
  skills: string[];
};

export default function SkillBar({ label, percent, skills }: SkillBarProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-2xl border border-white/5 bg-white/2 p-6 hover:border-emerald-400/20 transition-colors">
      {/* Label + percentage */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs text-white uppercase tracking-widest">{label}</span>
        <span className="font-mono text-xs text-emerald-400 tabular-nums">{percent}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-white/8 rounded-full overflow-hidden mb-5">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animated ? `${percent}%` : "0%",
            background: "linear-gradient(90deg, #34d399, #6ee7b7)",
          }}
        />
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="font-mono text-[10px] text-zinc-500 border border-zinc-700/60 px-2 py-0.5 rounded tracking-wide"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
