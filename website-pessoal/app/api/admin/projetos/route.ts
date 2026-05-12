import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from "fs/promises";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content/projetos");

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const lines = match[1].split("\n");
  const meta: Record<string, unknown> = {};
  let currentKey = "";
  let currentArray: string[] | null = null;

  for (const line of lines) {
    const arrayItem = line.match(/^  - (.+)/);
    if (arrayItem && currentKey) {
      if (!currentArray) currentArray = [];
      currentArray.push(arrayItem[1]);
      meta[currentKey] = currentArray;
      continue;
    }
    if (currentArray) { currentArray = null; }
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      const val = kv[2].trim();
      if (val === "true") meta[currentKey] = true;
      else if (val === "false") meta[currentKey] = false;
      else if (val === "[]") meta[currentKey] = [];
      else if (val.startsWith(">-")) meta[currentKey] = "";
      else meta[currentKey] = val;
    } else if (currentKey && line.startsWith("  ") && typeof meta[currentKey] === "string" && meta[currentKey] === "") {
      meta[currentKey] = (meta[currentKey] as string) + (meta[currentKey] ? " " : "") + line.trim();
    }
  }
  return { meta, body: match[2].trim() };
}

function buildFrontmatter(meta: Record<string, unknown>, body: string): string {
  const lines: string[] = ["---"];
  for (const [key, val] of Object.entries(meta)) {
    if (Array.isArray(val)) {
      if (val.length === 0) { lines.push(`${key}: []`); continue; }
      lines.push(`${key}:`);
      for (const item of val) lines.push(`  - ${item}`);
    } else if (typeof val === "boolean") {
      lines.push(`${key}: ${val}`);
    } else if (typeof val === "string" && val.includes("\n")) {
      lines.push(`${key}: >-`);
      lines.push(`  ${val.replace(/\n/g, "\n  ")}`);
    } else {
      lines.push(`${key}: ${val}`);
    }
  }
  lines.push("---");
  if (body) lines.push(body);
  return lines.join("\n") + "\n";
}

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const files = await fs.readdir(CONTENT_DIR);
    const projetos = [];
    for (const file of files.filter(f => f.endsWith(".mdx"))) {
      const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf-8");
      const { meta, body } = parseFrontmatter(raw);
      projetos.push({ slug: file.replace(".mdx", ""), ...meta, body });
    }
    projetos.sort((a: any, b: any) => new Date(b.data).getTime() - new Date(a.data).getTime());
    return NextResponse.json(projetos);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const slug = data.nome
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { body, ...meta } = data;
  const content = buildFrontmatter(meta, body || "");
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  try {
    await fs.writeFile(filePath, content, "utf-8");
    return NextResponse.json({ slug, success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
