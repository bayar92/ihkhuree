"use client";

import { useCallback, useEffect, useState } from "react";
import type { Event } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { EventCard } from "@/components/EventCard";

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setCount(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return count;
}

export function EventCardsSlider({
  events,
  locale,
}: {
  events: Event[];
  locale: Locale;
}) {
  const visibleCount = useVisibleCount();
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, events.length - visibleCount);
  const canSlide = events.length > visibleCount;

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = useCallback(
    () => setIndex((i) => Math.max(0, i - 1)),
    [],
  );
  const next = useCallback(
    () => setIndex((i) => Math.min(maxIndex, i + 1)),
    [maxIndex],
  );

  if (events.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(calc(-${index} * ((100% - ${(visibleCount - 1) * 1.5}rem) / ${visibleCount} + 1.5rem)))`,
          }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="shrink-0"
              style={{
                width: `calc((100% - ${(visibleCount - 1) * 1.5}rem) / ${visibleCount})`,
              }}
            >
              <EventCard event={event} locale={locale} />
            </div>
          ))}
        </div>
      </div>

      {canSlide && (
        <>
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            aria-label="Өмнөх"
            className="absolute -left-3 top-[38%] z-10 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2.5 text-brand-700 shadow-md transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex lg:-left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={index >= maxIndex}
            aria-label="Дараах"
            className="absolute -right-3 top-[38%] z-10 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2.5 text-brand-700 shadow-md transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex lg:-right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Слайд ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-brand-600" : "w-2 bg-brand-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
