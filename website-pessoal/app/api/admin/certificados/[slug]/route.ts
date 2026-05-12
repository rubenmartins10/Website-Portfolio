import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";

const CONTENT_DIR = path.join(process.cwd(), "content/certificados");

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, context: RouteContext) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await context.params;
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, `${slug}.yaml`), "utf-8");
    const data = yaml.load(raw) as Record<string, unknown>;
    return NextResponse.json({ slug, ...data });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await context.params;
  const data = await req.json();
  const { slug: _s, ...rest } = data;
  const content = yaml.dump(rest, { lineWidth: -1 });
  try {
    await fs.writeFile(path.join(CONTENT_DIR, `${slug}.yaml`), content, "utf-8");
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
    await fs.unlink(path.join(CONTENT_DIR, `${slug}.yaml`));
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
