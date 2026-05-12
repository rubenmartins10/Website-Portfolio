"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ArticleData = { titulo: string; data: string; resumo: string; tags: string[]; publicado: boolean; body: string };

const EMPTY: ArticleData = { titulo: "", data: new Date().toISOString().slice(0, 10), resumo: "", tags: [], publicado: true, body: "" };

export default function ArticleForm({ initial, slug }: { initial?: ArticleData; slug?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<ArticleData>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [newTag, setNewTag] = useState("");
  const isEdit = !!slug;
  const set = (key: keyof ArticleData, val: unknown) => setForm(prev => ({ ...prev, [key]: val }));
  const inputCls = "w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-400/40 transition-colors";
  const labelCls = "block font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-1.5";

  const handleSave = async () => {
    setSaving(true);
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/admin/artigos/${slug}` : "/api/admin/artigos";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    setSaving(false);
    if (data.success || data.slug) { router.push("/admin/artigos"); router.refresh(); }
    else alert("Error: " + (data.error || "Unknown"));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">{isEdit ? "Edit Article" : "New Article"}</h1>
        <button onClick={() => router.back()} className="font-mono text-[11px] text-zinc-500 hover:text-white transition-colors">← Back</button>
      </div>
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-5">
        <div><label className={labelCls}>Title *</label><input className={inputCls} value={form.titulo} onChange={e => set("titulo", e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>Date</label><input type="date" className={inputCls} value={form.data} onChange={e => set("data", e.target.value)} /></div>
          <label className="flex items-center gap-3 cursor-pointer self-end pb-2">
            <div className={`w-5 h-5 rounded-md border ${form.publicado ? "bg-blue-400 border-blue-400" : "border-white/20 bg-white/[0.04]"} flex items-center justify-center transition-all`} onClick={() => set("publicado", !form.publicado)}>
              {form.publicado && <svg className="w-3 h-3 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
            </div>
            <span className="text-sm text-zinc-300">Published</span>
          </label>
        </div>
        <div><label className={labelCls}>Summary</label><textarea className={inputCls + " min-h-[60px] resize-y"} value={form.resumo} onChange={e => set("resumo", e.target.value)} /></div>
        <div>
          <label className={labelCls}>Tags</label>
          <div className="flex flex-wrap gap-1.5 mb-2">{form.tags.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1 text-xs text-zinc-300 bg-zinc-800/60 border border-zinc-700/40 px-2.5 py-1 rounded-full font-mono">{t}<button onClick={() => set("tags", form.tags.filter((_, j) => j !== i))} className="text-zinc-500 hover:text-red-400 ml-0.5">×</button></span>
          ))}</div>
          <div className="flex gap-2">
            <input className={inputCls + " flex-1"} value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Add tag..." onKeyDown={e => { if (e.key === "Enter" && newTag.trim()) { e.preventDefault(); set("tags", [...form.tags, newTag.trim()]); setNewTag(""); }}} />
            <button onClick={() => { if (newTag.trim()) { set("tags", [...form.tags, newTag.trim()]); setNewTag(""); }}} className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-xs text-zinc-400 hover:text-white transition-colors font-mono">ADD</button>
          </div>
        </div>
        <div><label className={labelCls}>Content (MDX)</label><textarea className={inputCls + " min-h-[200px] resize-y font-mono text-xs"} value={form.body} onChange={e => set("body", e.target.value)} /></div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <button onClick={() => router.back()} className="px-5 py-2.5 rounded-xl border border-white/[0.08] text-sm text-zinc-400 hover:text-white hover:border-white/20 transition-all">Cancel</button>
        <button onClick={handleSave} disabled={saving || !form.titulo.trim()} className="px-6 py-2.5 rounded-xl bg-blue-400 hover:bg-blue-300 text-zinc-950 text-sm font-bold transition-colors disabled:opacity-40">{saving ? "Saving..." : isEdit ? "Save" : "Create"}</button>
      </div>
    </div>
  );
}
