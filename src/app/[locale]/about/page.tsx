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

type L = { mn: string; en: string; ja: string };

const sectionLabels = {
  about: { mn: 'БИДНИЙ ТУХАЙ', en: 'ABOUT US', ja: '私たちについて' },
  purpose: { mn: 'БИДНИЙ ЗОРИЛГО', en: 'OUR PURPOSE', ja: '私たちの目的' },
  numbers: {
    mn: 'ИХ ХҮРЭЭ ТООН ДЭЭР',
    en: 'IKH KHUREE IN NUMBERS',
    ja: '数字で見るイフ・フレー',
  },
  history: { mn: 'БИДНИЙ ТҮҮХ', en: 'OUR HISTORY', ja: '私たちの歩み' },
  leadership: { mn: 'УДИРДЛАГА', en: 'LEADERSHIP', ja: 'リーダーシップ' },
};

const hero = {
  title1: {
    mn: 'Хил дамнан холбож,',
    en: 'Bridging borders.',
    ja: '国境を越えてつなぎ、',
  },
  title2: {
    mn: 'хамтын ажиллагааг бэхжүүлнэ.',
    en: 'Empowering cooperation.',
    ja: '協力を強化する。',
  },
  text: {
    mn: 'Их Хүрээ олон улсын бизнесийн хамтын ажиллагааны холбоо нь олон улсын хамтын ажиллагаа, мэдлэг солилцоо, тогтвортой хөгжлийг дэмжих зорилготой ашгийн бус байгууллага юм.',
    en: 'Ikh Khuree International Business Cooperation Association is a non-profit organization dedicated to fostering international collaboration, knowledge exchange, and sustainable growth.',
    ja: 'イフ・フレー国際ビジネス協力協会は、国際協力、知識交換、持続可能な成長を促進する非営利団体です。',
  },
  cta: { mn: 'ДЭЛГЭРЭНГҮЙ', en: 'READ MORE', ja: '詳細を見る' },
};

const purpose: {
  icon: LucideIcon;
  title: L;
  text?: L;
  items?: L[];
}[] = [
  {
    icon: Target,
    title: { mn: 'Эрхэм зорилго', en: 'Our Mission', ja: '使命' },
    text: {
      mn: 'Бид олон улсын бизнесийн хамтын ажиллагааг шинэ түвшинд хүргэж, байгууллага, хөрөнгө оруулагчид болон бизнес эрхлэгчдийг холбох замаар урт хугацааны үнэ цэнэ бүхий түншлэлийг бий болгож, тогтвортой өсөлт хөгжил, инноваци, эдийн засгийн үр өгөөжийг дэмжихийг эрхэмлэдэг.',
      en: 'We are committed to elevating international business cooperation to a new level by connecting organizations, investors, and entrepreneurs — building long-term, value-creating partnerships and supporting sustainable growth, innovation, and economic prosperity.',
      ja: '国際ビジネス協力を新たなレベルに引き上げ、組織、投資家、起業家をつなぐことで、長期的な価値を創造するパートナーシップを構築し、持続可能な成長、イノベーション、経済的繁栄を支援することを使命としています。',
    },
  },
  {
    icon: Eye,
    title: { mn: 'Алсын хараа', en: 'Our Vision', ja: 'ビジョン' },
    text: {
      mn: 'Бизнес, хөрөнгө оруулагчид, байгууллагуудыг дэлхийн хэмжээнд холбосон найдвартай, үнэ цэн бүтээдэг тэргүүлэгч платформ болж, олон улсын хамтын ажиллагаа болон тогтвортой хөгжлийн шинэ жишгийг тогтоох.',
      en: 'To become a trusted, value-creating leading platform that connects businesses, investors, and organizations worldwide — setting new standards for international cooperation and sustainable development.',
      ja: 'ビジネス、投資家、組織を世界規模でつなぐ信頼できる価値創造の主要プラットフォームとなり、国際協力と持続可能な発展の新しい基準を確立すること。',
    },
  },
  {
    icon: Handshake,
    title: { mn: 'Үнэт зүйлс', en: 'Our Values', ja: '価値観' },
    items: [
      {
        mn: 'Итгэлцэл, ил тод байдал, хариуцлага',
        en: 'Trust, transparency, and accountability',
        ja: '信頼、透明性、責任',
      },
      {
        mn: 'Холбоо, түншлэл, хамтын өсөлт',
        en: 'Connection, partnership, and shared growth',
        ja: 'つながり、パートナーシップ、共有成長',
      },
      {
        mn: 'Шинэ санаа, шинэ боломж, шинэ шийдэл',
        en: 'New ideas, new opportunities, new solutions',
        ja: '新しいアイデア、新しい機会、新しい解決策',
      },
      {
        mn: 'Урт хугацааны үнэ цэнэ, хариуцлагатай хөгжил',
        en: 'Long-term value and responsible development',
        ja: '長期的な価値と責任ある発展',
      },
    ],
  },
  {
    icon: Globe,
    title: { mn: 'Бидний хандлага', en: 'Our Approach', ja: 'アプローチ' },
    text: {
      mn: 'Бид бизнесийн харилцааг зөвхөн танилын хүрээ бус, харин итгэлцэлд суурилсан урт хугацааны түншлэл гэж үздэг. Тиймээс бид гишүүддээ чанартай сүлжээ, үнэ цэнтэй мэдээлэл, мэргэжлийн зөвлөгөө, хамтын ажиллагааны бодит боломжийг бий болгоход төвлөрдөг.',
      en: 'We view business relationships not merely as networks of acquaintances, but as long-term partnerships built on trust. Therefore, we focus on providing our members with quality networks, valuable information, professional advisory, and tangible cooperation opportunities.',
      ja: '私たちはビジネス関係を単なる知人のネットワークではなく、信頼に基づく長期的なパートナーシップと考えています。そのため、会員に質の高いネットワーク、価値ある情報、専門的な助言、具体的な協力の機会を提供することに注力しています。',
    },
  },
];

const stats: { icon: LucideIcon; value: string; label: L }[] = [
  {
    icon: Users,
    value: '120+',
    label: { mn: 'Гишүүн', en: 'Members', ja: '会員' },
  },
  {
    icon: Globe,
    value: '30+',
    label: { mn: 'Улс орон', en: 'Countries', ja: 'カ国' },
  },
  {
    icon: Briefcase,
    value: '50+',
    label: { mn: 'Төсөл', en: 'Projects', ja: 'プロジェクト' },
  },
  {
    icon: CalendarDays,
    value: '10+',
    label: { mn: 'Жилийн туршлага', en: 'Years of Impact', ja: '年の実績' },
  },
];

const timeline: { icon: LucideIcon; year: string; title: L; text: L }[] = [
  {
    icon: Flag,
    year: '2014',
    title: { mn: 'Үүсгэн байгуулсан', en: 'Established', ja: '設立' },
    text: {
      mn: 'Их Хүрээ олон улсын бизнесийн хамтын ажиллагааны холбоог үүсгэн байгуулав.',
      en: 'Foundation of Ikh Khuree International Business Cooperation Association.',
      ja: 'イフ・フレー国際ビジネス協力協会を設立。',
    },
  },
  {
    icon: Globe,
    year: '2016',
    title: { mn: 'Тэлэлт', en: 'Expansion', ja: '拡大' },
    text: {
      mn: 'Олон улсын сүлжээ, түншлэлээ өргөжүүлэв.',
      en: 'Expanded our network and partnerships internationally.',
      ja: '国際的なネットワークとパートナーシップを拡大。',
    },
  },
  {
    icon: BarChart3,
    year: '2019',
    title: { mn: 'Өсөлт', en: 'Growth', ja: '成長' },
    text: {
      mn: 'Бизнес, хөрөнгө оруулалтыг дэмжих томоохон санаачилгуудыг хэрэгжүүлэв.',
      en: 'Launched major initiatives to support business and investment.',
      ja: 'ビジネスと投資を支援する主要な取り組みを開始。',
    },
  },
  {
    icon: Users,
    year: '2023+',
    title: { mn: 'Нөлөөлөл', en: 'Impact', ja: 'インパクト' },
    text: {
      mn: 'Боломжуудыг бий болгож, тогтвортой ирээдүйг үргэлжлүүлэн бүтээж байна.',
      en: 'Continuing to create opportunities and build sustainable futures.',
      ja: '機会を創出し、持続可能な未来を築き続けています。',
    },
  },
];

const history = {
  intro: {
    mn: 'Монголыг дэлхийн бизнесийн нийгэмлэгтэй холбох зорилгоор үүсгэн байгуулагдсан Их Хүрээ нь өнөөдөр манлайлагч, бизнес эрхлэгч, байгууллагуудыг нэгтгэсэн итгэлтэй сүлжээ болон өсчээ.',
    en: 'Founded with the vision of connecting Mongolia to the global business community, Ikh Khuree has grown into a trusted network of leaders, entrepreneurs, and organizations working together for mutual success.',
    ja: 'モンゴルを世界のビジネスコミュニティとつなぐというビジョンのもとに設立されたイフ・フレーは、相互の成功のために協力するリーダー、起業家、組織の信頼されるネットワークへと成長しました。',
  },
  cta: { mn: 'ДЭЛГЭРЭНГҮЙ', en: 'LEARN MORE ABOUT US', ja: 'もっと見る' },
};

const leadership = {
  title: {
    mn: 'Холбооны ерөнхийлөгчийн мэндчилгээ',
    en: 'Message from the Federation President',
    ja: '連盟会長からのメッセージ',
  },
  text: {
    mn: '"Их Хүрээ" холбооны хувьд бид хамтын ажиллагааны хүч бол тогтвортой хөгжил, урт хугацааны амжилтын үндэс гэдэгт гүнээ итгэдэг. Бид хамтдаа сорилтуудыг боломж болгон хувиргаж, шинэ үнэ цэнийг бүтээж, олон улсын хөгжил дэвшилд хувь нэмэр оруулан, ирээдүй хойч үедээ илүү хөгжин цэцэглэсэн ирээдүйг цогцлоохыг зорьж байна.\n\nТа бүхэн энэхүү эрхэм зорилго дор нэгдэж, хамтын өсөлт, харилцан ашигтай түншлэлийн шинэ ирээдүйг хамтдаа бүтээе.',
    en: 'At the Ikh Khuree association, we deeply believe that the power of cooperation is the foundation of sustainable development and long-term success. Together, we strive to turn challenges into opportunities, create new value, contribute to international progress, and build an ever more prosperous future for generations to come.\n\nWe invite you to join us under this mission and together build a new future of shared growth and mutually beneficial partnership.',
    ja: '「イフ・フレー」協会において、私たちは協力の力こそが持続可能な発展と長期的な成功の礎であると深く信じています。私たちは共に課題を機会へと変え、新たな価値を創造し、国際的な発展に貢献し、次世代のためにより一層繁栄した未来を築くことを目指しています。\n\n皆様もこの崇高な使命のもとに集い、共に成長し、相互に有益なパートナーシップの新たな未来を共に築いてまいりましょう。',
  },
  signoff: { mn: 'Хүндэтгэсэн:', en: 'Sincerely,', ja: '敬具' },
  position: {
    mn: '"Их Хүрээ" олон улсын бизнесийн хамтын ажиллагааны холбооны Ерөнхийлөгч',
    en: 'President, "Ikh Khuree" International Business Cooperation Association',
    ja: '「イフ・フレー」国際ビジネス協力連盟 会長',
  },
  name: {
    mn: 'Сорогдогийн Жаргалсайханы Билгүүн',
    en: 'Sorogdogiin Jargalsaikhany Bilguun',
    ja: 'ソログドギーン・ジャルガルサイハニー・ビルグーン',
  },
  date: '2026.05.05',
  role: { mn: 'Ерөнхийлөгч', en: 'President', ja: '会長' },
  // cta: { mn: 'БҮТЭН ЗУРВАС УНШИХ', en: 'READ FULL MESSAGE', ja: '全文を読む' },
  // quote: {
  //   mn: 'Бидний хүч хамтын ажиллагаанд, амжилт хамтын өсөлтөд оршино.',
  //   en: 'Our strength lies in collaboration, our success in shared growth.',
  //   ja: '私たちの強みは協働にあり、成功は共有された成長にあります。',
  // },
  // role: { mn: 'Ерөнхийлөгч', en: 'President', ja: '会長' },
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
          src="/about.jpg"
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
                    src="/bilguun.webp"
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
      <section className="bg-gradient-to-b from-white to-brand-50/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle label={pick(sectionLabels.purpose, locale)} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {purpose.map((p, i) => {
              const Icon = p.icon;
              return (
                <article
                  key={i}
                  className="flex flex-col rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50">
                      <Icon
                        className="h-6 w-6 text-brand-600"
                        strokeWidth={1.5}
                      />
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
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center px-4 text-center"
                >
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
                const Icon = m.icon;
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
