import { cache } from "react";
import { redirect as nextRedirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";

/**
 * Data Access Layer — the single place that decides who the current user is and
 * what they may do. It re-reads role/status from the database on every request
 * (cached per request) instead of trusting the JWT, so a member who is rejected
 * or demoted loses access immediately even if their cookie is still valid.
 */
export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "staff" | "member";
  status: "pending" | "approved" | "rejected";
};

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await auth();
  const sessionUser = session?.user as
    | { id?: string; email?: string | null }
    | undefined;
  if (!sessionUser) return null;

  const select = {
    id: true,
    email: true,
    name: true,
    role: true,
    status: true,
  } as const;

  // Sessions issued before ids were added to the token fall back to the email.
  const user = sessionUser.id
    ? await prisma.user.findUnique({ where: { id: sessionUser.id }, select })
    : sessionUser.email
      ? await prisma.user.findUnique({
          where: { email: sessionUser.email },
          select,
        })
      : null;

  if (!user || user.status !== "approved") return null;
  return user as CurrentUser;
});

// `role` is a plain string column, so accept any string here.
export function isStaff(user: { role: string }): boolean {
  return user.role === "admin" || user.role === "staff";
}

/** Admin panel + admin server actions. Sends everyone else to the admin login. */
export async function requireStaff(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) nextRedirect("/admin/login");
  return user;
}

/** Member-only pages/actions. Sends everyone else to the localized login. */
export async function requireMember(locale: string): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user || user.role !== "member") {
    return redirect({ href: "/login", locale });
  }
  return user;
}
