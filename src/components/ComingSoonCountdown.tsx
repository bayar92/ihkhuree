"use client";

import { useEffect, useState } from "react";
import { COMING_SOON_DEADLINE } from "@/lib/coming-soon";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(deadline: number): TimeLeft {
  const diff = Math.max(0, deadline - Date.now());
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const units = [
  { key: "days", label: "Өдөр" },
  { key: "hours", label: "Цаг" },
  { key: "minutes", label: "Мин" },
  { key: "seconds", label: "Сек" },
] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ComingSoonCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(COMING_SOON_DEADLINE));
    const id = setInterval(() => setTimeLeft(getTimeLeft(COMING_SOON_DEADLINE)), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) {
    return (
      <div className="mt-10 grid w-full max-w-md grid-cols-4 gap-3">
        {units.map(({ key }) => (
          <div
            key={key}
            className="flex flex-col items-center rounded-xl border border-white/15 bg-white/10 px-3 py-4 backdrop-blur-sm"
          >
            <span className="font-serif text-3xl font-bold tabular-nums text-white md:text-4xl">
              --
            </span>
            <span className="mt-1 text-[11px] font-medium uppercase tracking-widest text-brand-200">
              ···
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10 grid w-full max-w-md grid-cols-4 gap-3">
      {units.map(({ key, label }) => (
        <div
          key={key}
          className="flex flex-col items-center rounded-xl border border-white/15 bg-white/10 px-3 py-4 shadow-lg shadow-brand-950/20 backdrop-blur-sm"
        >
          <span className="font-serif text-3xl font-bold tabular-nums text-white md:text-4xl">
            {pad(timeLeft[key])}
          </span>
          <span className="mt-1 text-[11px] font-medium uppercase tracking-widest text-brand-200">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
