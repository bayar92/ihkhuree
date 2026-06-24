import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/ui";
import { NewsForm } from "@/components/admin/NewsForm";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await prisma.news.findUnique({ where: { id } });
  if (!news) notFound();

  return (
    <div>
      <AdminHeader title="Мэдээ засах" />
      <NewsForm news={news} />
    </div>
  );
}
