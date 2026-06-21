# Ikh Khuree — International Business Cooperation Association

Олон улсын бизнесийн хамтын ажиллагааны холбооны вэбсайт. 3 хэл дээр (Монгол / English / 日本語), агуулгыг админ хэсгээс засварлах боломжтой.

## Технологи

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **next-intl** — олон хэлний дэмжлэг (`mn`, `en`, `ja`)
- **Prisma + PostgreSQL** — өгөгдлийн сан (Railway дээр host хийгдсэн)
- **Auth.js (NextAuth v5)** — админ нэвтрэлт (credentials)

## Эхлүүлэх

```bash
npm install
```

`.env` файлыг `.env.example`-ээс хуулж тохируул:

```bash
cp .env.example .env
```

Шаардлагатай хувьсагчид:

| Хувьсагч | Тайлбар |
| --- | --- |
| `DATABASE_URL` | PostgreSQL холболтын string (Railway) |
| `AUTH_SECRET` | Auth.js secret — `openssl rand -base64 32` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | seed-ээр үүсэх анхны админ |

Өгөгдлийн сан болон анхны контент:

```bash
npm run db:push   # schema-г DB рүү тулгах
npm run db:seed   # анхны контент + админ хэрэглэгч үүсгэх
```

Хөгжүүлэлтийн сервер:

```bash
npm run dev       # http://localhost:3000
```

## Чухал замууд

| Зам | Тайлбар |
| --- | --- |
| `/mn`, `/en`, `/ja` | Нийтийн сайт (хэл бүрээр) |
| `/admin` | Удирдлагын самбар (нэвтрэлт шаардана) |
| `/admin/login` | Админ нэвтрэх |

Анхны админ (seed-ийн дараа):

- **Email:** `admin@ikhkhuree.mn`
- **Password:** `Admin12345!` (production-д заавал солих!)

## Админаас юу засах вэ

- **Нүүр баннер** (`/admin/hero`) — гарчиг, тайлбар, товч
- **Үнэт зүйлс** (`/admin/features`) — нүүрний 4 карт
- **Чиглэлүүд** (`/admin/focus-areas`) — доод цэнхэр зурвас
- **Хуудаснууд** (`/admin/pages`) — Бидний тухай / Гишүүнчлэл / Үйлчилгээ / Холбоо барих
- **Мэдээ** (`/admin/news`) — бүрэн CRUD
- **Арга хэмжээ** (`/admin/events`) — бүрэн CRUD
- **Хүсэлтүүд** (`/admin/inquiries`) — холбоо барих / элсэх формын мэдээлэл
- **Тохиргоо** (`/admin/settings`) — холбоо барих мэдээлэл

Бүх текст талбар 3 хэлээр (МН / EN / JA) тус тусдаа орох ба хадгалсны дараа нийтийн сайтад шууд тусна.

## Бүтэц

```
src/
  app/
    [locale]/        # нийтийн сайт (multilingual)
    admin/           # удирдлагын самбар (localized биш)
      (panel)/       # нэвтрэлтээр хамгаалагдсан хуудаснууд
    api/             # auth, inquiry endpoints
  components/        # UI бүрэлдэхүүн хэсгүүд
  i18n/              # next-intl тохиргоо
  lib/               # prisma, auth, helpers
  messages/          # UI орчуулгууд (mn/en/ja.json)
prisma/
  schema.prisma      # өгөгдлийн загвар
  seed.ts            # анхны контент
```

## Production build

```bash
npm run build
npm start
```

## Railway дээр deploy хийх

1. Энэ repo-г Railway төсөлд холбоно.
2. PostgreSQL plugin нэмнэ (`DATABASE_URL` автоматаар орно — дотоод хаягийг ашиглах нь хурдан).
3. Environment variables: `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
4. Build үед `prisma generate` (postinstall) ажиллана. Анх удаа `npm run db:push && npm run db:seed` ажиллуулна.
