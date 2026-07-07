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
    relativeDir: path.join("public", "uploads", "certificates"),
    publicPrefix: "/uploads/certificates",
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

/**
 * Primary write dir. When `UPLOAD_DIR` (a persistent volume) is configured it is
 * used for every category so runtime uploads survive redeploys and are served by
 * the /uploads/[category] route handler. News keeps writing to the volume root
 * (backwards compatible); other categories get a per-category subfolder.
 */
export function getUploadDir(category: UploadCategory): string {
  const configured = process.env.UPLOAD_DIR?.trim();
  if (configured) {
    return category === "news" ? configured : path.join(configured, category);
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
