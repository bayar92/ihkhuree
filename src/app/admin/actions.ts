"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { auth, signIn, signOut } from "@/lib/auth";
import { parseLocalized, parseBlocks } from "@/lib/form";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9Ѐ-ӿ]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ---------------- Auth ----------------
export async function authenticate(
  _prev: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Имэйл эсвэл нууц үг буруу байна.";
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}

// ---------------- Hero ----------------
export async function saveHero(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = {
    title: parseLocalized(formData, "title"),
    subtitle: parseLocalized(formData, "subtitle"),
    tagline: parseLocalized(formData, "tagline"),
    ctaLabel: parseLocalized(formData, "ctaLabel"),
    ctaHref: String(formData.get("ctaHref") ?? "/about"),
    image: String(formData.get("image") ?? "") || null,
  };
  if (id) {
    await prisma.hero.update({ where: { id }, data });
  } else {
    await prisma.hero.create({ data });
  }
  revalidatePath("/", "layout");
  redirect("/admin/hero?saved=1");
}

// ---------------- Features ----------------
export async function saveFeature(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = {
    icon: String(formData.get("icon") ?? "globe"),
    href: String(formData.get("href") ?? "") || null,
    order: Number(formData.get("order") ?? 0),
    title: parseLocalized(formData, "title"),
    body: parseLocalized(formData, "body"),
  };
  if (id) {
    await prisma.feature.update({ where: { id }, data });
  } else {
    await prisma.feature.create({ data });
  }
  revalidatePath("/", "layout");
  redirect("/admin/features");
}

export async function deleteFeature(formData: FormData) {
  await requireAdmin();
  await prisma.feature.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/", "layout");
  redirect("/admin/features");
}

// ---------------- Focus areas ----------------
export async function saveFocusArea(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = {
    icon: String(formData.get("icon") ?? "trade"),
    order: Number(formData.get("order") ?? 0),
    label: parseLocalized(formData, "label"),
  };
  if (id) {
    await prisma.focusArea.update({ where: { id }, data });
  } else {
    await prisma.focusArea.create({ data });
  }
  revalidatePath("/", "layout");
  redirect("/admin/focus-areas");
}

export async function deleteFocusArea(formData: FormData) {
  await requireAdmin();
  await prisma.focusArea.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/", "layout");
  redirect("/admin/focus-areas");
}

// ---------------- News ----------------
export async function saveNews(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = parseLocalized(formData, "title");
  let slug = String(formData.get("slug") ?? "").trim();
  if (!slug) slug = slugify(title.en || title.mn || "news") + "-" + Date.now().toString(36);
  const publishedAtRaw = String(formData.get("publishedAt") ?? "");
  const images = formData
    .getAll("images")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const data = {
    slug,
    title,
    excerpt: parseLocalized(formData, "excerpt"),
    content: parseLocalized(formData, "content"),
    coverImage: String(formData.get("coverImage") ?? "") || null,
    images,
    published: formData.get("published") === "on",
    publishedAt: publishedAtRaw ? new Date(publishedAtRaw) : new Date(),
  };
  if (id) {
    await prisma.news.update({ where: { id }, data });
  } else {
    await prisma.news.create({ data });
  }
  revalidatePath("/", "layout");
  redirect("/admin/news");
}

export async function deleteNews(formData: FormData) {
  await requireAdmin();
  await prisma.news.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/", "layout");
  redirect("/admin/news");
}

// ---------------- Events ----------------
export async function saveEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = parseLocalized(formData, "title");
  let slug = String(formData.get("slug") ?? "").trim();
  if (!slug) slug = slugify(title.en || title.mn || "event") + "-" + Date.now().toString(36);
  const startsAt = String(formData.get("startsAt") ?? "");
  const endsAt = String(formData.get("endsAt") ?? "");
  const data = {
    slug,
    title,
    description: parseLocalized(formData, "description"),
    location: parseLocalized(formData, "location"),
    image: String(formData.get("image") ?? "") || null,
    link: String(formData.get("link") ?? "") || null,
    published: formData.get("published") === "on",
    startsAt: startsAt ? new Date(startsAt) : new Date(),
    endsAt: endsAt ? new Date(endsAt) : null,
  };
  if (id) {
    await prisma.event.update({ where: { id }, data });
  } else {
    await prisma.event.create({ data });
  }
  revalidatePath("/", "layout");
  redirect("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  await prisma.event.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/", "layout");
  redirect("/admin/events");
}

// ---------------- Pages ----------------
export async function savePage(formData: FormData) {
  await requireAdmin();
  const key = String(formData.get("key"));
  const data = {
    title: parseLocalized(formData, "title"),
    intro: parseLocalized(formData, "intro"),
    body: parseBlocks(formData),
  };
  await prisma.page.upsert({
    where: { key },
    update: data,
    create: { key, ...data },
  });
  revalidatePath("/", "layout");
  redirect(`/admin/pages/${key}?saved=1`);
}

// ---------------- Structured site content ----------------
const contentRedirects: Record<string, string> = {
  about: "/admin/about",
  membership: "/admin/membership",
  home: "/admin/home",
  ui: "/admin/translations",
};

export async function saveContent(formData: FormData) {
  await requireAdmin();
  const key = String(formData.get("key") ?? "");
  if (!key) throw new Error("Missing content key");
  const raw = String(formData.get("data") ?? "{}");
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new Error("Invalid content payload");
  }
  await prisma.siteContent.upsert({
    where: { key },
    update: { value: value as object },
    create: { key, value: value as object },
  });
  revalidatePath("/", "layout");
  redirect(`${contentRedirects[key] ?? "/admin"}?saved=1`);
}

// ---------------- Settings (contact) ----------------
export async function saveContactSettings(formData: FormData) {
  await requireAdmin();
  const value = {
    address: parseLocalized(formData, "address"),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    social: {
      facebook: String(formData.get("facebook") ?? ""),
      linkedin: String(formData.get("linkedin") ?? ""),
      instagram: String(formData.get("instagram") ?? ""),
      youtube: String(formData.get("youtube") ?? ""),
    },
  };
  await prisma.setting.upsert({
    where: { key: "contact" },
    update: { value },
    create: { key: "contact", value },
  });
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}

// ---------------- Inquiries ----------------
export async function toggleInquiry(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (inquiry) {
    await prisma.inquiry.update({
      where: { id },
      data: { handled: !inquiry.handled },
    });
  }
  redirect("/admin/inquiries");
}

export async function deleteInquiry(formData: FormData) {
  await requireAdmin();
  await prisma.inquiry.delete({ where: { id: String(formData.get("id")) } });
  redirect("/admin/inquiries");
}
