import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ---- Admin user ----
  const email = process.env.ADMIN_EMAIL ?? "admin@ikhkhuree.mn";
  const password = process.env.ADMIN_PASSWORD ?? "Admin12345!";
  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { password: hashed, name: "Administrator" },
    create: { email, name: "Administrator", password: hashed, role: "admin" },
  });
  console.log(`✔ admin user: ${email}`);

  // ---- Hero ----
  await prisma.hero.deleteMany();
  await prisma.hero.create({
    data: {
      title: { mn: "Их Хүрээ", en: "Ikh Khuree", ja: "イフ・フレー" },
      subtitle: {
        mn: "Олон улсын бизнесс хамтын ажиллагааны холбоо",
        en: "International business cooperation association",
        ja: "国際ビジネス協力協会",
      },
      tagline: {
        mn: "Их хүрээ олон улсын бизнесс хамтын ажиллагааны холбоо",
        en: "Connecting businesses across the world for sustainable growth.",
        ja: "持続可能な成長のために世界中のビジネスをつなぎます。",
      },
      ctaLabel: { mn: "Дэлгэрэнгүй", en: "Learn More", ja: "詳細を見る" },
      ctaHref: "/about",
    },
  });
  console.log("✔ hero");

  // ---- Features ----
  await prisma.feature.deleteMany();
  await prisma.feature.createMany({
    data: [
      {
        icon: "globe",
        order: 1,
        href: "/about",
        title: { mn: "Бидний эрхэм зорилго", en: "Our Mission", ja: "私たちの使命" },
        body: {
          mn: "Олон улсын бизнесийн хамтын ажиллагаа болон тогтвортой хөгжлийг дэмжих.",
          en: "To promote international business cooperation and sustainable development.",
          ja: "国際ビジネス協力と持続可能な発展を促進すること。",
        },
      },
      {
        icon: "users",
        order: 2,
        href: "/about",
        title: { mn: "Бидний алсын хараа", en: "Our Vision", ja: "私たちのビジョン" },
        body: {
          mn: "Дэлхийн бизнесүүдийг холбосон тэргүүлэгч платформ болох.",
          en: "To be a leading platform connecting businesses across the world.",
          ja: "世界中のビジネスをつなぐ主要なプラットフォームになること。",
        },
      },
      {
        icon: "handshake",
        order: 3,
        href: "/membership",
        title: { mn: "Гишүүнчлэл", en: "Membership", ja: "会員" },
        body: {
          mn: "Дэлхийн манлайлагч, бизнес эрхлэгч, мэргэжилтнүүдийн сүлжээнд нэгдээрэй.",
          en: "Join our network of global leaders, entrepreneurs, and industry experts.",
          ja: "世界のリーダー、起業家、専門家のネットワークに参加しましょう。",
        },
      },
      {
        icon: "growth",
        order: 4,
        href: "/services",
        title: { mn: "Бидний үйлчилгээ", en: "Our Services", ja: "私たちのサービス" },
        body: {
          mn: "Зөвлөгөө, сүлжээ, мэдээлэл, төслийн дэмжлэгээр таны бизнесийг хөгжүүлнэ.",
          en: "We provide consulting, networking, information, and project support to help your business grow.",
          ja: "コンサルティング、ネットワーキング、情報、プロジェクト支援を提供します。",
        },
      },
    ],
  });
  console.log("✔ features");

  // ---- Focus areas ----
  await prisma.focusArea.deleteMany();
  await prisma.focusArea.createMany({
    data: [
      {
        icon: "trade",
        order: 1,
        label: { mn: "Худалдаа ба хөрөнгө оруулалт", en: "Trade & Investment", ja: "貿易と投資" },
      },
      {
        icon: "innovation",
        order: 2,
        label: { mn: "Инноваци ба технологи", en: "Innovation & Technology", ja: "イノベーションと技術" },
      },
      {
        icon: "sustainability",
        order: 3,
        label: { mn: "Тогтвортой байдал", en: "Sustainability", ja: "持続可能性" },
      },
      {
        icon: "education",
        order: 4,
        label: { mn: "Боловсрол ба чадавхжуулалт", en: "Education & Capacity Building", ja: "教育と能力開発" },
      },
      {
        icon: "exchange",
        order: 5,
        label: { mn: "Соёлын солилцоо", en: "Cultural Exchange", ja: "文化交流" },
      },
    ],
  });
  console.log("✔ focus areas");

  // ---- Pages ----
  const pages = [
    {
      key: "about",
      title: { mn: "Бидний тухай", en: "About Us", ja: "私たちについて" },
      intro: {
        mn: "Их Хүрээ нь олон улсын бизнесийн хамтын ажиллагааг дэмжих зорилготой холбоо юм.",
        en: "Ikh Khuree is an association dedicated to advancing international business cooperation.",
        ja: "イフ・フレーは国際ビジネス協力の促進を目的とした協会です。",
      },
      body: [
        {
          heading: { mn: "Эрхэм зорилго", en: "Mission", ja: "使命" },
          text: {
            mn: "Бид олон улсын бизнесийн хамтын ажиллагаа, тогтвортой хөгжлийг дэмжиж, гишүүддээ үнэ цэнэ бүтээдэг.",
            en: "We promote international business cooperation and sustainable development, creating value for our members.",
            ja: "私たちは国際ビジネス協力と持続可能な発展を促進し、会員に価値を創造します。",
          },
        },
        {
          heading: { mn: "Алсын хараа", en: "Vision", ja: "ビジョン" },
          text: {
            mn: "Дэлхийн бизнесүүдийг холбосон тэргүүлэгч платформ болох.",
            en: "To be a leading platform connecting businesses across the world.",
            ja: "世界中のビジネスをつなぐ主要なプラットフォームになること。",
          },
        },
      ],
    },
    {
      key: "membership",
      title: { mn: "Гишүүнчлэл", en: "Membership", ja: "会員" },
      intro: {
        mn: "Дэлхийн манлайлагч, бизнес эрхлэгч, мэргэжилтнүүдийн сүлжээнд нэгдээрэй.",
        en: "Join our network of global leaders, entrepreneurs, and industry experts.",
        ja: "世界のリーダー、起業家、専門家のネットワークに参加しましょう。",
      },
      body: [
        {
          heading: { mn: "Гишүүний давуу тал", en: "Member Benefits", ja: "会員特典" },
          text: {
            mn: "Олон улсын арга хэмжээ, мэдээлэл, түншлэлийн боломжид нэвтрэх.",
            en: "Access to international events, information, and partnership opportunities.",
            ja: "国際イベント、情報、パートナーシップの機会へのアクセス。",
          },
        },
      ],
    },
    {
      key: "services",
      title: { mn: "Үйлчилгээ", en: "Services", ja: "サービス" },
      intro: {
        mn: "Зөвлөгөө, сүлжээ, мэдээлэл, төслийн дэмжлэг.",
        en: "Consulting, networking, information, and project support.",
        ja: "コンサルティング、ネットワーキング、情報、プロジェクト支援。",
      },
      body: [
        {
          heading: { mn: "Зөвлөх үйлчилгээ", en: "Consulting", ja: "コンサルティング" },
          text: {
            mn: "Бизнесийн стратеги, зах зээлд нэвтрэх зөвлөгөө.",
            en: "Business strategy and market-entry advisory.",
            ja: "ビジネス戦略と市場参入のアドバイザリー。",
          },
        },
      ],
    },
    {
      key: "contact",
      title: { mn: "Холбоо барих", en: "Contact Us", ja: "お問い合わせ" },
      intro: {
        mn: "Бидэнтэй холбогдоорой.",
        en: "Get in touch with us.",
        ja: "お気軽にお問い合わせください。",
      },
      body: [],
    },
  ];
  for (const p of pages) {
    await prisma.page.upsert({
      where: { key: p.key },
      update: { title: p.title, intro: p.intro, body: p.body },
      create: p,
    });
  }
  console.log("✔ pages");

  // ---- Settings (contact) ----
  await prisma.setting.upsert({
    where: { key: "contact" },
    update: {},
    create: {
      key: "contact",
      value: {
        address: {
          mn: "Улаанбаатар хот, Монгол улс",
          en: "Ulaanbaatar, Mongolia",
          ja: "モンゴル国ウランバートル市",
        },
        phone: "+976 7000 0000",
        email: "info@ikhkhuree.mn",
      },
    },
  });
  console.log("✔ settings");

  // ---- News ----
  await prisma.news.deleteMany();
  await prisma.news.createMany({
    data: [
      {
        slug: "annual-business-forum-2026",
        published: true,
        publishedAt: new Date("2026-05-10"),
        title: {
          mn: "2026 оны жилийн бизнес форум",
          en: "Annual Business Forum 2026",
          ja: "2026年年次ビジネスフォーラム",
        },
        excerpt: {
          mn: "Олон улсын бизнес эрхлэгчдийг нэгтгэсэн томоохон форум боллоо.",
          en: "A major forum bringing together international entrepreneurs.",
          ja: "国際的な起業家が集まる大規模なフォーラムが開催されました。",
        },
        content: {
          mn: "Их Хүрээ холбооноос зохион байгуулсан жилийн бизнес форумд дэлхийн 20 гаруй орны төлөөлөл оролцлоо. Форумаар худалдаа, хөрөнгө оруулалт, инновацийн чиглэлээр хэлэлцүүлэг өрнүүлэв.",
          en: "Over 20 countries were represented at the Ikh Khuree annual business forum, with discussions on trade, investment, and innovation.",
          ja: "イフ・フレー協会主催の年次ビジネスフォーラムには20か国以上が参加し、貿易、投資、イノベーションについて議論しました。",
        },
      },
      {
        slug: "new-partnership-japan",
        published: true,
        publishedAt: new Date("2026-04-22"),
        title: {
          mn: "Япон улстай шинэ түншлэл",
          en: "New Partnership with Japan",
          ja: "日本との新しいパートナーシップ",
        },
        excerpt: {
          mn: "Япон улсын бизнесийн байгууллагуудтай хамтын ажиллагааны санамж бичиг байгууллаа.",
          en: "Signed a memorandum of cooperation with Japanese business organizations.",
          ja: "日本のビジネス団体と協力覚書を締結しました。",
        },
        content: {
          mn: "Их Хүрээ холбоо Япон улсын бизнесийн нэгдэлтэй хамтран ажиллах санамж бичигт гарын үсэг зурлаа. Энэ нь хоёр орны бизнесийн харилцааг шинэ түвшинд гаргах юм.",
          en: "Ikh Khuree signed a memorandum with a Japanese business federation, elevating bilateral business relations to a new level.",
          ja: "イフ・フレーは日本のビジネス連合と覚書に署名し、二国間のビジネス関係を新たなレベルに引き上げました。",
        },
      },
      {
        slug: "sustainability-initiative",
        published: true,
        publishedAt: new Date("2026-03-15"),
        title: {
          mn: "Тогтвортой хөгжлийн санаачилга",
          en: "Sustainability Initiative",
          ja: "持続可能性イニシアチブ",
        },
        excerpt: {
          mn: "Ногоон эдийн засгийг дэмжих шинэ хөтөлбөр эхлүүллээ.",
          en: "Launched a new program supporting the green economy.",
          ja: "グリーン経済を支援する新しいプログラムを開始しました。",
        },
        content: {
          mn: "Холбоо нь гишүүн байгууллагуудынхаа тогтвортой байдлыг дэмжих зорилготой шинэ хөтөлбөрийг танилцууллаа.",
          en: "The association introduced a new program aimed at supporting the sustainability of its member organizations.",
          ja: "協会は会員組織の持続可能性を支援する新しいプログラムを紹介しました。",
        },
      },
    ],
  });
  console.log("✔ news");

  // ---- Events ----
  await prisma.event.deleteMany();
  await prisma.event.createMany({
    data: [
      {
        slug: "investment-summit-2026",
        startsAt: new Date("2026-07-15T09:00:00Z"),
        title: {
          mn: "Хөрөнгө оруулалтын чуулга уулзалт 2026",
          en: "Investment Summit 2026",
          ja: "投資サミット2026",
        },
        location: { mn: "Улаанбаатар", en: "Ulaanbaatar", ja: "ウランバートル" },
        description: {
          mn: "Хөрөнгө оруулагчид болон бизнес эрхлэгчдийн уулзалт.",
          en: "A gathering of investors and entrepreneurs.",
          ja: "投資家と起業家の集まり。",
        },
      },
      {
        slug: "innovation-workshop",
        startsAt: new Date("2026-08-05T13:00:00Z"),
        title: {
          mn: "Инновацийн семинар",
          en: "Innovation Workshop",
          ja: "イノベーションワークショップ",
        },
        location: { mn: "Цахим", en: "Online", ja: "オンライン" },
        description: {
          mn: "Технологи, инновацийн чиглэлээр мэдлэг солилцох семинар.",
          en: "A workshop to exchange knowledge in technology and innovation.",
          ja: "技術とイノベーションの知識を交換するワークショップ。",
        },
      },
    ],
  });
  console.log("✔ events");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
