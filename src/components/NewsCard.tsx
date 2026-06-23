import type { News } from "@prisma/client";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/format-date";

export function NewsCard({ news, locale }: { news: News; locale: Locale }) {
  return (
    <Link
      href={`/news/${news.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="aspect-[16/10] overflow-hidden bg-brand-100">
        {news.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={news.coverImage}
            alt={pick(news.title, locale)}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700" />
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
          {pick(news.title, locale)}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
          {pick(news.excerpt, locale)}
        </p>
      </div>
    </Link>
  );
}
