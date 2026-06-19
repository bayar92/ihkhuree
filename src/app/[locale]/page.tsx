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
import { getContent } from '@/lib/content';
import { homeDefaults } from '@/content/defaults';

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

  const [hero, features, focusAreas, news, events, homeContent] = await Promise.all([
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
    getContent('home', homeDefaults),
  ]);
  const aboutTeaser = homeContent.aboutTeaser;

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
        <section className="border-t border-neutral-100 bg-gradient-to-b from-brand-50/40 to-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl font-semibold uppercase tracking-[0.12em] text-brand-700 sm:text-3xl">
                {t('home.highlightsTitle')}
              </h2>
              <span className="mt-3 block h-0.5 w-16 rounded bg-[#c8a44d] mx-auto" />
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {features.map((f) => {
                const Icon = featureLucide[f.icon] ?? Globe;

                const card = (
                  <article className="group flex h-full flex-col rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 transition group-hover:bg-brand-100">
                      <Icon className="h-6 w-6 text-brand-600" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-5 font-serif text-lg font-bold text-brand-700">
                      {pick(f.title, locale)}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-neutral-600">
                      {pick(f.body, locale)}
                    </p>
                    {f.href && (
                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600">
                        {t('common.learnMore')}
                        <ArrowRightIcon className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                      </span>
                    )}
                  </article>
                );

                return f.href ? (
                  <Link key={f.id} href={f.href} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  <div key={f.id} className="h-full">
                    {card}
                  </div>
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
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              {pick(aboutTeaser.label, locale)}
            </span>
            <div className="mt-4 h-0.5 w-16 bg-[#c8a44d]" />
            <h2 className="mt-10 font-serif text-4xl leading-tight text-brand-700 sm:text-5xl">
              {pick(aboutTeaser.title1, locale)}
              <br />
              {pick(aboutTeaser.title2, locale)}
            </h2>
            <div className="mt-10 h-0.5 w-16 bg-brand-300" />
            <p className="mt-10 max-w-xl text-base leading-8 text-neutral-700">
              {pick(aboutTeaser.text, locale)}
            </p>
            <Link
              href="/about"
              className="group mt-12 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-brand-600 transition-all duration-300 hover:gap-5"
            >
              {t('common.readMore')}
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-neutral-200/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about-city.svg"
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-700/10" />
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
