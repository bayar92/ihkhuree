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
