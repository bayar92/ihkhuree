import { prisma } from "@/lib/prisma";
import type { Page } from "@prisma/client";
import { AdminHeader, SavedBanner } from "@/components/admin/ui";
import { PageForm } from "@/components/admin/PageForm";

export const dynamic = "force-dynamic";

export default async function EditPagePage({
  params,
  searchParams,
}: {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { key } = await params;
  const { saved } = await searchParams;

  const existing = await prisma.page.findUnique({ where: { key } });
  const page: Page =
    existing ??
    ({
      id: "",
      key,
      title: {},
      intro: {},
      body: [],
      updatedAt: new Date(),
    } as Page);

  return (
    <div>
      <AdminHeader title={`Хуудас засах: ${key}`} />
      <SavedBanner show={!!saved} />
      <PageForm page={page} />
    </div>
  );
}
