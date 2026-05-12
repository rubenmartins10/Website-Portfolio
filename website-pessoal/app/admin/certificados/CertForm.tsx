"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { label: "Software Engineering", value: "software-engineering" },
  { label: "Web Development (Frontend)", value: "frontend" },
  { label: "Web Development (Backend)", value: "backend" },
  { label: "Mobile Development", value: "mobile" },
  { label: "Cloud Computing & DevOps", value: "cloud-devops" },
  { label: "Data Science & AI", value: "data-ai" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Computer Networks", value: "networks" },
  { label: "Database Management", value: "database" },
];

type CertData = {
  titulo: string;
  emissor: string;
  data: string;
  aprendizado: string;
  skills: string[];
  link: string;
  categoria: string;
  imagem: string;
  ficheiro: string;
};

const EMPTY: CertData = {
  titulo: "", emissor: "", data: new Date().toISOString().slice(0, 10),
  aprendizado: "", skills: [], link: "", categoria: "software-engineering",
  imagem: "", ficheiro: "",
};

export default function CertForm({ initial, slug }: { initial?: CertData; slug?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<CertData>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const isEdit = !!slug;

  const set = (key: keyof CertData, val: unknown) => setForm(prev => ({ ...prev, [key]: val }));

  const inputCls = "w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-400/40 transition-colors";
  const labelCls = "block font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-1.5";

  const handleSave = async () => {
    setSaving(true);
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/admin/certificados/${slug}` : "/api/admin/certificados";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    setSaving(false);
    if (data.success || data.slug) { router.push("/admin/certificados"); router.refresh(); }
    else alert("Error: " + (data.error || "Unknown"));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">{isEdit ? "Edit Certification" : "New Certification"}</h1>
        <button onClick={() => router.back()} className="font-mono text-[11px] text-zinc-500 hover:text-white transition-colors">← Back</button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-5">
        <div>
          <label className={labelCls}>Certificate Name *</label>
          <input className={inputCls} value={form.titulo} onChange={e => set("titulo", e.target.value)} placeholder="AWS Cloud Practitioner" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Issuing Organization</label>
            <input className={inputCls} value={form.emissor} onChange={e => set("emissor", e.target.value)} placeholder="Amazon Web Services" />
          </div>
          <div>
            <label className={labelCls}>Issue Date</label>
            <input type="date" className={inputCls} value={form.data} onChange={e => set("data", e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Category</label>
          <select className={inputCls + " cursor-pointer"} value={form.categoria} onChange={e => set("categoria", e.target.value)}>
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Image Path</label>
            <input className={inputCls} value={form.imagem} onChange={e => set("imagem", e.target.value)} placeholder="/certificados/logo.png" />
          </div>
          <div>
            <label className={labelCls}>Verification Link</label>
            <input className={inputCls} value={form.link} onChange={e => set("link", e.target.value)} placeholder="https://verify.example.com/..." />
          </div>
        </div>

        <div>
          <label className={labelCls}>Certificate File Path (PDF)</label>
          <input className={inputCls} value={form.ficheiro} onChange={e => set("ficheiro", e.target.value)} placeholder="/certificados/cert.pdf" />
        </div>

        <div>
          <label className={labelCls}>What I Learned</label>
          <textarea className={inputCls + " min-h-[80px] resize-y"} value={form.aprendizado} onChange={e => set("aprendizado", e.target.value)} placeholder="Key learnings from this certification..." />
        </div>

        <div>
          <label className={labelCls}>Skills Acquired</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {form.skills.map((s, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-xs text-zinc-300 bg-purple-500/10 border border-purple-400/20 px-2.5 py-1 rounded-full font-mono">
                {s}
                <button onClick={() => set("skills", form.skills.filter((_, j) => j !== i))} className="text-zinc-500 hover:text-red-400 ml-0.5">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input className={inputCls + " flex-1"} value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Add skill..."
              onKeyDown={e => { if (e.key === "Enter" && newSkill.trim()) { e.preventDefault(); set("skills", [...form.skills, newSkill.trim()]); setNewSkill(""); }}} />
            <button onClick={() => { if (newSkill.trim()) { set("skills", [...form.skills, newSkill.trim()]); setNewSkill(""); }}}
              className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-xs text-zinc-400 hover:text-white transition-colors font-mono">ADD</button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button onClick={() => router.back()} className="px-5 py-2.5 rounded-xl border border-white/[0.08] text-sm text-zinc-400 hover:text-white hover:border-white/20 transition-all">Cancel</button>
        <button onClick={handleSave} disabled={saving || !form.titulo.trim()} className="px-6 py-2.5 rounded-xl bg-purple-400 hover:bg-purple-300 text-zinc-950 text-sm font-bold transition-colors disabled:opacity-40">
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Certification"}
        </button>
      </div>
    </div>
  );
}
