import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
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
  Quote,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";

type L = { mn: string; en: string; ja: string };

const sectionLabels = {
  about: { mn: "БИДНИЙ ТУХАЙ", en: "ABOUT US", ja: "私たちについて" },
  purpose: { mn: "БИДНИЙ ЗОРИЛГО", en: "OUR PURPOSE", ja: "私たちの目的" },
  numbers: {
    mn: "ИХ ХҮРЭЭ ТООН ДЭЭР",
    en: "IKH KHUREE IN NUMBERS",
    ja: "数字で見るイフ・フレー",
  },
  history: { mn: "БИДНИЙ ТҮҮХ", en: "OUR HISTORY", ja: "私たちの歩み" },
  leadership: { mn: "УДИРДЛАГА", en: "LEADERSHIP", ja: "リーダーシップ" },
};

const hero = {
  title1: { mn: "Хил дамнан холбож,", en: "Bridging borders.", ja: "国境を越えてつなぎ、" },
  title2: {
    mn: "хамтын ажиллагааг бэхжүүлнэ.",
    en: "Empowering cooperation.",
    ja: "協力を強化する。",
  },
  text: {
    mn: "Их Хүрээ олон улсын бизнесийн хамтын ажиллагааны холбоо нь олон улсын хамтын ажиллагаа, мэдлэг солилцоо, тогтвортой хөгжлийг дэмжих зорилготой ашгийн бус байгууллага юм.",
    en: "Ikh Khuree International Business Cooperation Association is a non-profit organization dedicated to fostering international collaboration, knowledge exchange, and sustainable growth.",
    ja: "イフ・フレー国際ビジネス協力協会は、国際協力、知識交換、持続可能な成長を促進する非営利団体です。",
  },
  cta: { mn: "ДЭЛГЭРЭНГҮЙ", en: "READ MORE", ja: "詳細を見る" },
};

const purpose: {
  icon: LucideIcon;
  title: L;
  text?: L;
  items?: L[];
}[] = [
  {
    icon: Target,
    title: { mn: "Эрхэм зорилго", en: "Our Mission", ja: "使命" },
    text: {
      mn: "Олон улсын бизнесийн хамтын ажиллагаа, тогтвортой хөгжлийг дэмжих.",
      en: "To promote international business cooperation and sustainable development.",
      ja: "国際ビジネス協力と持続可能な発展を促進すること。",
    },
  },
  {
    icon: Eye,
    title: { mn: "Алсын хараа", en: "Our Vision", ja: "ビジョン" },
    text: {
      mn: "Дэлхийн бизнесүүдийг холбосон тэргүүлэгч платформ болох.",
      en: "To be a leading platform connecting businesses across the world.",
      ja: "世界中のビジネスをつなぐ主要なプラットフォームになること。",
    },
  },
  {
    icon: Handshake,
    title: { mn: "Үнэт зүйлс", en: "Our Values", ja: "価値観" },
    items: [
      { mn: "Шударга байдал", en: "Integrity", ja: "誠実さ" },
      { mn: "Хамтын ажиллагаа", en: "Collaboration", ja: "協働" },
      { mn: "Инноваци", en: "Innovation", ja: "革新" },
      { mn: "Тогтвортой байдал", en: "Sustainability", ja: "持続可能性" },
    ],
  },
  {
    icon: Globe,
    title: { mn: "Бидний хандлага", en: "Our Approach", ja: "アプローチ" },
    text: {
      mn: "Хүн, санаа, боломжийг холбож, илүү сайхан ирээдүйг хамтдаа бүтээнэ.",
      en: "We connect people, ideas, and opportunities to build a better future together.",
      ja: "人、アイデア、機会をつなぎ、より良い未来を共に築きます。",
    },
  },
];

const stats: { icon: LucideIcon; value: string; label: L }[] = [
  { icon: Users, value: "120+", label: { mn: "Гишүүн", en: "Members", ja: "会員" } },
  { icon: Globe, value: "30+", label: { mn: "Улс орон", en: "Countries", ja: "カ国" } },
  { icon: Briefcase, value: "50+", label: { mn: "Төсөл", en: "Projects", ja: "プロジェクト" } },
  {
    icon: CalendarDays,
    value: "10+",
    label: { mn: "Жилийн туршлага", en: "Years of Impact", ja: "年の実績" },
  },
];

const timeline: { icon: LucideIcon; year: string; title: L; text: L }[] = [
  {
    icon: Flag,
    year: "2014",
    title: { mn: "Үүсгэн байгуулсан", en: "Established", ja: "設立" },
    text: {
      mn: "Их Хүрээ олон улсын бизнесийн хамтын ажиллагааны холбоог үүсгэн байгуулав.",
      en: "Foundation of Ikh Khuree International Business Cooperation Association.",
      ja: "イフ・フレー国際ビジネス協力協会を設立。",
    },
  },
  {
    icon: Globe,
    year: "2016",
    title: { mn: "Тэлэлт", en: "Expansion", ja: "拡大" },
    text: {
      mn: "Олон улсын сүлжээ, түншлэлээ өргөжүүлэв.",
      en: "Expanded our network and partnerships internationally.",
      ja: "国際的なネットワークとパートナーシップを拡大。",
    },
  },
  {
    icon: BarChart3,
    year: "2019",
    title: { mn: "Өсөлт", en: "Growth", ja: "成長" },
    text: {
      mn: "Бизнес, хөрөнгө оруулалтыг дэмжих томоохон санаачилгуудыг хэрэгжүүлэв.",
      en: "Launched major initiatives to support business and investment.",
      ja: "ビジネスと投資を支援する主要な取り組みを開始。",
    },
  },
  {
    icon: Users,
    year: "2023+",
    title: { mn: "Нөлөөлөл", en: "Impact", ja: "インパクト" },
    text: {
      mn: "Боломжуудыг бий болгож, тогтвортой ирээдүйг үргэлжлүүлэн бүтээж байна.",
      en: "Continuing to create opportunities and build sustainable futures.",
      ja: "機会を創出し、持続可能な未来を築き続けています。",
    },
  },
];

const history = {
  intro: {
    mn: "Монголыг дэлхийн бизнесийн нийгэмлэгтэй холбох зорилгоор үүсгэн байгуулагдсан Их Хүрээ нь өнөөдөр манлайлагч, бизнес эрхлэгч, байгууллагуудыг нэгтгэсэн итгэлтэй сүлжээ болон өсчээ.",
    en: "Founded with the vision of connecting Mongolia to the global business community, Ikh Khuree has grown into a trusted network of leaders, entrepreneurs, and organizations working together for mutual success.",
    ja: "モンゴルを世界のビジネスコミュニティとつなぐというビジョンのもとに設立されたイフ・フレーは、相互の成功のために協力するリーダー、起業家、組織の信頼されるネットワークへと成長しました。",
  },
  cta: { mn: "ДЭЛГЭРЭНГҮЙ", en: "LEARN MORE ABOUT US", ja: "もっと見る" },
};

const leadership = {
  title: {
    mn: "Даргын мэндчилгээ",
    en: "Message from the Chairman",
    ja: "会長からのメッセージ",
  },
  text: {
    mn: "Их Хүрээнд бид хамтын ажиллагааны хүчинд итгэдэг. Бид хамтдаа сорилтыг даван туулж, боломжийг нээж, ирээдүй хойч үедээ хөгжил цэцэглэлтэй ирээдүйг бүтээж чадна.",
    en: "At Ikh Khuree, we believe in the power of cooperation. Together, we can overcome challenges, unlock potential, and build a prosperous future for generations to come.",
    ja: "イフ・フレーでは、協力の力を信じています。共に課題を乗り越え、可能性を引き出し、次世代のために繁栄する未来を築くことができます。",
  },
  cta: { mn: "БҮТЭН ЗУРВАС УНШИХ", en: "READ FULL MESSAGE", ja: "全文を読む" },
  quote: {
    mn: "Бидний хүч хамтын ажиллагаанд, амжилт хамтын өсөлтөд оршино.",
    en: "Our strength lies in collaboration, our success in shared growth.",
    ja: "私たちの強みは協働にあり、成功は共有された成長にあります。",
  },
  role: { mn: "Дарга", en: "Chairman", ja: "会長" },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;

  return (
    <div>
      {/* Hero banner */}
      <section className="relative overflow-hidden border-b border-neutral-100">
        <Image
          src="/aboutus.png"
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
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              {pick(sectionLabels.about, locale)}
            </span>
            <div className="mt-4 h-0.5 w-16 bg-[#c8a44d]" />
            <h1 className="mt-8 font-serif text-4xl leading-tight text-brand-700 sm:text-5xl">
              {pick(hero.title1, locale)}
              <br />
              {pick(hero.title2, locale)}
            </h1>
            <p className="mt-6 max-w-lg leading-8 text-neutral-700">
              {pick(hero.text, locale)}
            </p>
            <Link
              href="/membership"
              className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-brand-600 transition hover:gap-4"
            >
              {pick(hero.cta, locale)}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our purpose */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle label={pick(sectionLabels.purpose, locale)} />
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-neutral-200">
            {purpose.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="flex flex-col items-center px-4 text-center">
                  <Icon className="h-10 w-10 text-brand-500" strokeWidth={1.5} />
                  <h3 className="mt-5 text-base font-bold uppercase tracking-wide text-brand-700">
                    {pick(p.title, locale)}
                  </h3>
                  {p.text && (
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {pick(p.text, locale)}
                    </p>
                  )}
                  {p.items && (
                    <ul className="mt-3 space-y-1.5 text-sm text-neutral-600">
                      {p.items.map((it, j) => (
                        <li key={j}>{pick(it, locale)}</li>
                      ))}
                    </ul>
                  )}
                </div>
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
              const Icon = s.icon;
              return (
                <div key={i} className="flex flex-col items-center px-4 text-center">
                  <Icon className="h-8 w-8 text-brand-200" strokeWidth={1.5} />
                  <span className="mt-4 font-serif text-4xl font-bold">{s.value}</span>
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
                const Icon = m.icon;
                return (
                  <div key={i} className="relative flex flex-col items-center text-center">
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

      {/* Leadership */}
      <section className="bg-brand-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle label={pick(sectionLabels.leadership, locale)} />
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
            <div className="flex items-center gap-6 lg:col-span-7">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-lg sm:h-36 sm:w-36">
                <Image src="/images/chairman.svg" alt="Chairman" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-700">
                  {pick(leadership.title, locale)}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-neutral-700">
                  {pick(leadership.text, locale)}
                </p>
                <Link
                  href="/contact"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-600"
                >
                  {pick(leadership.cta, locale)}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl bg-white p-8 shadow-sm lg:col-span-5">
              <Quote className="h-9 w-9 text-brand-200" />
              <p className="mt-4 font-serif text-xl italic leading-relaxed text-brand-800">
                {pick(leadership.quote, locale)}
              </p>
              <p className="mt-4 text-sm font-medium text-brand-500">
                — {pick(leadership.role, locale)}
              </p>
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
          light ? "text-white" : "text-brand-700"
        }`}
      >
        {label}
      </h2>
      <span className="mt-3 block h-0.5 w-16 rounded bg-[#c8a44d]" />
    </div>
  );
}
