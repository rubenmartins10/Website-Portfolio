"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CertForm from "../CertForm";

export default function EditCertPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/certificados/${slug}`).then(r => r.json()).then(d => {
      if (typeof d.skills === "string") d.skills = d.skills ? [d.skills] : [];
      if (!Array.isArray(d.skills)) d.skills = [];
      setData(d);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="flex items-center justify-center py-32"><div className="w-6 h-6 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" /></div>;
  if (!data) return <div className="text-center py-20 text-zinc-500">Certification not found</div>;
  return <CertForm initial={data} slug={slug} />;
}
