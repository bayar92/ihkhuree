import type { News } from "@prisma/client";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/format-date";
import { getNewsImages } from "@/lib/news-images";
import { NewsCardFillImage } from "@/components/NewsCardFillImage";
import { NewsCardImageSlider } from "@/components/NewsCardImageSlider";

export function NewsCard({
  news,
  locale,
  slideshow = false,
}: {
  news: News;
  locale: Locale;
  slideshow?: boolean;
}) {
  const title = pick(news.title, locale);

  return (
    <Link
      href={`/news/${news.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-100">
        {slideshow ? (
          <NewsCardImageSlider images={getNewsImages(news)} alt={title} />
        ) : news.coverImage ? (
          <NewsCardFillImage
            src={news.coverImage}
            alt={title}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-700" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <time className="text-xs font-medium uppercase tracking-wide text-brand-500">
          {formatDate(news.publishedAt, locale, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <h3 className="mt-2 line-clamp-2 font-semibold text-brand-800 transition group-hover:text-brand-600">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
          {pick(news.excerpt, locale)}
        </p>
      </div>
    </Link>
  );
}
