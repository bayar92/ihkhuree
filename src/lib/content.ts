import { prisma, safe } from "@/lib/prisma";

type Json = Record<string, unknown>;

function isPlainObject(v: unknown): v is Json {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Deep-merge `override` onto `base`. Plain objects are merged key by key;
 * arrays and primitives from `override` replace those in `base`. Missing keys
 * fall back to `base`, so partial DB content never breaks a page.
 */
export function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (isPlainObject(base) && isPlainObject(override)) {
    const out: Json = { ...base };
    for (const key of Object.keys(override)) {
      out[key] = deepMerge((base as Json)[key], override[key]);
    }
    return out as T;
  }
  // arrays + primitives: override wins
  return override as T;
}

/**
 * Load a structured content document by key from the database and deep-merge it
 * over the provided defaults. Returns the defaults untouched if the row is
 * missing or the DB is unreachable.
 */
export async function getContent<T>(key: string, defaults: T): Promise<T> {
  const row = await safe(
    prisma.siteContent.findUnique({ where: { key } }),
    null,
  );
  if (!row) return defaults;
  return deepMerge(defaults, row.value as unknown);
}
