import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import {
  Target,
  Eye,
  Handshake,
  Globe,
  Users,
  Briefcase,
  CalendarDays,
  Flag,
  BarChart3,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { pick } from '@/lib/i18n';
import type { Locale } from '@/i18n/routing';
import { getContent } from '@/lib/content';
import { aboutDefaults } from '@/content/defaults';

export const dynamic = 'force-dynamic';

// Icon keys (stored per item in the DB) mapped to lucide components.
const iconMap: Record<string, LucideIcon> = {
  target: Target,
  eye: Eye,
  handshake: Handshake,
  globe: Globe,
  users: Users,
  briefcase: Briefcase,
  calendar: CalendarDays,
  flag: Flag,
  barChart: BarChart3,
};
const icon = (key: string): LucideIcon => iconMap[key] ?? Globe;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;

  const c = await getContent('about', aboutDefaults);
  const { hero, sectionLabels, purpose, stats, timeline, history, leadership } = c;

  return (
    <div>
      {/* Hero banner */}
      <section className="relative overflow-hidden border-b border-neutral-100">
        <Image
          src={hero.image}
          alt=""
          fill
          priority
          aria-hidden
          unoptimized
          sizes="100vw"
          className="object-cover object-right"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-brand-950/85 via-brand-900/65 to-brand-900/20"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28 lg:px-8">
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">
              {pick(sectionLabels.about, locale)}
            </span>
            <div className="mt-4 h-0.5 w-16 bg-[#c8a44d]" />
            <h1 className="mt-8 font-serif text-4xl leading-tight text-white drop-shadow-sm sm:text-5xl">
              {pick(hero.title1, locale)}
              <br />
              {pick(hero.title2, locale)}
            </h1>
            <p className="mt-6 max-w-2xl leading-8 text-neutral-100">
              {pick(hero.text, locale)}
            </p>
            <Link
              href="/membership"
              className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:gap-4"
            >
              {pick(hero.cta, locale)}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      {/* Leadership */}
      <section className="bg-brand-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle label={pick(sectionLabels.leadership, locale)} />
          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-100">
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col items-center gap-4 bg-brand-50/60 px-8 py-10 text-center md:w-72 md:shrink-0">
                <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-md">
                  <Image
                    src={leadership.image}
                    alt={pick(leadership.name, locale)}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-brand-700">
                    {pick(leadership.name, locale)}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {pick(leadership.role, locale)}
                  </p>
                </div>
              </div>

              <div className="flex-1 px-8 py-10">
                <h3 className="font-serif text-2xl font-bold text-brand-700">
                  {pick(leadership.title, locale)}
                </h3>
                <p className="mt-4 whitespace-pre-line leading-relaxed text-neutral-700">
                  {pick(leadership.text, locale)}
                </p>
                <div className="mt-6 border-t border-neutral-100 pt-5 text-sm leading-relaxed text-neutral-600">
                  <p>{pick(leadership.signoff, locale)}</p>
                  <p className="mt-1">{pick(leadership.position, locale)}</p>
                  <p className="mt-1 font-semibold text-brand-700">
                    {pick(leadership.name, locale)}
                  </p>
                  <p className="mt-1 text-neutral-400">{leadership.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our purpose */}
      <section className="bg-linear-to-b from-white to-brand-50/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle label={pick(sectionLabels.purpose, locale)} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {purpose.map((p, i) => {
              const Icon = icon(p.icon);
              return (
                <article
                  key={i}
                  className="flex flex-col rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50">
                      <Icon className="h-6 w-6 text-brand-600" strokeWidth={1.5} />
                    </div>
                    <h3 className="pt-2 font-serif text-lg font-bold text-brand-700">
                      {pick(p.title, locale)}
                    </h3>
                  </div>
                  {p.text && (
                    <p className="mt-5 text-sm leading-7 text-neutral-600">
                      {pick(p.text, locale)}
                    </p>
                  )}
                  {p.items && (
                    <ul className="mt-5 space-y-3">
                      {p.items.map((it, j) => (
                        <li
                          key={j}
                          className="flex gap-3 text-sm leading-relaxed text-neutral-600"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8a44d]" />
                          <span>{pick(it, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* In numbers */}
      <section className="bg-brand-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionTitle label={pick(sectionLabels.numbers, locale)} light />
          <div className="mt-10 grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
            {stats.map((s, i) => {
              const Icon = icon(s.icon);
              return (
                <div key={i} className="flex flex-col items-center px-4 text-center">
                  <Icon className="h-8 w-8 text-brand-200" strokeWidth={1.5} />
                  <span className="mt-4 font-serif text-4xl font-bold">
                    {s.value}
                  </span>
                  <span className="mt-1 text-xs font-medium uppercase tracking-wider text-brand-100">
                    {pick(s.label, locale)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-700">
              {pick(sectionLabels.history, locale)}
            </h2>
            <div className="mt-4 h-0.5 w-16 bg-[#c8a44d]" />
            <p className="mt-6 leading-relaxed text-neutral-700">
              {pick(history.intro, locale)}
            </p>
            <Link
              href="/membership"
              className="mt-8 inline-block rounded-full border border-brand-600 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-700 transition hover:bg-brand-600 hover:text-white"
            >
              {pick(history.cta, locale)}
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
              {timeline.map((m, i) => {
                const Icon = icon(m.icon);
                return (
                  <div
                    key={i}
                    className="relative flex flex-col items-center text-center"
                  >
                    {i < timeline.length - 1 && (
                      <span className="absolute left-1/2 top-7 hidden h-px w-full bg-neutral-200 sm:block" />
                    )}
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-600">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <span className="mt-4 font-serif text-lg font-bold text-brand-700">
                      {m.year}
                    </span>
                    <span className="text-sm font-semibold text-neutral-800">
                      {pick(m.title, locale)}
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                      {pick(m.text, locale)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ label, light }: { label: string; light?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center">
      <h2
        className={`font-serif text-2xl font-semibold uppercase tracking-[0.12em] sm:text-3xl ${
          light ? 'text-white' : 'text-brand-700'
        }`}
      >
        {label}
      </h2>
      <span className="mt-3 block h-0.5 w-16 rounded bg-[#c8a44d]" />
    </div>
  );
}
