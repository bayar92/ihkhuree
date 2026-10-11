import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { getCurrentUser } from "@/lib/dal";
import { PageHeader } from "@/components/PageHeader";
import { LoginForm } from "@/components/member/LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Already signed in as a member -> straight to the account page.
  const user = await getCurrentUser();
  if (user?.role === "member") redirect({ href: "/account", locale });

  const t = await getTranslations("member");
  return (
    <>
      <PageHeader title={t("login.title")} intro={t("login.intro")} />
      <section className="bg-white">
        <div className="mx-auto max-w-md px-4 py-14 sm:px-6 lg:px-8">
          <LoginForm />
        </div>
      </section>
    </>
  );
}
