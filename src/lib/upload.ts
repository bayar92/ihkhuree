import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const MAX_BYTES = 5 * 1024 * 1024;

export async function saveNewsUpload(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Зөвхөн JPG, PNG, WebP, GIF зураг оруулна.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Зураг 5MB-аас их байж болохгүй.");
  }

  const ext =
    EXT_BY_TYPE[file.type] ??
    path.extname(file.name).toLowerCase().slice(0, 5) ??
    ".jpg";
  const name = `${Date.now()}-${randomBytes(4).toString("hex")}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "news");
  await mkdir(dir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, name), buffer);

  return `/uploads/news/${name}`;
}
