import { locales, type Locale } from "@/i18n/routing";

export type LocalizedText = Partial<Record<Locale, string>>;

/**
 * Pick the best available string from a localized JSON value.
 * Falls back: requested locale → mn → en → first non-empty → "".
 */
export function pick(
  value: unknown,
  locale: Locale,
): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value !== "object") return String(value);

  const obj = value as Record<string, unknown>;
  const order: string[] = [locale, "mn", "en", "ja", ...locales];
  for (const key of order) {
    const v = obj[key];
    if (typeof v === "string" && v.trim() !== "") return v;
  }
  // last resort: first non-empty string anywhere
  for (const v of Object.values(obj)) {
    if (typeof v === "string" && v.trim() !== "") return v;
  }
  return "";
}

/** Build an empty localized object for forms. */
export function emptyLocalized(): Record<Locale, string> {
  return locales.reduce(
    (acc, l) => ({ ...acc, [l]: "" }),
    {} as Record<Locale, string>,
  );
}
