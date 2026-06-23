import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma, safe } from "@/lib/prisma";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { normalizeSlugParam } from "@/lib/slug";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug: rawSlug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const t = await getTranslations();
  const slug = normalizeSlugParam(rawSlug);

  const news = await safe(prisma.news.findUnique({ where: { slug } }), null);
  if (!news || !news.published) notFound();

  return (
    <article>
      <div className="hero-lines border-b border-neutral-100 bg-gradient-to-b from-brand-50/60 to-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            ← {t("nav.news")}
          </Link>
          <time className="mt-4 block text-sm font-medium uppercase tracking-wide text-brand-500">
            {new Date(news.publishedAt).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-2 font-serif text-3xl font-bold text-brand-700 sm:text-4xl">
            {pick(news.title, locale)}
          </h1>
        </div>
      </div>

      {news.coverImage && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={news.coverImage}
            alt={pick(news.title, locale)}
            className="-mt-2 aspect-[16/9] w-full rounded-xl object-cover shadow"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="mb-6 text-lg font-medium text-neutral-700">
          {pick(news.excerpt, locale)}
        </p>
        <div className="whitespace-pre-line leading-relaxed text-neutral-700">
          {pick(news.content, locale)}
        </div>

        {news.images.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {news.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`${pick(news.title, locale)} — ${i + 1}`}
                className="w-full rounded-xl object-cover shadow-sm ring-1 ring-neutral-200"
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
