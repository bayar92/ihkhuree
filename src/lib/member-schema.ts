import { z } from "zod";

export const MEMBERSHIP_TYPES = [
  "corporate",
  "premium",
  "associate",
  "student",
] as const;
export type MembershipType = (typeof MEMBERSHIP_TYPES)[number];

export type MemberError =
  | "invalid"
  | "emailTaken"
  | "credentials"
  | "pending"
  | "rejected"
  | "staff"
  | "server";

/** State returned by member form actions (used with useActionState). */
export type MemberFormState = {
  ok?: boolean;
  error?: MemberError;
  /** Field names that failed validation, so the form can highlight them. */
  fields?: string[];
  /** Submitted values (never the password) so the form can be refilled. */
  values?: Record<string, string>;
};

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => (v === "" ? undefined : v))
    .optional();

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(200),
  // bcrypt only uses the first 72 bytes, so cap there.
  password: z.string().min(8).max(72),
  organization: z.string().trim().min(1).max(200),
  position: optionalText(100),
  country: optionalText(100),
  membershipType: z.enum(MEMBERSHIP_TYPES).default("associate"),
  note: optionalText(1000),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export const profileSchema = z.object({
  organization: z.string().trim().min(1).max(200),
  position: optionalText(100),
  country: optionalText(100),
  phone: optionalText(40),
  about: optionalText(2000),
});

/** "a, b\nc" -> ["a","b","c"] (trimmed, de-duplicated, capped). */
export function parseTopics(raw: unknown, maxItems = 10): string[] {
  if (typeof raw !== "string") return [];
  const seen = new Set<string>();
  for (const part of raw.split(/[,\n]/)) {
    const topic = part.trim().slice(0, 40);
    if (topic) seen.add(topic);
    if (seen.size >= maxItems) break;
  }
  return [...seen];
}

/** Names of the fields zod rejected. */
export function failedFields(error: z.ZodError): string[] {
  return [...new Set(error.issues.map((i) => String(i.path[0] ?? "")))].filter(
    Boolean,
  );
}
