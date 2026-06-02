import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { InquiryForm } from "@/components/InquiryForm";

export const dynamic = "force-dynamic";

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHeader title={t("join.title")} intro={t("join.intro")} />
      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
          <InquiryForm type="join" successMessage={t("join.success")} />
        </div>
      </section>
    </>
  );
}
