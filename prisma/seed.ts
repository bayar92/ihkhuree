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
          mn: "Олон улсын бизнесийн хамтын ажиллагааг өргөжүүлж, хөрөнгө оруулалт, худалдаа, инноваци болон мэдлэг туршлагын солилцоог дэмжих замаар харилцан ашигтай түншлэлийг бий болгон, тогтвортой эдийн засаг, нийгмийн хөгжилд бодит хувь нэмэр оруулах.",
          en: "We expand international business cooperation by supporting investment, trade, innovation, and knowledge exchange — building mutually beneficial partnerships that contribute to sustainable economic and social development.",
          ja: "国際ビジネス協力を拡大し、投資、貿易、イノベーション、知識・経験の交流を支援することで、相互に有益なパートナーシップを構築し、持続可能な経済・社会発展に実質的な貢献をします。",
        },
      },
      {
        icon: "users",
        order: 2,
        href: "/about",
        title: { mn: "Бидний алсын хараа", en: "Our Vision", ja: "私たちのビジョン" },
        body: {
          mn: "Дэлхийн бизнес, хөрөнгө оруулалт, инновацын экосистемийг холбосон тэргүүлэгч платформ болж, олон улсын хамтын ажиллагаа, тогтвортой хөгжил, харилцан өсөлтийн шинэ боломжуудыг бий болгох.",
          en: "To become a leading platform connecting the global business, investment, and innovation ecosystem — creating new opportunities for international cooperation, sustainable development, and mutual growth.",
          ja: "世界のビジネス、投資、イノベーションのエコシステムをつなぐ主要なプラットフォームとなり、国際協力、持続可能な発展、相互成長の新たな機会を創出します。",
        },
      },
      {
        icon: "handshake",
        order: 3,
        href: "/membership",
        title: { mn: "Гишүүнчлэл", en: "Membership", ja: "会員" },
        body: {
          mn: "Дэлхийн манлайлагч бизнес эрхлэгчид, хөрөнгө оруулагчид, салбар бүрийн нэр хүндтэй мэргэжилтнүүдийг холбосон онцгой сүлжээнд нэгдэж, үнэ цэнтэй харилцаа, тогтвортой өсөлт, шинэ боломжуудын нэг хэсэг болоорой.",
          en: "Join an exclusive network connecting global business leaders, investors, and respected professionals across industries — become part of valuable relationships, sustainable growth, and new opportunities.",
          ja: "世界のビジネスリーダー、投資家、各分野の著名な専門家をつなぐ特別なネットワークに参加し、価値ある関係、持続可能な成長、新しい機会の一部になりましょう。",
        },
      },
      {
        icon: "growth",
        order: 4,
        href: "/services",
        title: { mn: "Зөвлөх үйлчилгээ", en: "Consulting Services", ja: "コンサルティング" },
        body: {
          mn: "Бид гишүүд болон түнш байгууллагууддаа бизнесийн өсөлт, хөрөнгө оруулалт, олон улсын хамтын ажиллагааг дэмжих зорилгоор мэргэжлийн зөвлөх үйлчилгээг үзүүлдэг.",
          en: "We provide professional advisory services to our members and partner organizations to support business growth, investment, and international cooperation.",
          ja: "会員およびパートナー組織に対し、ビジネス成長、投資、国際協力を支援する専門的なコンサルティングサービスを提供しています。",
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
            mn: "Бид олон улсын бизнесийн хамтын ажиллагааг шинэ түвшинд хүргэж, байгууллага, хөрөнгө оруулагчид болон бизнес эрхлэгчдийг холбох замаар урт хугацааны үнэ цэнэ бүхий түншлэлийг бий болгож, тогтвортой өсөлт хөгжил, инноваци, эдийн засгийн үр өгөөжийг дэмжихийг эрхэмлэдэг.",
            en: "We are committed to elevating international business cooperation to a new level by connecting organizations, investors, and entrepreneurs — building long-term, value-creating partnerships and supporting sustainable growth, innovation, and economic prosperity.",
            ja: "国際ビジネス協力を新たなレベルに引き上げ、組織、投資家、起業家をつなぐことで、長期的な価値を創造するパートナーシップを構築し、持続可能な成長、イノベーション、経済的繁栄を支援することを使命としています。",
          },
        },
        {
          heading: { mn: "Алсын хараа", en: "Vision", ja: "ビジョン" },
          text: {
            mn: "Бизнес, хөрөнгө оруулагчид, байгууллагуудыг дэлхийн хэмжээнд холбосон найдвартай, үнэ цэн бүтээдэг тэргүүлэгч платформ болж, олон улсын хамтын ажиллагаа болон тогтвортой хөгжлийн шинэ жишгийг тогтоох.",
            en: "To become a trusted, value-creating leading platform that connects businesses, investors, and organizations worldwide — setting new standards for international cooperation and sustainable development.",
            ja: "ビジネス、投資家、組織を世界規模でつなぐ信頼できる価値創造の主要プラットフォームとなり、国際協力と持続可能な発展の新しい基準を確立すること。",
          },
        },
        {
          heading: { mn: "Үнэт зүйлс", en: "Our Values", ja: "価値観" },
          text: {
            mn: "• Итгэлцэл, ил тод байдал, хариуцлага\n• Холбоо, түншлэл, хамтын өсөлт\n• Шинэ санаа, шинэ боломж, шинэ шийдэл\n• Урт хугацааны үнэ цэнэ, хариуцлагатай хөгжил",
            en: "• Trust, transparency, and accountability\n• Connection, partnership, and shared growth\n• New ideas, new opportunities, new solutions\n• Long-term value and responsible development",
            ja: "• 信頼、透明性、責任\n• つながり、パートナーシップ、共有成長\n• 新しいアイデア、新しい機会、新しい解決策\n• 長期的な価値と責任ある発展",
          },
        },
        {
          heading: { mn: "Бидний хандлага", en: "Our Approach", ja: "アプローチ" },
          text: {
            mn: "Бид бизнесийн харилцааг зөвхөн танилын хүрээ бус, харин итгэлцэлд суурилсан урт хугацааны түншлэл гэж үздэг. Тиймээс бид гишүүддээ чанартай сүлжээ, үнэ цэнтэй мэдээлэл, мэргэжлийн зөвлөгөө, хамтын ажиллагааны бодит боломжийг бий болгоход төвлөрдөг.",
            en: "We view business relationships not merely as networks of acquaintances, but as long-term partnerships built on trust. Therefore, we focus on providing our members with quality networks, valuable information, professional advisory, and tangible cooperation opportunities.",
            ja: "私たちはビジネス関係を単なる知人のネットワークではなく、信頼に基づく長期的なパートナーシップと考えています。そのため、会員に質の高いネットワーク、価値ある情報、専門的な助言、具体的な協力の機会を提供することに注力しています。",
          },
        },
      ],
    },
    {
      key: "membership",
      title: { mn: "Гишүүнчлэл", en: "Membership", ja: "会員" },
      intro: {
        mn: "Дэлхийн манлайлагч бизнес эрхлэгчид, хөрөнгө оруулагчид, салбар бүрийн нэр хүндтэй мэргэжилтнүүдийг холбосон онцгой сүлжээнд нэгдэж, үнэ цэнтэй харилцаа, тогтвортой өсөлт, шинэ боломжуудын нэг хэсэг болоорой.",
        en: "Join an exclusive network connecting global business leaders, investors, and respected professionals across industries.",
        ja: "世界のビジネスリーダー、投資家、各分野の著名な専門家をつなぐ特別なネットワークに参加しましょう。",
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
      title: { mn: "Зөвлөх үйлчилгээ", en: "Consulting Services", ja: "コンサルティング" },
      intro: {
        mn: "Бид гишүүд болон түнш байгууллагууддаа бизнесийн өсөлт, хөрөнгө оруулалт, олон улсын хамтын ажиллагааг дэмжих зорилгоор мэргэжлийн зөвлөх үйлчилгээг үзүүлдэг.",
        en: "We provide professional advisory services to our members and partner organizations to support business growth, investment, and international cooperation.",
        ja: "会員およびパートナー組織に対し、ビジネス成長、投資、国際協力を支援する専門的なコンサルティングサービスを提供しています。",
      },
      body: [
        {
          heading: { mn: "Бизнесийн зөвлөгөө", en: "Business Advisory", ja: "ビジネスアドバイザリー" },
          text: {
            mn: "Стратеги төлөвлөлт, зах зээлд нэвтрэх, түншлэл хөгжүүлэх чиглэлээр мэргэжлийн зөвлөгөө өгнө.",
            en: "Professional guidance on strategy, market entry, and partnership development.",
            ja: "戦略立案、市場参入、パートナーシップ構築に関する専門的な助言を提供します。",
          },
        },
        {
          heading: { mn: "Хөрөнгө оруулалтын зөвлөгөө", en: "Investment Advisory", ja: "投資アドバイザリー" },
          text: {
            mn: "Хөрөнгө оруулалтын боломжийг үнэлж, олон улсын хөрөнгө оруулагчидтай холбох дэмжлэг үзүүлнэ.",
            en: "Evaluate investment opportunities and facilitate connections with international investors.",
            ja: "投資機会の評価と国際的な投資家との接続を支援します。",
          },
        },
        {
          heading: { mn: "Олон улсын хамтын ажиллагаа", en: "International Cooperation", ja: "国際協力" },
          text: {
            mn: "Олон улсын түнш байгууллагуудтай хамтын ажиллагаа хөгжүүлэх, төсөл хэрэгжүүлэхэд зөвлөх үйлчилгээ үзүүлнэ.",
            en: "Advisory support for developing cooperation with international partners and implementing joint projects.",
            ja: "国際パートナーとの協力推進および共同プロジェクトの実施を支援します。",
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
  const contactValue = {
    address: {
      mn: "Монгол улс, Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Eco International Tower, 20 давхар, 2004 тоот",
      en: "20F, 2004, Eco International Tower, 1st Khoroo, Sukhbaatar District, Ulaanbaatar, Mongolia",
      ja: "モンゴル国ウランバートル市スフバータル区1番小区 Eco International Tower 20階 2004号",
    },
    phone: "+976 66556699",
    email: "ikhkhuree@gmail.com",
    social: {
      facebook: "",
      linkedin:
        "https://www.linkedin.com/in/bilguun-jargalsaikhan-39632712a?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      instagram:
        "https://www.instagram.com/bilguunjargalsaikhan?igsh=MTdkaXhtNDVhdmt2Yw%3D%3D&utm_source=qr",
      youtube: "",
    },
  };
  await prisma.setting.upsert({
    where: { key: "contact" },
    update: { value: contactValue },
    create: { key: "contact", value: contactValue },
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
        coverImage: "/inter.jpg",
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
        coverImage: "/jpn_mng.jpg",
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
        coverImage: "/togtwortoi.jpg",
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
