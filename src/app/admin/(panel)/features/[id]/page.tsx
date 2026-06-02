import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/ui";
import { FeatureForm } from "@/components/admin/FeatureForm";

export const dynamic = "force-dynamic";

export default async function EditFeaturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const feature = await prisma.feature.findUnique({ where: { id } });
  if (!feature) notFound();

  return (
    <div>
      <AdminHeader title="Үнэт зүйл засах" />
      <FeatureForm feature={feature} />
    </div>
  );
}
