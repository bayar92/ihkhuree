"use client";

import type { Event } from "@prisma/client";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";

function isMonthSpan(start: Date, end: Date | null) {
  if (!end) return false;
  const lastDay = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
  return (
    start.getDate() === 1 &&
    end.getDate() === lastDay &&
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
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
    end.toDateString() !== start.toDateString() &&
    end.getDate() !== start.getDate();

  return (
    <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-600/95 px-1 py-2.5 text-center text-white shadow-md backdrop-blur-sm">
      {monthSpan ? (
        <>
          <span className="text-2xl font-bold leading-none">
            {start.toLocaleDateString(locale, { month: "short" })}
          </span>
          <span className="mt-1 text-xs text-brand-200">
            {start.toLocaleDateString(locale, { year: "numeric" })}
          </span>
        </>
      ) : multiDay ? (
        <>
          <span className="text-lg font-bold leading-none">
            {start.toLocaleDateString(locale, { day: "2-digit" })}
            <span className="mx-0.5 text-sm font-normal">–</span>
            {end!.toLocaleDateString(locale, { day: "2-digit" })}
          </span>
          <span className="mt-1 text-xs uppercase tracking-wider">
            {start.toLocaleDateString(locale, { month: "short" })}
          </span>
          <span className="text-xs text-brand-200">
            {start.toLocaleDateString(locale, { year: "numeric" })}
          </span>
        </>
      ) : (
        <>
          <span className="text-3xl font-bold leading-none">
            {start.toLocaleDateString(locale, { day: "2-digit" })}
          </span>
          <span className="mt-1 text-xs uppercase tracking-wider">
            {start.toLocaleDateString(locale, { month: "short" })}
          </span>
          <span className="text-xs text-brand-200">
            {start.toLocaleDateString(locale, { year: "numeric" })}
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
  hasImage,
  title,
  location,
  description,
  clickable,
}: {
  event: Event;
  locale: Locale;
  start: Date;
  end: Date | null;
  hasImage: boolean;
  title: string;
  location: string;
  description: string;
  clickable: boolean;
}) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-xl border shadow-sm transition duration-200 ${
        clickable ? "group-hover:-translate-y-0.5 group-hover:shadow-lg" : ""
      } ${hasImage ? "border-neutral-200/60" : "border-neutral-200 bg-white"}`}
    >
      {hasImage && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.image!}
            alt=""
            aria-hidden
            draggable={false}
            className={`pointer-events-none absolute inset-0 z-0 h-full w-full object-cover transition duration-300 ${
              clickable ? "group-hover:scale-105" : ""
            }`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-brand-950/95 via-brand-900/80 to-brand-800/35 transition duration-200 ${
              clickable ? "group-hover:via-brand-900/90" : ""
            }`}
          />
        </>
      )}

      <div className="relative z-10 flex flex-1 flex-col justify-end p-5">
        <DateBadge start={start} end={end} locale={locale} />

        <div className={`mt-3 flex flex-col ${hasImage ? "text-white" : ""}`}>
          <h3
            className={`line-clamp-3 font-semibold ${
              hasImage ? "text-white drop-shadow-sm" : "text-brand-800"
            }`}
          >
            {title}
          </h3>
          {location && (
            <p
              className={`mt-1.5 flex items-center gap-1 text-xs ${
                hasImage ? "text-brand-100" : "text-brand-500"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {location}
            </p>
          )}
          <p
            className={`mt-2 line-clamp-4 text-sm leading-relaxed ${
              hasImage ? "text-neutral-100" : "text-neutral-600"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function EventCard({ event, locale }: { event: Event; locale: Locale }) {
  const start = new Date(event.startsAt);
  const end = event.endsAt ? new Date(event.endsAt) : null;
  const hasImage = Boolean(event.image);
  const title = pick(event.title, locale);
  const location = pick(event.location, locale);
  const description = pick(event.description, locale);

  const body = (
    <EventCardBody
      event={event}
      locale={locale}
      start={start}
      end={end}
      hasImage={hasImage}
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
        className="group block h-[420px] cursor-pointer no-underline"
      >
        {body}
      </a>
    );
  }

  return <div className="h-[420px]">{body}</div>;
}
