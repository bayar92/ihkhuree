import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Compared against when the email is unknown so the response time does not
// reveal whether an account exists.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

export type CredentialResult =
  | { ok: true; user: NonNullable<Awaited<ReturnType<typeof findUser>>> }
  | { ok: false; reason: "credentials" | "pending" | "rejected" };

function findUser(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

/**
 * Single source of truth for "can this email + password sign in?".
 * `pending` / `rejected` are only reported after the password matched, so they
 * cannot be used to probe which emails are registered.
 */
export async function checkCredentials(
  rawEmail: string,
  password: string,
): Promise<CredentialResult> {
  const user = await findUser(normalizeEmail(rawEmail));
  const matches = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);
  if (!user || !matches) return { ok: false, reason: "credentials" };
  if (user.status === "pending") return { ok: false, reason: "pending" };
  if (user.status !== "approved") return { ok: false, reason: "rejected" };
  return { ok: true, user };
}
