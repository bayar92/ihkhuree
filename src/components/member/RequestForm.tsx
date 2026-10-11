"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { createRequest } from "@/app/connection-actions";
import {
  MAX_OPEN_REQUESTS,
  REQUEST_KINDS,
  type ConnectionFormState,
} from "@/lib/connection-schema";
import { Field, FormAlert, SubmitButton, inputClass } from "./fields";

export function RequestForm() {
  const t = useTranslations("member");
  const locale = useLocale();
  const [state, action, pending] = useActionState<ConnectionFormState, FormData>(
    createRequest,
    {},
  );

  const v = state.values ?? {};
  const invalid = (name: string) => state.fields?.includes(name);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      {state.error === "limit" ? (
        <FormAlert tone="error">
          {t("errors.limit", { max: MAX_OPEN_REQUESTS })}
        </FormAlert>
      ) : state.error ? (
        <FormAlert tone="error">{t(`errors.${state.error}`)}</FormAlert>
      ) : null}
      {state.ok && <FormAlert tone="success">{t("connections.sent")}</FormAlert>}

      <Field label={t("connections.kind")} required>
        <select
          name="kind"
          defaultValue={v.kind || "member"}
          className={inputClass(invalid("kind"))}
        >
          {REQUEST_KINDS.map((k) => (
            <option key={k} value={k}>
              {t(`connections.kinds.${k}`)}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t("connections.topic")} required>
        <input
          name="topic"
          required
          minLength={3}
          maxLength={120}
          placeholder={t("connections.topicPlaceholder")}
          defaultValue={v.topic}
          className={inputClass(invalid("topic"))}
        />
      </Field>
      <Field
        label={t("connections.details")}
        hint={t("connections.detailsHint")}
        required
      >
        <textarea
          name="details"
          required
          rows={5}
          minLength={10}
          maxLength={2000}
          defaultValue={v.details}
          className={inputClass(invalid("details"))}
        />
      </Field>

      <SubmitButton
        pending={pending}
        label={t("connections.submit")}
        pendingLabel={t("connections.submitting")}
      />
    </form>
  );
}
