import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";
import {
  getUploadPublicPrefix,
  getUploadSearchDirs,
  type UploadCategory,
} from "@/lib/upload-dir";

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

export async function saveImageUpload(
  file: File,
  category: UploadCategory,
): Promise<string> {
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
  const buffer = Buffer.from(await file.arrayBuffer());

  for (const dir of getUploadSearchDirs(category)) {
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), buffer);
  }

  return `${getUploadPublicPrefix(category)}/${name}`;
}

export async function saveNewsUpload(file: File): Promise<string> {
  return saveImageUpload(file, "news");
}
