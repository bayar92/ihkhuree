import { z } from "zod";

export const REQUEST_KINDS = ["member", "expert", "partner", "learning"] as const;
export type RequestKind = (typeof REQUEST_KINDS)[number];

/** A member may have at most this many requests being worked on at once. */
export const MAX_OPEN_REQUESTS = 5;

export type ConnectionError = "invalid" | "limit" | "server";

/** State returned by the member's "new request" form (useActionState). */
export type ConnectionFormState = {
  ok?: boolean;
  error?: ConnectionError;
  fields?: string[];
  values?: Record<string, string>;
};

export const createRequestSchema = z.object({
  kind: z.enum(REQUEST_KINDS),
  topic: z.string().trim().min(3).max(120),
  details: z.string().trim().min(10).max(2000),
});

export type Answer = "pending" | "accepted" | "declined";
export type MatchStatus = "proposed" | "connected" | "declined" | "withdrawn";

/**
 * A match is "connected" only when BOTH sides accepted; one decline ends it.
 * (Withdrawn is set by staff/requester directly and never derived.)
 */
export function deriveMatchStatus(
  requester: Answer,
  target: Answer,
): Exclude<MatchStatus, "withdrawn"> {
  if (requester === "declined" || target === "declined") return "declined";
  if (requester === "accepted" && target === "accepted") return "connected";
  return "proposed";
}

/**
 * Request status follows its matches. "closed" is sticky (only staff reopen it).
 * With no live match it stays where it is (submitted / in_review); if matches
 * existed but all ended, it goes back to in_review so staff propose another.
 */
export function deriveRequestStatus(
  current: string,
  matches: { status: string }[],
): string {
  if (current === "closed") return "closed";
  if (matches.some((m) => m.status === "connected")) return "connected";
  if (matches.some((m) => m.status === "proposed")) return "proposed";
  if (matches.length > 0) return "in_review";
  return current === "submitted" ? "submitted" : "in_review";
}

export const directoryEntrySchema = z.object({
  kind: z.enum(["expert", "organization"]),
  name: z.string().trim().min(2).max(150),
  organization: z.string().trim().max(200).optional(),
  title: z.string().trim().max(150).optional(),
  contactEmail: z.string().trim().email().max(200).optional().or(z.literal("")),
  contactPhone: z.string().trim().max(50).optional(),
  notes: z.string().trim().max(2000).optional(),
});
