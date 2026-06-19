import { getContent } from "@/lib/content";
import { homeDefaults } from "@/content/defaults";
import { AdminHeader, SavedBanner } from "@/components/admin/ui";
import { HomeEditor } from "@/components/admin/HomeEditor";

export const dynamic = "force-dynamic";

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const content = await getContent("home", homeDefaults);

  return (
    <div>
      <AdminHeader
        title="Нүүр хуудас"
        description="Нүүр хуудасны 'Бидний тухай' блокийн агуулга. Баннерыг 'Нүүр баннер' хэсгээс засна."
      />
      <SavedBanner show={!!saved} />
      <HomeEditor initial={content} />
    </div>
  );
}
