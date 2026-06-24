import { access } from "fs/promises";
import path from "path";

const PUBLIC_NEWS_DIR = path.join("public", "uploads", "news");

/** Default public folder for news uploads (dev / no volume). */
export function getPublicNewsUploadDir(): string {
  return path.join(process.cwd(), PUBLIC_NEWS_DIR);
}

/** Primary write dir: `UPLOAD_DIR` env or public folder. */
export function getNewsUploadDir(): string {
  const configured = process.env.UPLOAD_DIR?.trim();
  if (configured) return configured;
  return getPublicNewsUploadDir();
}

/** All dirs to check when serving an uploaded file. */
export function getNewsUploadSearchDirs(): string[] {
  const primary = getNewsUploadDir();
  const publicDir = getPublicNewsUploadDir();
  return primary === publicDir ? [primary] : [primary, publicDir];
}

export async function findNewsUploadPath(filename: string): Promise<string | null> {
  for (const dir of getNewsUploadSearchDirs()) {
    const filePath = path.join(dir, filename);
    try {
      await access(filePath);
      return filePath;
    } catch {
      // try next location
    }
  }
  return null;
}

const SAFE_FILENAME = /^[\w.-]+\.(jpg|jpeg|png|webp|gif)$/i;

export function isSafeUploadFilename(name: string): boolean {
  return SAFE_FILENAME.test(name) && !name.includes("..");
}

export const NEWS_UPLOAD_PUBLIC_PREFIX = "/uploads/news";
