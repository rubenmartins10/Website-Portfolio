import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const dir = (formData.get("directory") as string) || "projetos";

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const targetDir = path.join(process.cwd(), "public", dir);
  await fs.mkdir(targetDir, { recursive: true });

  const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = path.join(targetDir, filename);
  await fs.writeFile(filePath, buffer);

  return NextResponse.json({
    success: true,
    path: `/${dir}/${filename}`,
  });
}
