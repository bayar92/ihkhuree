import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import {
  Globe,
  Handshake,
  BarChart3,
  Megaphone,
  GraduationCap,
  Star,
  Crown,
  Gem,
  Award,
  Shield,
  User,
  Users,
  FileText,
  Search,
  CircleCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { CertificateGallery } from "@/components/CertificateGallery";
import { getContent } from "@/lib/content";
import { membershipDefaults } from "@/content/defaults";

export const dynamic = "force-dynamic";

// Icon keys (stored per item in the DB) mapped to lucide components.
const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  handshake: Handshake,
  barChart: BarChart3,
  megaphone: Megaphone,
  graduation: GraduationCap,
  star: Star,
  crown: Crown,
  gem: Gem,
  award: Award,
  shield: Shield,
  user: User,
  users: Users,
  fileText: FileText,
  search: Search,
  check: CircleCheck,
};
const icon = (key: string): LucideIcon => iconMap[key] ?? Globe;

export default async function MembershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;

  const c = await getContent("membership", membershipDefaults);
  const {
    hero,
    labels,
    countries,
    certificates,
    heroSub,
    apply,
    perYear,
    perMonth,
    benefits,
    types,
    steps,
  } = c;
  const ctaText = c.cta.text;
  const ctaBtn = c.cta.btn;

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
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28 lg:px-8">
          <div className="max-w-xl">
            <h1 className="font-serif text-4xl font-semibold tracking-wide text-brand-700 sm:text-5xl">
              {pick(labels.title, locale)}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
              {pick(heroSub, locale)}
            </p>
          </div>
        </div>
      </section>

      {/* Member benefits */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle label={pick(labels.benefits, locale)} />
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:divide-x xl:divide-neutral-200">
            {benefits.map((b, i) => {
              const Icon = icon(b.icon);
              return (
                <div key={i} className="flex flex-col items-center px-3 text-center">
                  <Icon className="h-9 w-9 text-brand-500" strokeWidth={1.5} />
                  <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-brand-700">
                    {pick(b.title, locale)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                    {pick(b.text, locale)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership types */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle label={pick(labels.types, locale)} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {types.map((tp, i) => {
              const Icon = icon(tp.icon);
              const featured = tp.featured;
              return (
                <div
                  key={i}
                  className={`relative flex flex-col overflow-hidden rounded-2xl border p-7 shadow-sm transition ${
                    featured
                      ? "border-brand-700 bg-brand-700 text-white ring-2 ring-[#c8a44d] lg:-my-2 lg:shadow-xl"
                      : "border-neutral-200 bg-white"
                  }`}
                >
                  {tp.badge && pick(tp.badge, locale) && (
                    <span className="absolute right-[-42px] top-[22px] w-40 rotate-45 bg-[#c8a44d] py-1 text-center text-[10px] font-bold uppercase tracking-wider text-white shadow">
                      {pick(tp.badge, locale)}
                    </span>
                  )}
                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                      featured ? "bg-white/15" : "bg-brand-50"
                    }`}
                  >
                    <Icon
                      className={`h-7 w-7 ${featured ? "text-white" : "text-brand-600"}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3
                    className={`mt-5 text-center text-sm font-bold leading-snug uppercase tracking-wide ${
                      featured ? "text-white" : "text-brand-700"
                    }`}
                  >
                    {pick(tp.name, locale)}
                  </h3>
                  <div className="mt-3 text-center">
                    <p>
                      <span className="font-serif text-3xl font-bold">{tp.price}</span>
                      <span className={featured ? "text-brand-100" : "text-neutral-400"}>
                        {" "}
                        {pick(perYear, locale)}
                      </span>
                    </p>
                    <p className={`mt-1 text-sm ${featured ? "text-brand-100" : "text-neutral-500"}`}>
                      ({tp.monthly}
                      {pick(perMonth, locale)})
                    </p>
                  </div>
                  <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                    {tp.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CircleCheck
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            featured ? "text-[#e3c887]" : "text-brand-500"
                          }`}
                          strokeWidth={2}
                        />
                        <span className={featured ? "text-brand-50" : "text-neutral-600"}>
                          {pick(f, locale)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/join"
                    className={`mt-7 rounded-full px-5 py-2.5 text-center text-xs font-semibold uppercase tracking-wider transition ${
                      featured
                        ? "bg-[#c8a44d] text-white hover:brightness-110"
                        : "border border-brand-600 text-brand-700 hover:bg-brand-600 hover:text-white"
                    }`}
                  >
                    {pick(apply, locale)}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Member country reach */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle label={pick(labels.countries, locale)} />
          <div className="mt-12 flex flex-wrap items-stretch justify-center gap-5">
            {countries.map((c) => (
              <div
                key={c.code}
                className="flex w-32 flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/w160/${c.code}.png`}
                  alt={pick(c.name, locale)}
                  width={64}
                  height={43}
                  className="h-11 w-16 rounded object-cover shadow ring-1 ring-neutral-200"
                />
                <span className="text-sm font-semibold text-brand-700">
                  {pick(c.name, locale)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to become a member */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle label={pick(labels.how, locale)} />
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = icon(s.icon);
              return (
                <div key={i} className="relative flex flex-col items-center text-center">
                  {i < steps.length - 1 && (
                    <span className="absolute left-1/2 top-8 hidden h-px w-full bg-neutral-200 lg:block" />
                  )}
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-600">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <span className="mt-4 font-serif text-xl font-bold text-brand-700">
                    {s.no}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    {pick(s.title, locale)}
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    {pick(s.text, locale)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Member certificates */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle label={pick(labels.certificates, locale)} />
          <div className="mt-12">
            <CertificateGallery images={certificates} />
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-brand-800 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:px-8">
          <p className="max-w-2xl font-serif text-2xl leading-snug">
            {pick(ctaText, locale)}
          </p>
          <Link
            href="/join"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#c8a44d] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:brightness-110"
          >
            {pick(ctaBtn, locale)}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="font-serif text-2xl font-semibold uppercase tracking-[0.12em] text-brand-700 sm:text-3xl">
        {label}
      </h2>
      <span className="mt-3 block h-0.5 w-16 rounded bg-[#c8a44d]" />
    </div>
  );
}
