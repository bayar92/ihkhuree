import { locales, type Locale } from "@/i18n/routing";

/** Parse a localized JSON DB value into form state. */
export function localizedFromJson(value: unknown): Record<Locale, string> {
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    return locales.reduce(
      (acc, l) => ({ ...acc, [l]: String(o[l] ?? "").trim() }),
      {} as Record<Locale, string>,
    );
  }
  return locales.reduce(
    (acc, l) => ({ ...acc, [l]: "" }),
    {} as Record<Locale, string>,
  );
}

/** Build a localized JSON object from FormData fields named `${name}.${locale}`. */
export function parseLocalized(
  formData: FormData,
  name: string,
): Record<Locale, string> {
  return locales.reduce(
    (acc, l) => {
      acc[l] = String(formData.get(`${name}.${l}`) ?? "").trim();
      return acc;
    },
    {} as Record<Locale, string>,
  );
}

/** Parse an array of localized blocks from FormData (heading + text pairs). */
export function parseBlocks(formData: FormData): Array<{
  heading: Record<Locale, string>;
  text: Record<Locale, string>;
}> {
  const count = Number(formData.get("blockCount") ?? 0);
  const blocks = [];
  for (let i = 0; i < count; i++) {
    const heading = locales.reduce(
      (acc, l) => {
        acc[l] = String(formData.get(`block.${i}.heading.${l}`) ?? "").trim();
        return acc;
      },
      {} as Record<Locale, string>,
    );
    const text = locales.reduce(
      (acc, l) => {
        acc[l] = String(formData.get(`block.${i}.text.${l}`) ?? "").trim();
        return acc;
      },
      {} as Record<Locale, string>,
    );
    // skip fully empty blocks
    if (
      Object.values(heading).some(Boolean) ||
      Object.values(text).some(Boolean)
    ) {
      blocks.push({ heading, text });
    }
  }
  return blocks;
}
