"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProjectForm from "../ProjectForm";

export default function EditProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/projetos/${slug}`).then(r => r.json()).then(d => {
      // Normalize arrays that might be strings
      if (typeof d.tecnologias === "string") d.tecnologias = d.tecnologias ? [d.tecnologias] : [];
      if (typeof d.conquistas === "string") d.conquistas = d.conquistas ? [d.conquistas] : [];
      if (typeof d.galeria === "string") d.galeria = d.galeria ? [d.galeria] : [];
      if (!Array.isArray(d.tecnologias)) d.tecnologias = [];
      if (!Array.isArray(d.conquistas)) d.conquistas = [];
      if (!Array.isArray(d.galeria)) d.galeria = [];
      setData(d);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-6 h-6 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
    </div>
  );

  if (!data) return <div className="text-center py-20 text-zinc-500">Project not found</div>;

  return <ProjectForm initial={data} slug={slug} />;
}
