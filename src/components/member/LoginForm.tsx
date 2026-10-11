"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { loginMember } from "@/app/member-actions";
import type { MemberFormState } from "@/lib/member-schema";
import { Field, FormAlert, SubmitButton, inputClass } from "./fields";

const initialState: MemberFormState = {};

export function LoginForm() {
  const t = useTranslations("member");
  const locale = useLocale();
  const [state, action, pending] = useActionState(loginMember, initialState);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      {state.error && (
        <FormAlert tone={state.error === "pending" ? "info" : "error"}>
          {t(`errors.${state.error}`)}
        </FormAlert>
      )}

      <Field label={t("register.email")} required>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={state.values?.email}
          className={inputClass()}
        />
      </Field>
      <Field label={t("register.password")} required>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass()}
        />
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <SubmitButton
          pending={pending}
          label={t("login.submit")}
          pendingLabel={t("login.submitting")}
        />
        <Link href="/join" className="text-sm font-medium text-brand-600 hover:underline">
          {t("login.noAccount")}
        </Link>
      </div>
    </form>
  );
}
