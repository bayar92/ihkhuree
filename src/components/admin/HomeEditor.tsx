"use client";

import { useState } from "react";
import type { HomeContent } from "@/content/defaults";
import { EditorForm, Section, LocalizedInput } from "./fields";

export function HomeEditor({ initial }: { initial: HomeContent }) {
  const [c, setC] = useState<HomeContent>(initial);

  function update(mutator: (draft: HomeContent) => void) {
    setC((prev) => {
      const next = structuredClone(prev);
      mutator(next);
      return next;
    });
  }

  return (
    <EditorForm contentKey="home" value={c}>
      <Section title="Гишүүнчлэлийн танилцуулга (нүүр хуудасны дээд хэсэг)">
        <LocalizedInput
          label="Шошго"
          value={c.connect.label}
          onChange={(v) => update((d) => void (d.connect.label = v))}
        />
        <LocalizedInput
          label="Гарчиг"
          textarea
          rows={3}
          value={c.connect.title}
          onChange={(v) => update((d) => void (d.connect.title = v))}
        />
        <LocalizedInput
          label="Тайлбар"
          textarea
          rows={3}
          value={c.connect.text}
          onChange={(v) => update((d) => void (d.connect.text = v))}
        />
        {c.connect.cards.map((card, i) => (
          <div key={i} className="space-y-4 rounded-lg border border-neutral-200 p-4">
            <p className="text-sm font-semibold text-neutral-500">Карт #{i + 1}</p>
            <LocalizedInput
              label="Гарчиг"
              value={card.title}
              onChange={(v) => update((d) => void (d.connect.cards[i].title = v))}
            />
            <LocalizedInput
              label="Тайлбар"
              textarea
              rows={3}
              value={card.text}
              onChange={(v) => update((d) => void (d.connect.cards[i].text = v))}
            />
          </div>
        ))}
        <LocalizedInput
          label="Үндсэн товчны текст (бүртгүүлэх)"
          value={c.connect.primaryCta}
          onChange={(v) => update((d) => void (d.connect.primaryCta = v))}
        />
        <LocalizedInput
          label="Хоёр дахь товчны текст (дэлгэрэнгүй)"
          value={c.connect.secondaryCta}
          onChange={(v) => update((d) => void (d.connect.secondaryCta = v))}
        />
      </Section>

      <Section title="Элссэний дараах 4 алхам">
        <LocalizedInput
          label="Шошго"
          value={c.journey.label}
          onChange={(v) => update((d) => void (d.journey.label = v))}
        />
        <LocalizedInput
          label="Гарчиг"
          value={c.journey.title}
          onChange={(v) => update((d) => void (d.journey.title = v))}
        />
        {c.journey.steps.map((step, i) => (
          <div key={i} className="space-y-4 rounded-lg border border-neutral-200 p-4">
            <p className="text-sm font-semibold text-neutral-500">Алхам {step.no}</p>
            <LocalizedInput
              label="Гарчиг"
              value={step.title}
              onChange={(v) => update((d) => void (d.journey.steps[i].title = v))}
            />
            <LocalizedInput
              label="Тайлбар"
              textarea
              rows={2}
              value={step.text}
              onChange={(v) => update((d) => void (d.journey.steps[i].text = v))}
            />
          </div>
        ))}
      </Section>

      <Section title="Бидний тухай блок (нүүр хуудас)">
        <LocalizedInput
          label="Шошго"
          value={c.aboutTeaser.label}
          onChange={(v) => update((d) => void (d.aboutTeaser.label = v))}
        />
        <LocalizedInput
          label="Гарчиг (мөр 1)"
          value={c.aboutTeaser.title1}
          onChange={(v) => update((d) => void (d.aboutTeaser.title1 = v))}
        />
        <LocalizedInput
          label="Гарчиг (мөр 2)"
          value={c.aboutTeaser.title2}
          onChange={(v) => update((d) => void (d.aboutTeaser.title2 = v))}
        />
        <LocalizedInput
          label="Тайлбар"
          textarea
          rows={5}
          value={c.aboutTeaser.text}
          onChange={(v) => update((d) => void (d.aboutTeaser.text = v))}
        />
      </Section>
    </EditorForm>
  );
}
