import { setRequestLocale } from "next-intl/server";
import { ContentPage } from "@/components/ContentPage";
import type { Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContentPage pageKey="services" locale={locale as Locale} />;
}
