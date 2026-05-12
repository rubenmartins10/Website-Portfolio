"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProjectData = {
  slug?: string;
  nome: string;
  data: string;
  url: string;
  imagem: string;
  galeria: string[];
  tecnologias: string[];
  destaque: boolean;
  resumo: string;
  conquistas: string[];
  body: string;
};

const EMPTY: ProjectData = {
  nome: "", data: new Date().toISOString().slice(0, 10), url: "", imagem: "", galeria: [], tecnologias: [], destaque: false, resumo: "", conquistas: [], body: "",
};

export default function ProjectForm({ initial, slug }: { initial?: ProjectData; slug?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectData>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [newTech, setNewTech] = useState("");
  const [newAch, setNewAch] = useState("");

  const isEdit = !!slug;

  const set = (key: keyof ProjectData, val: unknown) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/admin/projetos/${slug}` : "/api/admin/projetos";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    setSaving(false);
    if (data.success || data.slug) {
      router.push("/admin/projetos");
      router.refresh();
    } else {
      alert("Error: " + (data.error || "Unknown error"));
    }
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400/40 transition-colors";
  const labelCls = "block font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-1.5";

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">{isEdit ? "Edit Project" : "New Project"}</h1>
        <button onClick={() => router.back()} className="font-mono text-[11px] text-zinc-500 hover:text-white transition-colors">← Back</button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-5">
        {/* Name */}
        <div>
          <label className={labelCls}>Project Name *</label>
          <input className={inputCls} value={form.nome} onChange={e => set("nome", e.target.value)} placeholder="My Awesome Project" />
        </div>

        {/* Date + URL row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Completion Date</label>
            <input type="date" className={inputCls} value={form.data} onChange={e => set("data", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>GitHub URL</label>
            <input className={inputCls} value={form.url} onChange={e => set("url", e.target.value)} placeholder="https://github.com/..." />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className={labelCls}>Cover Image Path</label>
          <input className={inputCls} value={form.imagem} onChange={e => set("imagem", e.target.value)} placeholder="/projetos/my-project/showcase.png" />
          <p className="text-[10px] text-zinc-600 mt-1 font-mono">Path relative to /public</p>
        </div>

        {/* Featured */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-5 h-5 rounded-md border ${form.destaque ? "bg-emerald-400 border-emerald-400" : "border-white/20 bg-white/[0.04]"} flex items-center justify-center transition-all`}
            onClick={() => set("destaque", !form.destaque)}>
            {form.destaque && <svg className="w-3 h-3 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
          </div>
          <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">Featured on homepage</span>
        </label>

        {/* Summary */}
        <div>
          <label className={labelCls}>Summary</label>
          <textarea className={inputCls + " min-h-[80px] resize-y"} value={form.resumo} onChange={e => set("resumo", e.target.value)} placeholder="Brief project description..." />
        </div>

        {/* Technologies */}
        <div>
          <label className={labelCls}>Technologies</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {form.tecnologias.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-xs text-zinc-300 bg-zinc-800/60 border border-zinc-700/40 px-2.5 py-1 rounded-full font-mono">
                {t}
                <button onClick={() => set("tecnologias", form.tecnologias.filter((_, j) => j !== i))} className="text-zinc-500 hover:text-red-400 ml-0.5">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input className={inputCls + " flex-1"} value={newTech} onChange={e => setNewTech(e.target.value)} placeholder="Add technology..."
              onKeyDown={e => { if (e.key === "Enter" && newTech.trim()) { e.preventDefault(); set("tecnologias", [...form.tecnologias, newTech.trim()]); setNewTech(""); }}} />
            <button onClick={() => { if (newTech.trim()) { set("tecnologias", [...form.tecnologias, newTech.trim()]); setNewTech(""); }}}
              className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-xs text-zinc-400 hover:text-white transition-colors font-mono">ADD</button>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <label className={labelCls}>Achievements</label>
          <div className="space-y-1.5 mb-2">
            {form.conquistas.map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-300 bg-zinc-800/40 px-3 py-2 rounded-lg">
                <span className="text-emerald-400">⚡</span>
                <span className="flex-1">{c}</span>
                <button onClick={() => set("conquistas", form.conquistas.filter((_, j) => j !== i))} className="text-zinc-500 hover:text-red-400">×</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input className={inputCls + " flex-1"} value={newAch} onChange={e => setNewAch(e.target.value)} placeholder="Add achievement..."
              onKeyDown={e => { if (e.key === "Enter" && newAch.trim()) { e.preventDefault(); set("conquistas", [...form.conquistas, newAch.trim()]); setNewAch(""); }}} />
            <button onClick={() => { if (newAch.trim()) { set("conquistas", [...form.conquistas, newAch.trim()]); setNewAch(""); }}}
              className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-xs text-zinc-400 hover:text-white transition-colors font-mono">ADD</button>
          </div>
        </div>

        {/* Body / Description */}
        <div>
          <label className={labelCls}>Detailed Description (MDX)</label>
          <textarea className={inputCls + " min-h-[160px] resize-y font-mono text-xs"} value={form.body} onChange={e => set("body", e.target.value)} placeholder="Write detailed project description in MDX format..." />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <button onClick={() => router.back()} className="px-5 py-2.5 rounded-xl border border-white/[0.08] text-sm text-zinc-400 hover:text-white hover:border-white/20 transition-all">Cancel</button>
        <button onClick={handleSave} disabled={saving || !form.nome.trim()} className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-sm font-bold transition-colors disabled:opacity-40">
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </div>
  );
}
