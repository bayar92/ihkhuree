import type { Event } from "@prisma/client";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";

export function EventCard({ event, locale }: { event: Event; locale: Locale }) {
  const start = new Date(event.startsAt);
  return (
    <article className="flex overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex w-24 shrink-0 flex-col items-center justify-center bg-brand-600 text-white">
        <span className="text-3xl font-bold leading-none">
          {start.toLocaleDateString(locale, { day: "2-digit" })}
        </span>
        <span className="mt-1 text-xs uppercase tracking-wider">
          {start.toLocaleDateString(locale, { month: "short" })}
        </span>
        <span className="text-xs text-brand-200">
          {start.toLocaleDateString(locale, { year: "numeric" })}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-semibold text-brand-800">
          {pick(event.title, locale)}
        </h3>
        {pick(event.location, locale) && (
          <p className="mt-1 flex items-center gap-1 text-xs text-brand-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {pick(event.location, locale)}
          </p>
        )}
        <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
          {pick(event.description, locale)}
        </p>
        <p className="mt-auto pt-2 text-xs text-neutral-400">
          {start.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </article>
  );
}
