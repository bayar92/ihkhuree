import {
  CalendarCheck,
  FileText,
  MessagesSquare,
  Target,
  type LucideIcon,
} from "lucide-react";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import type { HomeContent } from "@/content/defaults";

const ICONS: Record<string, LucideIcon> = {
  profile: FileText,
  target: Target,
  meeting: CalendarCheck,
  chat: MessagesSquare,
};

/** The four steps a member goes through after joining. */
export function JourneySection({
  content,
  locale,
}: {
  content: HomeContent["journey"];
  locale: Locale;
}) {
  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            {pick(content.label, locale)}
          </span>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-[#c8a44d]" />
          <h2 className="mt-8 font-serif text-3xl text-brand-700 sm:text-4xl">
            {pick(content.title, locale)}
          </h2>
        </div>

        <ol className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, i) => {
            const Icon = ICONS[step.icon] ?? FileText;
            return (
              <li key={i} className="relative flex flex-col items-center text-center">
                {i < content.steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-8 hidden h-px w-full bg-neutral-300 lg:block"
                  />
                )}
                <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-600 shadow-sm">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <span className="mt-4 font-serif text-xl font-bold text-brand-700">
                  {step.no}
                </span>
                <h3 className="mt-1 text-sm font-bold uppercase tracking-wide text-neutral-800">
                  {pick(step.title, locale)}
                </h3>
                <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-neutral-600">
                  {pick(step.text, locale)}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
