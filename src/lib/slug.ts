/** Decode URL slug params and normalize Unicode for stable DB lookups. */
export function normalizeSlugParam(raw: string): string {
  try {
    return decodeURIComponent(raw).normalize("NFC");
  } catch {
    return raw.normalize("NFC");
  }
}

const SLUG_MAX_WORDS = 3;

/** Mongolian / Russian Cyrillic → Latin (URL-friendly). */
const CYRILLIC_ROMAN: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "j",
  з: "z",
  и: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sh",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  ө: "o",
  ү: "u",
};

function transliterateChar(char: string): string {
  const lower = char.toLowerCase();
  return CYRILLIC_ROMAN[lower] ?? char;
}

/** Romanize Cyrillic; leave existing Latin/numbers as-is. */
export function transliterateWord(word: string): string {
  let out = "";
  for (const char of word.normalize("NFC")) {
    out += transliterateChar(char);
  }
  return out;
}

/** Build URL-safe ASCII slug from a single word. */
export function slugifyWord(input: string): string {
  return transliterateWord(input)
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** @deprecated Use slugifyWord per word instead. */
export function slugify(input: string): string {
  return slugifyWord(input);
}

function pickTitleText(title: {
  en?: string;
  mn?: string;
  ja?: string;
}): string {
  return title.mn?.trim() || title.en?.trim() || title.ja?.trim() || "";
}

function splitTitleWords(text: string): string[] {
  return text.split(/[\s\u00a0]+/).filter(Boolean);
}

/** First 2–3 words from title, romanized to ASCII. */
export function slugBaseFromTitle(
  title: { en?: string; mn?: string; ja?: string },
  fallback: string,
  maxWords = SLUG_MAX_WORDS,
): string {
  const raw = pickTitleText(title);
  if (!raw) return fallback;

  const slugWords = splitTitleWords(raw)
    .slice(0, maxWords)
    .map(slugifyWord)
    .filter(Boolean);

  return slugWords.length > 0 ? slugWords.join("-") : fallback;
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
