import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import {
  findUploadPath,
  isSafeUploadFilename,
  type UploadCategory,
} from "@/lib/upload-dir";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

const CATEGORIES: UploadCategory[] = ["news", "certificates", "site"];

/**
 * Serves runtime-uploaded images for every upload category. Files written to a
 * persistent volume (or the public folder in dev) are read from disk here, so
 * they work in production where files added after `next build` are not served
 * as static assets.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string; filename: string }> },
) {
  const { category, filename } = await params;

  if (!CATEGORIES.includes(category as UploadCategory)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (!isSafeUploadFilename(filename)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = await findUploadPath(category as UploadCategory, filename);
  if (!filePath) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const data = await readFile(filePath);
    const ext = path.extname(filename).toLowerCase();
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": MIME[ext] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
