import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";

const CONTENT_DIR = path.join(process.cwd(), "content/certificados");

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const items = [];
    for (const file of files.filter(f => f.endsWith(".yaml"))) {
      const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf-8");
      const data = yaml.load(raw) as Record<string, unknown>;
      items.push({ slug: file.replace(".yaml", ""), ...data });
    }
    items.sort((a: any, b: any) => new Date(b.data).getTime() - new Date(a.data).getTime());
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const slug = data.titulo
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const { slug: _s, ...rest } = data;
  const content = yaml.dump(rest, { lineWidth: -1 });
  try {
    await fs.writeFile(path.join(CONTENT_DIR, `${slug}.yaml`), content, "utf-8");
    return NextResponse.json({ slug, success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
