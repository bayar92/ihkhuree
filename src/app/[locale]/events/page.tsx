import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma, safe } from "@/lib/prisma";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/EventCard";

export const dynamic = "force-dynamic";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const t = await getTranslations();

  const events = await safe(
    prisma.event.findMany({
      where: { published: true },
      orderBy: { startsAt: "asc" },
    }),
    [],
  );

  return (
    <>
      <PageHeader title={t("nav.events")} />
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          {events.length === 0 ? (
            <p className="text-neutral-500">{t("home.noEvents")}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {events.map((e) => (
                <EventCard key={e.id} event={e} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
