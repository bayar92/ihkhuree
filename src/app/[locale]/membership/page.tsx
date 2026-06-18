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

type L = { mn: string; en: string; ja: string };

const labels = {
  title: { mn: "ГИШҮҮНЧЛЭЛ", en: "MEMBERSHIP", ja: "会員制度" },
  benefits: { mn: "ГИШҮҮНИЙ ДАВУУ ТАЛ", en: "MEMBER BENEFITS", ja: "会員特典" },
  types: { mn: "ГИШҮҮНЧЛЭЛИЙН ТӨРӨЛ", en: "MEMBERSHIP TYPES", ja: "会員の種類" },
  how: {
    mn: "ГИШҮҮН БОЛОХ ЗАМ",
    en: "HOW TO BECOME A MEMBER",
    ja: "会員になるには",
  },
  certificates: {
    mn: "ГИШҮҮНИЙ ГЭРЧИЛГЭЭ",
    en: "MEMBER CERTIFICATES",
    ja: "会員証",
  },
  countries: {
    mn: "ГИШҮҮН УЛСЫН ЦАР ХҮРЭЭ",
    en: "MEMBER COUNTRY REACH",
    ja: "会員国の広がり",
  },
};

const countries: { code: string; name: L }[] = [
  { code: "jp", name: { mn: "Япон", en: "Japan", ja: "日本" } },
  { code: "tw", name: { mn: "Тайвань", en: "Taiwan", ja: "台湾" } },
  { code: "us", name: { mn: "АНУ", en: "USA", ja: "アメリカ" } },
  { code: "sg", name: { mn: "Сингапур", en: "Singapore", ja: "シンガポール" } },
  { code: "it", name: { mn: "Итали", en: "Italy", ja: "イタリア" } },
  { code: "ae", name: { mn: "АНЭУ", en: "UAE", ja: "アラブ首長国連邦" } },
  { code: "kr", name: { mn: "Солонгос", en: "Korea", ja: "韓国" } },
];

const certificates = Array.from(
  { length: 15 },
  (_, i) => `/certificates/cert-${String(i + 1).padStart(2, "0")}.jpg`,
);

const heroSub = {
  mn: "Дэлхийн манлайлагч бизнес эрхлэгчид, хөрөнгө оруулагчид, салбар бүрийн нэр хүндтэй мэргэжилтнүүдийг холбосон онцгой сүлжээнд нэгдэж, үнэ цэнтэй харилцаа, тогтвортой өсөлт, шинэ боломжуудын нэг хэсэг болоорой.",
  en: "Join an exclusive network connecting global business leaders, investors, and respected professionals — become part of valuable relationships, sustainable growth, and new opportunities.",
  ja: "世界のビジネスリーダー、投資家、各分野の著名な専門家をつなぐ特別なネットワークに参加し、価値ある関係、持続可能な成長、新しい機会の一部になりましょう。",
};

const apply = { mn: "ЭЛСЭХ", en: "APPLY NOW", ja: "今すぐ申込" };
const perYear = { mn: "/ жил", en: "/ year", ja: "/ 年" };
const perMonth = { mn: "/ сар", en: "/ mo", ja: "/ 月" };

const benefits: { icon: LucideIcon; title: L; text: L }[] = [
  {
    icon: Globe,
    title: { mn: "Дэлхийн сүлжээ", en: "Global Network", ja: "グローバルネットワーク" },
    text: {
      mn: "Дэлхийн бизнес, манлайлагчидтай холбогдоно.",
      en: "Connect with businesses and leaders worldwide.",
      ja: "世界中のビジネスやリーダーとつながります。",
    },
  },
  {
    icon: Handshake,
    title: { mn: "Бизнесийн боломж", en: "Business Opportunities", ja: "ビジネスチャンス" },
    text: {
      mn: "Шинэ зах зээл, түншлэлд нэвтэрнэ.",
      en: "Access new markets and partnerships.",
      ja: "新しい市場やパートナーシップにアクセス。",
    },
  },
  {
    icon: BarChart3,
    title: { mn: "Мэдлэг ба ойлголт", en: "Knowledge & Insights", ja: "知識と洞察" },
    text: {
      mn: "Онцгой тайлан, арга хэмжээгээр мэдээлэлтэй байна.",
      en: "Stay informed with exclusive reports and events.",
      ja: "限定レポートやイベントで最新情報を入手。",
    },
  },
  {
    icon: Megaphone,
    title: { mn: "Танигдах байдал", en: "Visibility & Promotion", ja: "認知度と宣伝" },
    text: {
      mn: "Дотоод болон олон улсад брэндээ таниулна.",
      en: "Increase your brand exposure locally and internationally.",
      ja: "国内外でブランドの露出を高めます。",
    },
  },
  {
    icon: GraduationCap,
    title: { mn: "Чадавх бэхжүүлэлт", en: "Capacity Building", ja: "能力開発" },
    text: {
      mn: "Сургалт, семинар, хөгжлийн хөтөлбөрт оролцоно.",
      en: "Join training, workshops and development programs.",
      ja: "研修、ワークショップ、開発プログラムに参加。",
    },
  },
  {
    icon: Star,
    title: { mn: "Итгэлт нийгэмлэг", en: "Trusted Community", ja: "信頼されるコミュニティ" },
    text: {
      mn: "Итгэлтэй, нэр хүндтэй нийгэмлэгийн нэг хэсэг бол.",
      en: "Be part of a trusted and reputable community.",
      ja: "信頼され評判の高いコミュニティの一員に。",
    },
  },
];

const types: {
  icon: LucideIcon;
  name: L;
  price: string;
  monthly: string;
  features: L[];
  featured?: boolean;
  badge?: L;
}[] = [
  {
    icon: Crown,
    name: {
      mn: "Exclusive Member (Ноён)",
      en: "Exclusive Member (Noyon)",
      ja: "エクスクルーシブ会員（ノヨン）",
    },
    price: "$10,000",
    monthly: "$833",
    features: [
      {
        mn: "Клубын хүндэт зөвлөх статустай болох",
        en: "Honorary advisor status within the club",
        ja: "クラブ内の名誉アドバイザーステータス",
      },
      {
        mn: "Стратегийн шийдвэр гаргах түвшинд оролцох",
        en: "Participate at the strategic decision-making level",
        ja: "戦略的意思決定レベルへの参加",
      },
      {
        mn: "Клубын нэрийн өмнөөс олон улсын хамтын ажиллагаа хөгжүүлэх",
        en: "Develop international cooperation on behalf of the club",
        ja: "クラブ名義での国際協力の推進",
      },
      {
        mn: "Онцгой хаалттай хөрөнгө оруулалтын боломжуудад нэвтрэх",
        en: "Access to exclusive closed investment opportunities",
        ja: "特別な限定投資機会へのアクセス",
      },
      {
        mn: "Насан туршийн VIP гишүүнчлэлийн статус",
        en: "Lifetime VIP membership status",
        ja: "生涯VIP会員ステータス",
      },
    ],
  },
  {
    icon: Gem,
    name: {
      mn: "Elite ангилал (Тайж)",
      en: "Elite Class (Taij)",
      ja: "エリートクラス（タイジ）",
    },
    price: "$5,000",
    monthly: "$417",
    featured: true,
    badge: { mn: "ЭРЭЛТТЭЙ", en: "POPULAR", ja: "人気" },
    features: [
      {
        mn: "Клубыг төлөөлөн албан ёсны арга хэмжээнд оролцох",
        en: "Represent the club at official events",
        ja: "公式イベントでのクラブ代表",
      },
      {
        mn: "Олон улсын түнш байгууллагуудтай шууд холбогдох",
        en: "Direct connection with international partner organizations",
        ja: "国際パートナー組織との直接連携",
      },
      {
        mn: "Бизнесийн зөвлөх үйлчилгээ авах",
        en: "Receive business advisory services",
        ja: "ビジネスアドバイザリーサービス",
      },
      {
        mn: "Хамтарсан төсөл санаачлах, удирдах эрх",
        en: "Right to initiate and lead joint projects",
        ja: "共同プロジェクトの企画・主導権",
      },
      {
        mn: "VIP зочдыг урих тусгай эрх",
        en: "Special privilege to invite VIP guests",
        ja: "VIPゲスト招待の特別権限",
      },
    ],
  },
  {
    icon: Award,
    name: {
      mn: "Senior Member (Ван)",
      en: "Senior Member (Van)",
      ja: "シニア会員（ヴァン）",
    },
    price: "$1,500",
    monthly: "$125",
    features: [
      {
        mn: "Хаалттай бизнес форумд оролцох",
        en: "Access to closed business forums",
        ja: "クローズドビジネスフォーラムへの参加",
      },
      {
        mn: "Хөрөнгө оруулагчидтай холбогдох боломж",
        en: "Opportunities to connect with investors",
        ja: "投資家との接続機会",
      },
      {
        mn: "Компанийн танилцуулгыг клубын сувгаар түгээх",
        en: "Promote your company profile through club channels",
        ja: "クラブチャネルでの企業紹介",
      },
      {
        mn: "Тусгай сургалт, мастер класст үнэ төлбөргүй хамрагдах",
        en: "Free access to exclusive training and masterclasses",
        ja: "特別研修・マスタークラスへの無料参加",
      },
      {
        mn: "Олон улсын арга хэмжээний давуу эрх",
        en: "Priority access to international events",
        ja: "国際イベントへの優先参加",
      },
    ],
  },
  {
    icon: Shield,
    name: {
      mn: "Middle Member (Засагт)",
      en: "Middle Member (Zasagt)",
      ja: "ミドル会員（ザサグト）",
    },
    price: "$1,000",
    monthly: "$83",
    features: [
      {
        mn: "Хаалттай Middle Member Circle-д гишүүнээр элсэх",
        en: "Join the closed Middle Member Circle",
        ja: "クローズドMiddle Member Circleへの参加",
      },
      {
        mn: "Дээд түвшний хөрөнгө оруулагчидтай уулзах боломж",
        en: "Meet with top-tier investors",
        ja: "トップレベルの投資家との面会",
      },
      {
        mn: "Стратегийн зөвлөхүүдтэй ганцаарчилсан уулзалт",
        en: "One-on-one meetings with strategic advisors",
        ja: "戦略アドバイザーとの個別面談",
      },
      {
        mn: "Клубын үйл ажиллагааны бодлогод санал өгөх эрх",
        en: "Right to contribute to club policy decisions",
        ja: "クラブ運営方針への意見提出権",
      },
      {
        mn: "Олон улсын дээд түвшний төлөөлөгчдийн арга хэмжээнд тусгай урилга",
        en: "Special invitations to high-level international events",
        ja: "国際ハイレベルイベントへの特別招待",
      },
    ],
  },
  {
    icon: User,
    name: {
      mn: "Member (Хан)",
      en: "Member (Khan)",
      ja: "会員（ハン）",
    },
    price: "$500",
    monthly: "$41",
    features: [
      {
        mn: "Клубын албан ёсны гишүүнчлэл",
        en: "Official club membership",
        ja: "クラブの正式会員資格",
      },
      {
        mn: "Сар тутмын уулзалт, арга хэмжээнд оролцох эрх",
        en: "Access to monthly meetings and events",
        ja: "月例会・イベントへの参加権",
      },
      {
        mn: "Гишүүдийн сүлжээнд нэвтрэх боломж",
        en: "Access to the members' network",
        ja: "会員ネットワークへのアクセス",
      },
      {
        mn: "Мэдээллийн товхимол, бизнесийн мэдээлэл авах",
        en: "Receive newsletters and business insights",
        ja: "ニュースレターとビジネス情報の受信",
      },
      {
        mn: "Клубын онлайн платформ ашиглах эрх",
        en: "Access to the club's online platform",
        ja: "クラブオンラインプラットフォームの利用",
      },
    ],
  },
];

const steps: { icon: LucideIcon; no: string; title: L; text: L }[] = [
  {
    icon: FileText,
    no: "01",
    title: { mn: "ӨРГӨДӨЛ ГАРГАХ", en: "SUBMIT APPLICATION", ja: "申請を提出" },
    text: {
      mn: "Гишүүнчлэлийн өргөдлийн маягтыг бөглөнө.",
      en: "Fill out the membership application form.",
      ja: "会員申請フォームに記入します。",
    },
  },
  {
    icon: Search,
    no: "02",
    title: { mn: "ХЯНАЛТ", en: "REVIEW PROCESS", ja: "審査" },
    text: {
      mn: "Манай баг таны өргөдлийг хянана.",
      en: "Our team will review your application.",
      ja: "当協会のチームが申請を審査します。",
    },
  },
  {
    icon: CircleCheck,
    no: "03",
    title: { mn: "БАТАЛГААЖУУЛАЛТ", en: "APPROVAL", ja: "承認" },
    text: {
      mn: "Гишүүнчлэлийн баталгаажуулалт хүлээн авна.",
      en: "Receive confirmation of your membership.",
      ja: "会員資格の確認を受け取ります。",
    },
  },
  {
    icon: Users,
    no: "04",
    title: { mn: "ХОЛБОГДОХ", en: "GET CONNECTED", ja: "つながる" },
    text: {
      mn: "Дэлхийн сүлжээтэй холбогдож өсч эхэлнэ.",
      en: "Start connecting and grow with our global network.",
      ja: "グローバルネットワークとつながり成長を始めます。",
    },
  },
];

const ctaText = {
  mn: "Их Хүрээ олон улсын бизнесийн хамтын ажиллагааны холбоонд өнөөдөр нэгдэж, шинэ боломжуудыг нээ.",
  en: "Join Ikh Khuree International Business Cooperation Association today and unlock new opportunities.",
  ja: "本日イフ・フレー国際ビジネス協力協会に参加し、新たな機会を切り開きましょう。",
};
const ctaBtn = { mn: "ОДОО НЭГДЭХ", en: "JOIN US NOW", ja: "今すぐ参加" };

export default async function MembershipPage({
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
          src="/membership.png"
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
              const Icon = b.icon;
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
              const Icon = tp.icon;
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
                  {tp.badge && (
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
              const Icon = s.icon;
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
