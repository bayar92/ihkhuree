import type { Locale } from '@/i18n/routing';

export type L = Record<Locale, string>;

// ---------------- About ----------------
export type AboutContent = {
  hero: { image: string; title1: L; title2: L; text: L; cta: L };
  sectionLabels: {
    about: L;
    purpose: L;
    numbers: L;
    history: L;
    leadership: L;
  };
  purpose: { icon: string; title: L; text?: L; items?: L[] }[];
  stats: { icon: string; value: string; label: L }[];
  timeline: { icon: string; year: string; title: L; text: L }[];
  history: { intro: L; cta: L };
  leadership: {
    image: string;
    title: L;
    text: L;
    signoff: L;
    position: L;
    name: L;
    role: L;
    date: string;
  };
};

export const aboutDefaults: AboutContent = {
  hero: {
    image: '/main.jpg',
    title1: {
      mn: 'Одоо байгаа хүрээллээ,',
      en: 'From the network we have today,',
      ja: '今あるネットワークを基に、',
    },
    title2: {
      mn: 'Олон улсын Их Хүрээнд тэлнэ.',
      en: 'we expand into the global Ikh Khuree.',
      ja: '国際的なイヒ・フレーへと拡大する。',
    },
    text: {
      mn: 'Их Хүрээ олон улсын бизнесийн хамтын ажиллагааны холбоо нь олон улсын хамтын ажиллагаа, мэдлэг солилцоо, тогтвортой хөгжлийг дэмжих зорилготой ашгийн бус байгууллага юм.',
      en: 'Ikh Khuree International Business Cooperation Association is a non-profit organization dedicated to fostering international collaboration, knowledge exchange, and sustainable growth.',
      ja: 'イフ・フレー国際ビジネス協力協会は、国際協力、知識交換、持続可能な成長を促進する非営利団体です。',
    },
    cta: { mn: 'ДЭЛГЭРЭНГҮЙ', en: 'READ MORE', ja: '詳細を見る' },
  },
  sectionLabels: {
    about: { mn: 'БИДНИЙ ТУХАЙ', en: 'ABOUT US', ja: '私たちについて' },
    purpose: { mn: 'БИДНИЙ ЗОРИЛГО', en: 'OUR PURPOSE', ja: '私たちの目的' },
    numbers: {
      mn: '"ИХ ХҮРЭЭ" ХОЛБООНЫ ТООН ҮЗҮҮЛЭЛТ',
      en: 'IKH KHUREE ASSOCIATION IN NUMBERS',
      ja: '数字で見る「イフ・フレー」協会',
    },
    history: { mn: 'БИДНИЙ ТҮҮХ', en: 'OUR HISTORY', ja: '私たちの歩み' },
    leadership: { mn: 'УДИРДЛАГА', en: 'LEADERSHIP', ja: 'リーダーシップ' },
  },
  purpose: [
    {
      icon: 'target',
      title: { mn: 'Эрхэм зорилго', en: 'Our Mission', ja: '使命' },
      text: {
        mn: 'Бид олон улсын бизнесийн хамтын ажиллагааг шинэ түвшинд хүргэж, байгууллага, хөрөнгө оруулагчид болон бизнес эрхлэгчдийг холбох замаар урт хугацааны үнэ цэнэ бүхий түншлэлийг бий болгож, тогтвортой өсөлт хөгжил, инноваци, эдийн засгийн үр өгөөжийг дэмжихийг эрхэмлэдэг.',
        en: 'We are committed to elevating international business cooperation to a new level by connecting organizations, investors, and entrepreneurs — building long-term, value-creating partnerships and supporting sustainable growth, innovation, and economic prosperity.',
        ja: '国際ビジネス協力を新たなレベルに引き上げ、組織、投資家、起業家をつなぐことで、長期的な価値を創造するパートナーシップを構築し、持続可能な成長、イノベーション、経済的繁栄を支援することを使命としています。',
      },
    },
    {
      icon: 'eye',
      title: { mn: 'Алсын хараа', en: 'Our Vision', ja: 'ビジョン' },
      text: {
        mn: 'Бизнес, хөрөнгө оруулагчид, байгууллагуудыг дэлхийн хэмжээнд холбосон найдвартай, үнэ цэн бүтээдэг тэргүүлэгч платформ болж, олон улсын хамтын ажиллагаа болон тогтвортой хөгжлийн шинэ жишгийг тогтоох.',
        en: 'To become a trusted, value-creating leading platform that connects businesses, investors, and organizations worldwide — setting new standards for international cooperation and sustainable development.',
        ja: 'ビジネス、投資家、組織を世界規模でつなぐ信頼できる価値創造の主要プラットフォームとなり、国際協力と持続可能な発展の新しい基準を確立すること。',
      },
    },
    {
      icon: 'handshake',
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
      icon: 'globe',
      title: { mn: 'Бидний хандлага', en: 'Our Approach', ja: 'アプローチ' },
      text: {
        mn: 'Бид бизнесийн харилцааг зөвхөн танилын хүрээ бус, харин итгэлцэлд суурилсан урт хугацааны түншлэл гэж үздэг. Тиймээс бид гишүүддээ чанартай сүлжээ, үнэ цэнтэй мэдээлэл, мэргэжлийн зөвлөгөө, хамтын ажиллагааны бодит боломжийг бий болгоход төвлөрдөг.',
        en: 'We view business relationships not merely as networks of acquaintances, but as long-term partnerships built on trust. Therefore, we focus on providing our members with quality networks, valuable information, professional advisory, and tangible cooperation opportunities.',
        ja: '私たちはビジネス関係を単なる知人のネットワークではなく、信頼に基づく長期的なパートナーシップと考えています。そのため、会員に質の高いネットワーク、価値ある情報、専門的な助言、具体的な協力の機会を提供することに注力しています。',
      },
    },
  ],
  stats: [
    {
      icon: 'users',
      value: '80+',
      label: { mn: 'Гишүүн', en: 'Members', ja: '会員' },
    },
    {
      icon: 'globe',
      value: '6+',
      label: { mn: 'Улс орон', en: 'Countries', ja: 'カ国' },
    },
    {
      icon: 'briefcase',
      value: '3+',
      label: { mn: 'Төсөл', en: 'Projects', ja: 'プロジェクト' },
    },
    {
      icon: 'calendar',
      value: '20+',
      label: { mn: 'Жилийн туршлага', en: 'Years of Impact', ja: '年の実績' },
    },
  ],
  timeline: [
    {
      icon: 'flag',
      year: '2008',
      title: { mn: 'Үүсгэн байгуулсан', en: 'Established', ja: '設立' },
      text: {
        mn: 'Их Хүрээ олон улсын бизнесийн хамтын ажиллагааны холбоог үүсгэн байгуулав.',
        en: 'Foundation of Ikh Khuree International Business Cooperation Association.',
        ja: 'イフ・フレー国際ビジネス協力協会を設立。',
      },
    },
    {
      icon: 'globe',
      year: '2016',
      title: { mn: 'Тэлэлт', en: 'Expansion', ja: '拡大' },
      text: {
        mn: 'Олон улсын сүлжээ, түншлэлээ өргөжүүлэв.',
        en: 'Expanded our network and partnerships internationally.',
        ja: '国際的なネットワークとパートナーシップを拡大。',
      },
    },
    {
      icon: 'barChart',
      year: '2019',
      title: { mn: 'Өсөлт', en: 'Growth', ja: '成長' },
      text: {
        mn: 'Бизнес, хөрөнгө оруулалтыг дэмжих томоохон санаачилгуудыг хэрэгжүүлэв.',
        en: 'Launched major initiatives to support business and investment.',
        ja: 'ビジネスと投資を支援する主要な取り組みを開始。',
      },
    },
    {
      icon: 'users',
      year: '2026+',
      title: { mn: 'Нөлөөлөл', en: 'Impact', ja: 'インパクト' },
      text: {
        mn: 'Боломжуудыг бий болгож, тогтвортой ирээдүйг үргэлжлүүлэн бүтээж байна.',
        en: 'Continuing to create opportunities and build sustainable futures.',
        ja: '機会を創出し、持続可能な未来を築き続けています。',
      },
    },
  ],
  history: {
    intro: {
      mn: 'Монгол Улсыг дэлхийн бизнесийн хамтын нийгэмлэгтэй холбох зорилгоор байгуулагдсан “Их Хүрээ” холбоо нь өнөөдөр бизнесийн удирдагчид, хөрөнгө оруулагчид болон байгууллагуудыг нэгтгэсэн олон улсын хамтын ажиллагааны итгэлт сүлжээ болон хөгжиж байна.',
      en: 'Founded to connect Mongolia with the global business community, the Ikh Khuree Association has grown into a trusted international network that brings together business leaders, investors, and organizations to foster collaboration and shared opportunities.',
      ja: '世界のビジネスコミュニティとモンゴルを結ぶことを目的として設立された「イフ・フレー」協会は、現在ではビジネスリーダー、投資家、そして各種組織を結び付ける、国際協力のための信頼あるネットワークへと発展しています。',
    },
    cta: { mn: 'ДЭЛГЭРЭНГҮЙ', en: 'LEARN MORE ABOUT US', ja: 'もっと見る' },
  },
  leadership: {
    image: '/bilguun.webp',
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
      ja: 'ソロゴドッグ・ジャルガルサイハン・ビルグーン',
    },
    role: { mn: 'Ерөнхийлөгч', en: 'President', ja: '会長' },
    date: '2026.05.05',
  },
};

// ---------------- Membership ----------------
export type MembershipContent = {
  hero: { image: string };
  labels: {
    title: L;
    benefits: L;
    types: L;
    how: L;
    certificates: L;
    countries: L;
  };
  heroSub: L;
  apply: L;
  perYear: L;
  perMonth: L;
  benefits: { icon: string; title: L; text: L }[];
  types: {
    icon: string;
    image?: string;
    name: L;
    price: string;
    monthly: string;
    features: L[];
    featured?: boolean;
    badge?: L;
  }[];
  countries: { code: string; name: L }[];
  steps: { icon: string; no: string; title: L; text: L }[];
  certificates: string[];
  cta: { text: L; btn: L };
};

export const membershipDefaults: MembershipContent = {
  hero: { image: '/membership.png' },
  labels: {
    title: { mn: 'ГИШҮҮНЧЛЭЛ', en: 'MEMBERSHIP', ja: '会員制度' },
    benefits: {
      mn: 'ГИШҮҮНИЙ ДАВУУ ТАЛ',
      en: 'MEMBER BENEFITS',
      ja: '会員特典',
    },
    types: {
      mn: 'ГИШҮҮНЧЛЭЛИЙН ТӨРӨЛ',
      en: 'MEMBERSHIP TYPES',
      ja: '会員の種類',
    },
    how: {
      mn: 'ХЭРХЭН ГИШҮҮН БОЛОХ ВЭ',
      en: 'BECOMING A MEMBER',
      ja: '会員登録方法',
    },
    certificates: {
      mn: 'ГИШҮҮНИЙ ГЭРЧИЛГЭЭ',
      en: 'MEMBER CERTIFICATES',
      ja: '会員証',
    },
    countries: {
      mn: 'ГИШҮҮН УЛСЫН ЦАР ХҮРЭЭ',
      en: 'MEMBER COUNTRY REACH',
      ja: '会員国の広がり',
    },
  },
  heroSub: {
    mn: 'Дэлхийн манлайлагч бизнес эрхлэгчид, хөрөнгө оруулагчид, салбар бүрийн нэр хүндтэй мэргэжилтнүүдийг холбосон онцгой сүлжээнд нэгдэж, үнэ цэнтэй харилцаа, тогтвортой өсөлт, шинэ боломжуудын нэг хэсэг болоорой.',
    en: 'Join an exclusive network connecting global business leaders, investors, and respected professionals — become part of valuable relationships, sustainable growth, and new opportunities.',
    ja: '世界のビジネスリーダー、投資家、各分野の著名な専門家をつなぐ特別なネットワークに参加し、価値ある関係、持続可能な成長、新しい機会の一部になりましょう。',
  },
  apply: { mn: 'ЭЛСЭХ', en: 'APPLY NOW', ja: '今すぐ申込' },
  perYear: { mn: '/ жил', en: '/ year', ja: '/ 年' },
  perMonth: { mn: '/ сар', en: '/ mo', ja: '/ 月' },
  benefits: [
    {
      icon: 'globe',
      title: {
        mn: 'Дэлхийн сүлжээ',
        en: 'Global Network',
        ja: 'グローバルネットワーク',
      },
      text: {
        mn: 'Дэлхийн бизнес, манлайлагчидтай холбогдоно.',
        en: 'Connect with businesses and leaders worldwide.',
        ja: '世界中のビジネスやリーダーとつながります。',
      },
    },
    {
      icon: 'handshake',
      title: {
        mn: 'Бизнесийн боломж',
        en: 'Business Opportunities',
        ja: 'ビジネスチャンス',
      },
      text: {
        mn: 'Шинэ зах зээл, түншлэлд нэвтэрнэ.',
        en: 'Access new markets and partnerships.',
        ja: '新しい市場やパートナーシップにアクセス。',
      },
    },
    {
      icon: 'barChart',
      title: {
        mn: 'Мэдлэг ба ойлголт',
        en: 'Knowledge & Insights',
        ja: '知識と洞察',
      },
      text: {
        mn: 'Онцгой тайлан, арга хэмжээгээр мэдээлэлтэй байна.',
        en: 'Stay informed with exclusive reports and events.',
        ja: '限定レポートやイベントで最新情報を入手。',
      },
    },
    {
      icon: 'megaphone',
      title: {
        mn: 'Танигдах байдал',
        en: 'Visibility & Promotion',
        ja: '認知度と宣伝',
      },
      text: {
        mn: 'Дотоод болон олон улсад брэндээ таниулна.',
        en: 'Increase your brand exposure locally and internationally.',
        ja: '国内外でブランドの露出を高めます。',
      },
    },
    {
      icon: 'graduation',
      title: {
        mn: 'Чадавх бэхжүүлэлт',
        en: 'Capacity Building',
        ja: '能力開発',
      },
      text: {
        mn: 'Сургалт, семинар, хөгжлийн хөтөлбөрт оролцоно.',
        en: 'Join training, workshops and development programs.',
        ja: '研修、ワークショップ、開発プログラムに参加。',
      },
    },
    {
      icon: 'star',
      title: {
        mn: 'Итгэлт нийгэмлэг',
        en: 'Trusted Community',
        ja: '信頼されるコミュニティ',
      },
      text: {
        mn: 'Итгэлтэй, нэр хүндтэй нийгэмлэгийн нэг хэсэг бол.',
        en: 'Be part of a trusted and reputable community.',
        ja: '信頼され評判の高いコミュニティの一員に。',
      },
    },
  ],
  types: [
    {
      icon: 'crown',
      image: '/membership-icons/tem-0.png',
      name: {
        mn: 'Exclusive Member (Ноён)',
        en: 'Exclusive Member (Noyon)',
        ja: 'エクスクルーシブ会員（ノヨン）',
      },
      price: '$10,000',
      monthly: '$833',
      features: [
        {
          mn: 'Клубын хүндэт зөвлөх статустай болох',
          en: 'Honorary advisor status within the club',
          ja: 'クラブ内の名誉アドバイザーステータス',
        },
        {
          mn: 'Стратегийн шийдвэр гаргах түвшинд оролцох',
          en: 'Participate at the strategic decision-making level',
          ja: '戦略的意思決定レベルへの参加',
        },
        {
          mn: 'Клубын нэрийн өмнөөс олон улсын хамтын ажиллагаа хөгжүүлэх',
          en: 'Develop international cooperation on behalf of the club',
          ja: 'クラブ名義での国際協力の推進',
        },
        {
          mn: 'Онцгой хаалттай хөрөнгө оруулалтын боломжуудад нэвтрэх',
          en: 'Access to exclusive closed investment opportunities',
          ja: '特別な限定投資機会へのアクセス',
        },
        {
          mn: 'Насан туршийн VIP гишүүнчлэлийн статус',
          en: 'Lifetime VIP membership status',
          ja: '生涯VIP会員ステータス',
        },
      ],
    },
    {
      icon: 'gem',
      image: '/membership-icons/tem-1.png',
      name: {
        mn: 'Elite ангилал (Тайж)',
        en: 'Elite Class (Taij)',
        ja: 'エリートクラス（タイジ）',
      },
      price: '$5,000',
      monthly: '$417',
      featured: true,
      badge: { mn: 'ЭРЭЛТТЭЙ', en: 'POPULAR', ja: '人気' },
      features: [
        {
          mn: 'Клубыг төлөөлөн албан ёсны арга хэмжээнд оролцох',
          en: 'Represent the club at official events',
          ja: '公式イベントでのクラブ代表',
        },
        {
          mn: 'Олон улсын түнш байгууллагуудтай шууд холбогдох',
          en: 'Direct connection with international partner organizations',
          ja: '国際パートナー組織との直接連携',
        },
        {
          mn: 'Бизнесийн зөвлөх үйлчилгээ авах',
          en: 'Receive business advisory services',
          ja: 'ビジネスアドバイザリーサービス',
        },
        {
          mn: 'Хамтарсан төсөл санаачлах, удирдах эрх',
          en: 'Right to initiate and lead joint projects',
          ja: '共同プロジェクトの企画・主導権',
        },
        {
          mn: 'VIP зочдыг урих тусгай эрх',
          en: 'Special privilege to invite VIP guests',
          ja: 'VIPゲスト招待の特別権限',
        },
      ],
    },
    {
      icon: 'award',
      image: '/membership-icons/tem-2.png',
      name: {
        mn: 'Senior Member (Ван)',
        en: 'Senior Member (Van)',
        ja: 'シニア会員（ヴァン）',
      },
      price: '$1,500',
      monthly: '$125',
      features: [
        {
          mn: 'Хаалттай бизнес форумд оролцох',
          en: 'Access to closed business forums',
          ja: 'クローズドビジネスフォーラムへの参加',
        },
        {
          mn: 'Хөрөнгө оруулагчидтай холбогдох боломж',
          en: 'Opportunities to connect with investors',
          ja: '投資家との接続機会',
        },
        {
          mn: 'Компанийн танилцуулгыг клубын сувгаар түгээх',
          en: 'Promote your company profile through club channels',
          ja: 'クラブチャネルでの企業紹介',
        },
        {
          mn: 'Тусгай сургалт, мастер класст үнэ төлбөргүй хамрагдах',
          en: 'Free access to exclusive training and masterclasses',
          ja: '特別研修・マスタークラスへの無料参加',
        },
        {
          mn: 'Олон улсын арга хэмжээний давуу эрх',
          en: 'Priority access to international events',
          ja: '国際イベントへの優先参加',
        },
      ],
    },
    {
      icon: 'shield',
      image: '/membership-icons/tem-3.png',
      name: {
        mn: 'Middle Member (Засагт)',
        en: 'Middle Member (Zasagt)',
        ja: 'ミドル会員（ザサグト）',
      },
      price: '$1,000',
      monthly: '$83',
      features: [
        {
          mn: 'Хаалттай Middle Member Circle-д гишүүнээр элсэх',
          en: 'Join the closed Middle Member Circle',
          ja: 'クローズドMiddle Member Circleへの参加',
        },
        {
          mn: 'Дээд түвшний хөрөнгө оруулагчидтай уулзах боломж',
          en: 'Meet with top-tier investors',
          ja: 'トップレベルの投資家との面会',
        },
        {
          mn: 'Стратегийн зөвлөхүүдтэй ганцаарчилсан уулзалт',
          en: 'One-on-one meetings with strategic advisors',
          ja: '戦略アドバイザーとの個別面談',
        },
        {
          mn: 'Клубын үйл ажиллагааны бодлогод санал өгөх эрх',
          en: 'Right to contribute to club policy decisions',
          ja: 'クラブ運営方針への意見提出権',
        },
        {
          mn: 'Олон улсын дээд түвшний төлөөлөгчдийн арга хэмжээнд тусгай урилга',
          en: 'Special invitations to high-level international events',
          ja: '国際ハイレベルイベントへの特別招待',
        },
      ],
    },
    {
      icon: 'user',
      image: '/membership-icons/tem-4.png',
      name: { mn: 'Member (Хан)', en: 'Member (Khan)', ja: '会員（ハン）' },
      price: '$500',
      monthly: '$41',
      features: [
        {
          mn: 'Клубын албан ёсны гишүүнчлэл',
          en: 'Official club membership',
          ja: 'クラブの正式会員資格',
        },
        {
          mn: 'Сар тутмын уулзалт, арга хэмжээнд оролцох эрх',
          en: 'Access to monthly meetings and events',
          ja: '月例会・イベントへの参加権',
        },
        {
          mn: 'Гишүүдийн сүлжээнд нэвтрэх боломж',
          en: "Access to the members' network",
          ja: '会員ネットワークへのアクセス',
        },
        {
          mn: 'Мэдээллийн товхимол, бизнесийн мэдээлэл авах',
          en: 'Receive newsletters and business insights',
          ja: 'ニュースレターとビジネス情報の受信',
        },
        {
          mn: 'Клубын онлайн платформ ашиглах эрх',
          en: "Access to the club's online platform",
          ja: 'クラブオンラインプラットフォームの利用',
        },
      ],
    },
  ],
  countries: [
    { code: 'jp', name: { mn: 'Япон', en: 'Japan', ja: '日本' } },
    { code: 'tw', name: { mn: 'Тайвань', en: 'Taiwan', ja: '台湾' } },
    { code: 'us', name: { mn: 'АНУ', en: 'USA', ja: 'アメリカ' } },
    {
      code: 'sg',
      name: { mn: 'Сингапур', en: 'Singapore', ja: 'シンガポール' },
    },
    { code: 'it', name: { mn: 'Итали', en: 'Italy', ja: 'イタリア' } },
    { code: 'ae', name: { mn: 'АНЭУ', en: 'UAE', ja: 'アラブ首長国連邦' } },
    { code: 'kr', name: { mn: 'Солонгос', en: 'Korea', ja: '韓国' } },
  ],
  steps: [
    {
      icon: 'fileText',
      no: '01',
      title: {
        mn: 'ӨРГӨДӨЛ ГАРГАХ',
        en: 'SUBMIT APPLICATION',
        ja: '申請を提出',
      },
      text: {
        mn: 'Гишүүнчлэлийн өргөдлийн маягтыг бөглөнө.',
        en: 'Fill out the membership application form.',
        ja: '会員申請フォームに記入します。',
      },
    },
    {
      icon: 'search',
      no: '02',
      title: { mn: 'ХЯНАЛТ', en: 'REVIEW PROCESS', ja: '審査' },
      text: {
        mn: 'Манай баг таны өргөдлийг хянана.',
        en: 'Our team will review your application.',
        ja: '当協会のチームが申請を審査します。',
      },
    },
    {
      icon: 'check',
      no: '03',
      title: { mn: 'БАТАЛГААЖУУЛАЛТ', en: 'APPROVAL', ja: '承認' },
      text: {
        mn: 'Гишүүнчлэлийн баталгаажуулалт хүлээн авна.',
        en: 'Receive confirmation of your membership.',
        ja: '会員資格の確認を受け取ります。',
      },
    },
    {
      icon: 'users',
      no: '04',
      title: { mn: 'ХОЛБОГДОХ', en: 'GET CONNECTED', ja: 'つながる' },
      text: {
        mn: 'Дэлхийн сүлжээтэй холбогдож өсч эхэлнэ.',
        en: 'Start connecting and grow with our global network.',
        ja: 'グローバルネットワークとつながり成長を始めます。',
      },
    },
  ],
  certificates: Array.from(
    { length: 15 },
    (_, i) => `/certificates/cert-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  cta: {
    text: {
      mn: 'Их Хүрээ олон улсын бизнесийн хамтын ажиллагааны холбоонд өнөөдөр нэгдэж, шинэ боломжуудыг нээ.',
      en: 'Join Ikh Khuree International Business Cooperation Association today and unlock new opportunities.',
      ja: '本日イフ・フレー国際ビジネス協力協会に参加し、新たな機会を切り開きましょう。',
    },
    btn: { mn: 'ОДОО НЭГДЭХ', en: 'JOIN US NOW', ja: '今すぐ参加' },
  },
};

// ---------------- Home extras ----------------
export type HomeContent = {
  aboutTeaser: { label: L; title1: L; title2: L; text: L };
};

export const homeDefaults: HomeContent = {
  aboutTeaser: {
    label: { mn: 'БИДНИЙ ТУХАЙ', en: 'ABOUT US', ja: '私たちについて' },
    title1: {
      mn: 'Одоо байгаа хүрээллээ,',
      en: 'From the network we have today,',
      ja: '今あるネットワークを基に、',
    },
    title2: {
      mn: 'Олон улсын Их Хүрээнд тэлнэ.',
      en: 'we expand into the global Ikh Khuree.',
      ja: '国際的なイヒ・フレーへと拡大する。',
    },
    text: {
      mn: 'Бид олон улсын бизнесийн хамтын ажиллагааг шинэ түвшинд хүргэж, байгууллага, хөрөнгө оруулагчид болон бизнес эрхлэгчдийг холбох замаар урт хугацааны үнэ цэнэ бүхий түншлэлийг бий болгож, тогтвортой өсөлт хөгжил, инноваци, эдийн засгийн үр өгөөжийг дэмжихийг эрхэмлэдэг.',
      en: 'We are committed to elevating international business cooperation to a new level by connecting organizations, investors, and entrepreneurs — building long-term, value-creating partnerships and supporting sustainable growth, innovation, and economic prosperity.',
      ja: '国際ビジネス協力を新たなレベルに引き上げ、組織、投資家、起業家をつなぐことで、長期的な価値を創造するパートナーシップを構築し、持続可能な成長、イノベーション、経済的繁栄を支援することを使命としています。',
    },
  },
};
