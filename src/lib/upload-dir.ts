import { access } from "fs/promises";
import path from "path";

export type UploadCategory = "news" | "certificates" | "site";

const UPLOAD_CATEGORIES: Record<
  UploadCategory,
  { relativeDir: string; publicPrefix: string }
> = {
  news: {
    relativeDir: path.join("public", "uploads", "news"),
    publicPrefix: "/uploads/news",
  },
  certificates: {
    relativeDir: path.join("public", "certificates"),
    publicPrefix: "/certificates",
  },
  site: {
    relativeDir: path.join("public", "uploads", "site"),
    publicPrefix: "/uploads/site",
  },
};

/** Default public folder for news uploads (dev / no volume). */
export function getPublicNewsUploadDir(): string {
  return getPublicUploadDir("news");
}

/** Primary write dir: `UPLOAD_DIR` env or public folder. */
export function getNewsUploadDir(): string {
  return getUploadDir("news");
}

/** All dirs to check when serving an uploaded file. */
export function getNewsUploadSearchDirs(): string[] {
  return getUploadSearchDirs("news");
}

export function getUploadPublicPrefix(category: UploadCategory): string {
  return UPLOAD_CATEGORIES[category].publicPrefix;
}

export function getPublicUploadDir(category: UploadCategory): string {
  return path.join(process.cwd(), UPLOAD_CATEGORIES[category].relativeDir);
}

/** Primary write dir. News may use `UPLOAD_DIR` env; others use public folders. */
export function getUploadDir(category: UploadCategory): string {
  if (category === "news") {
    const configured = process.env.UPLOAD_DIR?.trim();
    if (configured) return configured;
  }
  return getPublicUploadDir(category);
}

/** All dirs to check when serving an uploaded file. */
export function getUploadSearchDirs(category: UploadCategory): string[] {
  const primary = getUploadDir(category);
  const publicDir = getPublicUploadDir(category);
  return primary === publicDir ? [primary] : [primary, publicDir];
}

export async function findNewsUploadPath(filename: string): Promise<string | null> {
  return findUploadPath("news", filename);
}

export async function findUploadPath(
  category: UploadCategory,
  filename: string,
): Promise<string | null> {
  for (const dir of getUploadSearchDirs(category)) {
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
