import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma, safe } from "@/lib/prisma";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/PageHeader";
import { NewsCard } from "@/components/NewsCard";

export const dynamic = "force-dynamic";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const t = await getTranslations();

  const news = await safe(
    prisma.news.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    }),
    [],
  );

  return (
    <>
      <PageHeader title={t("nav.news")} />
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          {news.length === 0 ? (
            <p className="text-neutral-500">{t("home.noNews")}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((n) => (
                <NewsCard key={n.id} news={n} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
