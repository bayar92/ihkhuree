"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import { checkCredentials } from "@/lib/credentials";
import { isStaff, requireMember } from "@/lib/dal";
import { routing, type Locale } from "@/i18n/routing";
import {
  failedFields,
  loginSchema,
  parseTopics,
  profileSchema,
  registerSchema,
  type MemberFormState,
} from "@/lib/member-schema";

function pickLocale(raw: FormDataEntryValue | null): Locale {
  return routing.locales.find((l) => l === raw) ?? routing.defaultLocale;
}

/** Text values from the form (never the password) to refill it after an error. */
function textValues(formData: FormData, keys: string[]) {
  const values: Record<string, string> = {};
  for (const key of keys) values[key] = String(formData.get(key) ?? "");
  return values;
}

const REGISTER_KEYS = [
  "name",
  "email",
  "organization",
  "position",
  "country",
  "membershipType",
  "note",
];

// ---------------- Registration ----------------
export async function registerMember(
  _prev: MemberFormState,
  formData: FormData,
): Promise<MemberFormState> {
  // Honeypot: real people never fill this hidden field. Pretend it worked so
  // bots get no signal.
  if (String(formData.get("website") ?? "") !== "") return { ok: true };

  const values = textValues(formData, REGISTER_KEYS);
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "invalid", fields: failedFields(parsed.error), values };
  }

  const { email, name, password, organization, position, country, note } =
    parsed.data;

  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 10),
        // Role and status are fixed server-side; the form can never set them.
        role: "member",
        status: "pending",
        profile: {
          create: {
            organization,
            position,
            country,
            membershipType: parsed.data.membershipType,
            applicationNote: note,
          },
        },
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "emailTaken", fields: ["email"], values };
    }
    console.error("[register] failed:", (error as Error).message);
    return { error: "server", values };
  }

  return { ok: true };
}

// ---------------- Login / logout ----------------
export async function loginMember(
  _prev: MemberFormState,
  formData: FormData,
): Promise<MemberFormState> {
  const locale = pickLocale(formData.get("locale"));
  const values = textValues(formData, ["email"]);

  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "credentials", values };

  const { email, password } = parsed.data;
  let check: Awaited<ReturnType<typeof checkCredentials>>;
  try {
    check = await checkCredentials(email, password);
  } catch (error) {
    // e.g. database unreachable: show a message instead of a crash page.
    console.error("[login] failed:", (error as Error).message);
    return { error: "server", values };
  }
  if (!check.ok) return { error: check.reason, values };

  // Staff sign in through /admin/login (it has its own session handling).
  if (isStaff(check.user)) return { error: "staff", values };

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: `/${locale}/account`,
    });
  } catch (error) {
    if (error instanceof AuthError) return { error: "credentials", values };
    throw error; // successful sign-in redirects by throwing
  }
  return {};
}

export async function logoutMember(formData: FormData) {
  const locale = pickLocale(formData.get("locale"));
  await signOut({ redirectTo: `/${locale}` });
}

// ---------------- Profile ----------------
export async function updateProfile(
  _prev: MemberFormState,
  formData: FormData,
): Promise<MemberFormState> {
  const locale = pickLocale(formData.get("locale"));
  const user = await requireMember(locale);

  const values = textValues(formData, [
    "organization",
    "position",
    "country",
    "phone",
    "about",
    "offers",
    "seeks",
  ]);
  const parsed = profileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "invalid", fields: failedFields(parsed.error), values };
  }

  const data = {
    ...parsed.data,
    offers: parseTopics(formData.get("offers")),
    seeks: parseTopics(formData.get("seeks")),
  };

  try {
    await prisma.memberProfile.upsert({
      where: { userId: user.id },
      update: data,
      create: { userId: user.id, ...data },
    });
  } catch (error) {
    console.error("[profile] failed:", (error as Error).message);
    return { error: "server", values };
  }
  return { ok: true, values };
}
