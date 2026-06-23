/** Decode URL slug params and normalize Unicode for stable DB lookups. */
export function normalizeSlugParam(raw: string): string {
  try {
    return decodeURIComponent(raw).normalize("NFC");
  } catch {
    return raw.normalize("NFC");
  }
}

const SLUG_MAX_WORDS = 3;

/** Build URL-safe ASCII slugs (no Cyrillic or other non-ASCII characters). */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** First few words from a title, ASCII-only. */
export function slugBaseFromTitle(
  title: { en?: string; mn?: string; ja?: string },
  fallback: string,
  maxWords = SLUG_MAX_WORDS,
): string {
  const raw = title.en?.trim() || title.mn?.trim() || title.ja?.trim() || "";
  const slug = slugify(raw);
  if (!slug) return fallback;

  const words = slug.split("-").filter(Boolean).slice(0, maxWords);
  return words.length > 0 ? words.join("-") : fallback;
}

function slugSuffix(): string {
  return Date.now().toString(36).slice(-5);
}

export function buildAutoSlug(
  title: { en?: string; mn?: string; ja?: string },
  fallback: string,
): string {
  return `${slugBaseFromTitle(title, fallback)}-${slugSuffix()}`;
}

/** Keep an existing slug on edit; generate a new one on create. */
export function resolveSlugForSave(
  title: { en?: string; mn?: string; ja?: string },
  fallback: string,
  existingSlug?: string | null,
): string {
  if (existingSlug) return existingSlug;
  return buildAutoSlug(title, fallback);
}

/** Client-side preview (suffix must stay stable until save). */
export function previewAutoSlug(
  title: { en?: string; mn?: string; ja?: string },
  fallback: string,
  suffix: string,
): string {
  return `${slugBaseFromTitle(title, fallback)}-${suffix}`;
}
