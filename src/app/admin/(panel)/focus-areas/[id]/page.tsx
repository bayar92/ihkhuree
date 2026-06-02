import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/ui";
import { FocusAreaForm } from "@/components/admin/FocusAreaForm";

export const dynamic = "force-dynamic";

export default async function EditFocusAreaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const area = await prisma.focusArea.findUnique({ where: { id } });
  if (!area) notFound();

  return (
    <div>
      <AdminHeader title="Чиглэл засах" />
      <FocusAreaForm area={area} />
    </div>
  );
}
