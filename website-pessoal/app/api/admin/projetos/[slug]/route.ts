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
    if (currentArray) currentArray = null;
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

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, context: RouteContext) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await context.params;
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
    const { meta, body } = parseFrontmatter(raw);
    return NextResponse.json({ slug, ...meta, body });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await context.params;
  const data = await req.json();
  const { body, slug: _s, ...meta } = data;
  const content = buildFrontmatter(meta, body || "");
  try {
    await fs.writeFile(path.join(CONTENT_DIR, `${slug}.mdx`), content, "utf-8");
    return NextResponse.json({ slug, success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await context.params;
  try {
    await fs.unlink(path.join(CONTENT_DIR, `${slug}.mdx`));
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
