"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ArticleForm from "../ArticleForm";

export default function EditArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/artigos/${slug}`).then(r => r.json()).then(d => {
      if (typeof d.tags === "string") d.tags = d.tags ? [d.tags] : [];
      if (!Array.isArray(d.tags)) d.tags = [];
      setData(d);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="flex items-center justify-center py-32"><div className="w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" /></div>;
  if (!data) return <div className="text-center py-20 text-zinc-500">Article not found</div>;
  return <ArticleForm initial={data} slug={slug} />;
}
