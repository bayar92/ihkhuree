import { getContent } from "@/lib/content";
import { membershipDefaults } from "@/content/defaults";
import { AdminHeader, SavedBanner } from "@/components/admin/ui";
import { MembershipEditor } from "@/components/admin/MembershipEditor";

export const dynamic = "force-dynamic";

export default async function AdminMembershipPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const content = await getContent("membership", membershipDefaults);

  return (
    <div>
      <AdminHeader
        title="Гишүүнчлэл"
        description="Гишүүнчлэлийн хуудасны бүх агуулга, орчуулга."
      />
      <SavedBanner show={!!saved} />
      <MembershipEditor initial={content} />
    </div>
  );
}
