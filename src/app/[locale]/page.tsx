import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { prisma, safe } from '@/lib/prisma';
import { pick } from '@/lib/i18n';
import type { Locale } from '@/i18n/routing';
import { BrandLogo } from '@/components/BrandLogo';
import {
  Globe,
  Users,
  Handshake,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Leaf,
  type LucideIcon,
} from 'lucide-react';
import { ArrowRightIcon } from '@/components/Icons';

// Highlight card icons (lucide-react), keyed by the `icon` field stored per Feature.
const featureLucide: Record<string, LucideIcon> = {
  globe: Globe,
  users: Users,
  handshake: Handshake,
  growth: TrendingUp,
};

// Focus-area strip icons (lucide-react), keyed by the `icon` field per FocusArea.
const focusLucide: Record<string, LucideIcon> = {
  trade: BarChart3,
  innovation: Lightbulb,
  sustainability: Leaf,
  education: Users,
  exchange: Globe,
};
import { NewsCard } from '@/components/NewsCard';
import { EventCard } from '@/components/EventCard';

export const dynamic = 'force-dynamic';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const t = await getTranslations();

  const [hero, features, focusAreas, news, events] = await Promise.all([
    safe(prisma.hero.findFirst({ orderBy: { updatedAt: 'desc' } }), null),
    safe(prisma.feature.findMany({ orderBy: { order: 'asc' } }), []),
    safe(prisma.focusArea.findMany({ orderBy: { order: 'asc' } }), []),
    safe(
      prisma.news.findMany({
        where: { published: true },
        orderBy: { publishedAt: 'desc' },
        take: 3,
      }),
      []
    ),
    safe(
      prisma.event.findMany({
        where: { published: true, startsAt: { gte: new Date() } },
        orderBy: { startsAt: 'asc' },
        take: 3,
      }),
      []
    ),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        {/* Decorative background (waves + glow) from the design */}
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          aria-hidden
          className="pointer-events-none select-none object-cover object-bottom"
        />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div>
            <h1 className="font-serif text-4xl font-bold leading-tight text-brand-700 sm:text-5xl lg:text-6xl">
              {hero ? pick(hero.title, locale) : 'Ikh Khuree'}
            </h1>
            <p className="mt-3 font-serif text-2xl leading-snug text-brand-600 sm:text-3xl">
              {hero
                ? pick(hero.subtitle, locale)
                : 'international business cooperation association'}
            </p>
            <div className="my-6 h-px w-16 bg-brand-300" />
            <p className="max-w-md text-lg text-neutral-600">
              {hero
                ? pick(hero.tagline, locale)
                : 'Их хүрээ олон улсын бизнесс хамтын ажиллагааны холбоо'}
            </p>
            <Link
              href={hero?.ctaHref ?? '/about'}
              className="group mt-8 inline-flex items-center gap-2 rounded-md bg-brand-600 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition hover:bg-brand-700"
            >
              {hero ? pick(hero.ctaLabel, locale) : t('common.learnMore')}
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 scale-110 rounded-full bg-brand-100/50 blur-2xl" />
              <BrandLogo
                priority
                className="relative h-64 w-64 sm:h-80 sm:w-80 shadow-xl ring-1 ring-brand-100"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Highlights */}
      {features.length > 0 && (
        <section className="border-t border-neutral-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => {
                const Icon = featureLucide[f.icon] ?? Globe;

                const card = (
                  <div className="group flex flex-col items-center text-center">
                    {/* ICON */}
                    <div className="flex justify-center">
                      <Icon
                        className="h-12 w-12 text-brand-500"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* TITLE */}
                    <h3 className="mt-5 text-lg font-bold uppercase tracking-wide text-brand-700">
                      {pick(f.title, locale)}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-600">
                      {pick(f.body, locale)}
                    </p>

                    {/* LINE */}
                    <span className="mt-4 h-0.5 w-10 bg-brand-300 transition-all duration-300 group-hover:w-16" />
                  </div>
                );

                return f.href ? (
                  <Link
                    key={f.id}
                    href={f.href}
                    className="transition-transform duration-300 hover:-translate-y-1"
                  >
                    {card}
                  </Link>
                ) : (
                  <div key={f.id}>{card}</div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      {/* Focus areas strip */}
      {focusAreas.length > 0 && (
        <section className="bg-brand-700 text-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            {/* TITLE */}
            <div className="flex flex-col items-center text-center">
              <h2 className="font-serif text-2xl font-semibold uppercase tracking-[0.15em] sm:text-3xl">
                {t('home.focusAreas')}
              </h2>

              <span className="mt-4 block h-0.5 w-20 rounded bg-[#c8a44d]" />
            </div>

            {/* ITEMS */}
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {focusAreas.map((fa) => {
                const Icon = focusLucide[fa.icon] ?? BarChart3;

                return (
                  <div
                    key={fa.id}
                    className="
                group
                flex flex-col items-center gap-4 text-center
                rounded-2xl
                px-4 py-6
                transition-all duration-300 ease-out
                hover:-translate-y-2
                hover:bg-white/10
                hover:shadow-2xl
                cursor-pointer
              "
                  >
                    {/* ICON */}
                    <div
                      className="
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:rotate-3
                "
                    >
                      <Icon
                        className="h-11 w-11 text-brand-100"
                        strokeWidth={1.25}
                      />
                    </div>

                    {/* TEXT */}
                    <span
                      className="
                  text-sm font-medium uppercase tracking-wider text-brand-50
                  transition-all duration-300
                  group-hover:text-white
                "
                    >
                      {pick(fa.label, locale)}
                    </span>

                    {/* BOTTOM LINE */}
                    <span
                      className="
                  h-0.5 w-0 bg-[#c8a44d]
                  transition-all duration-300
                  group-hover:w-10
                "
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      {/* About Section */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* LEFT CONTENT */}
          <div>
            {/* SMALL TITLE */}
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              ABOUT US
            </span>

            {/* LINE */}
            <div className="mt-4 h-0.5 w-16 bg-brand-400" />

            {/* MAIN TITLE */}
            <h2 className="mt-10 font-serif text-4xl leading-tight text-brand-700 sm:text-5xl">
              Bridging borders.
              <br />
              Empowering cooperation.
            </h2>

            {/* LINE */}
            <div className="mt-10 h-0.5 w-16 bg-brand-400" />

            {/* DESCRIPTION */}
            <p className="mt-10 max-w-xl text-base leading-9 text-neutral-700">
              Ikh Khuree International Business Cooperation Association is a
              non-profit organization dedicated to fostering international
              collaboration, knowledge exchange, and sustainable growth.
            </p>

            {/* BUTTON */}
            <button
              className="
          group mt-12 inline-flex items-center gap-3
          text-sm font-semibold uppercase tracking-wider text-brand-600
          transition-all duration-300 hover:gap-5
        "
            >
              READ MORE
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative overflow-hidden rounded-sm">
            {/* IMAGE — swap this SVG placeholder for a real photo anytime */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about-city.svg"
              alt="About"
              className="
          h-full w-full object-cover
          transition-transform duration-700 hover:scale-105
        "
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-brand-500/10" />

            {/* OPTIONAL PATTERN */}
            <div
              className="
          absolute right-0 top-0 h-full w-40
          bg-white/10 backdrop-blur-[1px]
        "
            />
          </div>
        </div>
      </section>

      {/* Latest news */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-3xl font-bold text-brand-700">
              {t('home.latestNews')}
            </h2>
            <Link
              href="/news"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              {t('common.viewAll')} →
            </Link>
          </div>
          {news.length === 0 ? (
            <p className="text-neutral-500">{t('home.noNews')}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((n) => (
                <NewsCard key={n.id} news={n} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming events */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-3xl font-bold text-brand-700">
              {t('home.upcomingEvents')}
            </h2>
            <Link
              href="/events"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              {t('common.viewAll')} →
            </Link>
          </div>
          {events.length === 0 ? (
            <p className="text-neutral-500">{t('home.noEvents')}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <EventCard key={e.id} event={e} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
