import {
  ArrowRight,
  CircleDollarSign,
  Handshake,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import type { HomeContent } from "@/content/defaults";

const ICONS: Record<string, LucideIcon> = {
  userCheck: UserCheck,
  handshake: Handshake,
  fee: CircleDollarSign,
};

/** Statement band under the hero: who you connect with and what you get. */
export function ConnectSection({
  content,
  locale,
}: {
  content: HomeContent["connect"];
  locale: Locale;
}) {
  return (
    <section className="border-t border-neutral-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            {pick(content.label, locale)}
          </span>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-[#c8a44d]" />
          <h2 className="mt-8 font-serif text-3xl leading-snug text-brand-700 sm:text-4xl">
            {pick(content.title, locale)}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600">
            {pick(content.text, locale)}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.cards.map((card, i) => {
            const Icon = ICONS[card.icon] ?? UserCheck;
            return (
              <Link
                key={i}
                href={card.href}
                className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-brand-700">
                  {pick(card.title, locale)}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                  {pick(card.text, locale)}
                </p>
                <ArrowRight className="mt-5 h-5 w-5 text-brand-500 transition-transform group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/join"
            className="rounded-md bg-brand-600 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-brand-700"
          >
            {pick(content.primaryCta, locale)}
          </Link>
          <Link
            href="/membership"
            className="rounded-md border border-brand-600 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-brand-700 transition hover:bg-brand-50"
          >
            {pick(content.secondaryCta, locale)}
          </Link>
        </div>
      </div>
    </section>
  );
}
