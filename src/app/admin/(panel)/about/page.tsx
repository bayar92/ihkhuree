import { getContent } from "@/lib/content";
import { aboutDefaults } from "@/content/defaults";
import { AdminHeader, SavedBanner } from "@/components/admin/ui";
import { AboutEditor } from "@/components/admin/AboutEditor";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const content = await getContent("about", aboutDefaults);

  return (
    <div>
      <AdminHeader
        title="Бидний тухай"
        description="Бидний тухай хуудасны бүх агуулга, орчуулга."
      />
      <SavedBanner show={!!saved} />
      <AboutEditor initial={content} />
    </div>
  );
}
