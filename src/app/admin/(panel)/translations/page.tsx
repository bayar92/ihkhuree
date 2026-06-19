import { prisma, safe } from "@/lib/prisma";
import { deepMerge } from "@/lib/content";
import { AdminHeader, SavedBanner } from "@/components/admin/ui";
import {
  TranslationsEditor,
  type AllMessages,
} from "@/components/admin/TranslationsEditor";
import mn from "@/messages/mn.json";
import en from "@/messages/en.json";
import ja from "@/messages/ja.json";

export const dynamic = "force-dynamic";

const files = { mn, en, ja } as unknown as AllMessages;

export default async function AdminTranslationsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;

  const row = await safe(
    prisma.siteContent.findUnique({ where: { key: "ui" } }),
    null,
  );
  const overrides = (row?.value ?? {}) as Partial<AllMessages>;

  const initial: AllMessages = {
    mn: deepMerge(files.mn, overrides.mn),
    en: deepMerge(files.en, overrides.en),
    ja: deepMerge(files.ja, overrides.ja),
  };

  return (
    <div>
      <AdminHeader
        title="Орчуулга (UI)"
        description="Цэс, товч, хөл хэсэг зэрэг интерфэйсийн бичвэрүүд."
      />
      <SavedBanner show={!!saved} />
      <TranslationsEditor initial={initial} />
    </div>
  );
}
