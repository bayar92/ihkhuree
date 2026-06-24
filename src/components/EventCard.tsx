"use client";

import type { Event } from "@prisma/client";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { formatDate, utcParts } from "@/lib/format-date";

function isMonthSpan(start: Date, end: Date | null) {
  if (!end) return false;
  const s = utcParts(start);
  const e = utcParts(end);
  const lastDay = new Date(Date.UTC(s.year, s.month + 1, 0)).getUTCDate();
  return (
    s.day === 1 &&
    e.day === lastDay &&
    s.month === e.month &&
    s.year === e.year
  );
}

function DateBadge({
  start,
  end,
  locale,
}: {
  start: Date;
  end: Date | null;
  locale: Locale;
}) {
  const monthSpan = isMonthSpan(start, end);
  const multiDay =
    end &&
    !monthSpan &&
    (utcParts(end).day !== utcParts(start).day ||
      utcParts(end).month !== utcParts(start).month ||
      utcParts(end).year !== utcParts(start).year);

  return (
    <div className="inline-flex w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-600 px-1 py-2.5 text-center text-white shadow-sm">
      {monthSpan ? (
        <>
          <span className="text-2xl font-bold leading-none">
            {formatDate(start, locale, { month: "short" })}
          </span>
          <span className="mt-1 text-xs text-brand-200">
            {formatDate(start, locale, { year: "numeric" })}
          </span>
        </>
      ) : multiDay ? (
        <>
          <span className="text-lg font-bold leading-none">
            {formatDate(start, locale, { day: "2-digit" })}
            <span className="mx-0.5 text-sm font-normal">–</span>
            {formatDate(end!, locale, { day: "2-digit" })}
          </span>
          <span className="mt-1 text-xs uppercase tracking-wider">
            {formatDate(start, locale, { month: "short" })}
          </span>
          <span className="text-xs text-brand-200">
            {formatDate(start, locale, { year: "numeric" })}
          </span>
        </>
      ) : (
        <>
          <span className="text-3xl font-bold leading-none">
            {formatDate(start, locale, { day: "2-digit" })}
          </span>
          <span className="mt-1 text-xs uppercase tracking-wider">
            {formatDate(start, locale, { month: "short" })}
          </span>
          <span className="text-xs text-brand-200">
            {formatDate(start, locale, { year: "numeric" })}
          </span>
        </>
      )}
    </div>
  );
}

function EventCardBody({
  event,
  locale,
  start,
  end,
  title,
  location,
  description,
  clickable,
}: {
  event: Event;
  locale: Locale;
  start: Date;
  end: Date | null;
  title: string;
  location: string;
  description: string;
  clickable: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition duration-200 ${
        clickable ? "group-hover:-translate-y-0.5 group-hover:shadow-lg" : ""
      }`}
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-brand-100">
        {event.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.image}
            alt={title}
            className={`absolute inset-0 h-full w-full object-cover object-top ${clickable ? "transition-transform duration-300 group-hover:scale-105" : ""}`}
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-brand-500 to-brand-700" />
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5">
        <DateBadge start={start} end={end} locale={locale} />

        <h3 className="mt-3 line-clamp-3 font-semibold text-brand-800">
          {title}
        </h3>
        {location && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-brand-500">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {location}
          </p>
        )}
        <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-neutral-600">
          {description}
        </p>
      </div>
    </div>
  );
}

export function EventCard({ event, locale }: { event: Event; locale: Locale }) {
  const start = new Date(event.startsAt);
  const end = event.endsAt ? new Date(event.endsAt) : null;
  const title = pick(event.title, locale);
  const location = pick(event.location, locale);
  const description = pick(event.description, locale);

  const body = (
    <EventCardBody
      event={event}
      locale={locale}
      start={start}
      end={end}
      title={title}
      location={location}
      description={description}
      clickable={Boolean(event.link)}
    />
  );

  if (event.link) {
    return (
      <a
        href={event.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className="group flex h-full w-full cursor-pointer no-underline"
      >
        {body}
      </a>
    );
  }

  return <div className="h-full w-full">{body}</div>;
}
