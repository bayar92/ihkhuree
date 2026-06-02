import { prisma } from "@/lib/prisma";
import { saveHero } from "../../actions";
import { LocalizedField } from "@/components/admin/LocalizedField";
import { AdminHeader, Card, PrimaryButton, SavedBanner } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function HeroAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const hero = await prisma.hero.findFirst({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <AdminHeader
        title="Нүүр баннер"
        description="Нүүр хуудасны гол хэсгийн агуулга."
      />
      <SavedBanner show={!!saved} />
      <Card>
        <form action={saveHero} className="space-y-5">
          <input type="hidden" name="id" defaultValue={hero?.id ?? ""} />
          <LocalizedField name="title" label="Гарчиг" defaultValue={hero?.title} required />
          <LocalizedField name="subtitle" label="Дэд гарчиг" defaultValue={hero?.subtitle} />
          <LocalizedField name="tagline" label="Тайлбар" defaultValue={hero?.tagline} textarea />
          <div className="grid gap-5 sm:grid-cols-2">
            <LocalizedField name="ctaLabel" label="Товчны текст" defaultValue={hero?.ctaLabel} />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Товчны холбоос
              </label>
              <input
                name="ctaHref"
                defaultValue={hero?.ctaHref ?? "/about"}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Зургийн URL (заавал биш)
            </label>
            <input
              name="image"
              defaultValue={hero?.image ?? ""}
              placeholder="https://..."
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <PrimaryButton>Хадгалах</PrimaryButton>
        </form>
      </Card>
    </div>
  );
}
