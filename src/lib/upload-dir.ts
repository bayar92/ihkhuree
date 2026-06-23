import path from "path";

/** Persistent directory for uploaded news images (use a mounted volume in production). */
export function getNewsUploadDir(): string {
  const configured = process.env.UPLOAD_DIR?.trim();
  if (configured) return configured;
  return path.join(process.cwd(), "public", "uploads", "news");
}

const SAFE_FILENAME = /^[\w.-]+\.(jpg|jpeg|png|webp|gif)$/i;

export function isSafeUploadFilename(name: string): boolean {
  return SAFE_FILENAME.test(name) && !name.includes("..");
}

export const NEWS_UPLOAD_PUBLIC_PREFIX = "/uploads/news";
