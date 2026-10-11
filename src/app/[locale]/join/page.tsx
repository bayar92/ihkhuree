import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { RegisterForm } from "@/components/member/RegisterForm";
import { MEMBERSHIP_TYPES, type MembershipType } from "@/lib/member-schema";

export const dynamic = "force-dynamic";

export default async function JoinPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { locale } = await params;
  const { type } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("member");

  const defaultType: MembershipType =
    MEMBERSHIP_TYPES.find((m) => m === type) ?? "associate";

  return (
    <>
      <PageHeader title={t("register.title")} intro={t("register.intro")} />
      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
          <RegisterForm defaultType={defaultType} />
        </div>
      </section>
    </>
  );
}
