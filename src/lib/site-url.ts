/** Canonical public site origin (no trailing slash). */
export function getSiteUrl(): string {
  const configured =
    process.env.SITE_URL?.trim() ?? process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://ihkhuree.com";
}
