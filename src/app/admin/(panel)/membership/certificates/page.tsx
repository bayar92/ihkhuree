import { getContent } from "@/lib/content";
import { membershipDefaults } from "@/content/defaults";
import { AdminHeader, SavedBanner } from "@/components/admin/ui";
import { CertificatesEditor } from "@/components/admin/CertificatesEditor";

export const dynamic = "force-dynamic";

export default async function AdminCertificatesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const content = await getContent("membership", membershipDefaults);

  return (
    <div>
      <AdminHeader
        title="Гэрчилгээний зургууд"
        description="Гишүүнчлэл хуудсын гэрчилгээний зургуудыг энд удирдана."
      />
      <SavedBanner show={!!saved} />
      <CertificatesEditor initial={content} />
    </div>
  );
}
