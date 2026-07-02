"use client";

import { useState } from "react";
import type { AboutContent, L } from "@/content/defaults";
import {
  EditorForm,
  Section,
  LocalizedInput,
  PlainInput,
  ImageInput,
  IconSelect,
  ItemHeader,
  AddButton,
} from "./fields";

const ICONS = [
  "target",
  "eye",
  "handshake",
  "globe",
  "users",
  "briefcase",
  "calendar",
  "flag",
  "barChart",
];

const emptyL = (): L => ({ mn: "", en: "", ja: "" });

export function AboutEditor({ initial }: { initial: AboutContent }) {
  const [c, setC] = useState<AboutContent>(initial);

  function update(mutator: (draft: AboutContent) => void) {
    setC((prev) => {
      const next = structuredClone(prev);
      mutator(next);
      return next;
    });
  }

  return (
    <EditorForm contentKey="about" value={c}>
      <Section title="Баннер">
        <ImageInput
          label="Зураг"
          value={c.hero.image}
          uploadCategory="site"
          onChange={(v) => update((d) => void (d.hero.image = v))}
        />
        <LocalizedInput
          label="Гарчиг (мөр 1)"
          value={c.hero.title1}
          onChange={(v) => update((d) => void (d.hero.title1 = v))}
        />
        <LocalizedInput
          label="Гарчиг (мөр 2)"
          value={c.hero.title2}
          onChange={(v) => update((d) => void (d.hero.title2 = v))}
        />
        <LocalizedInput
          label="Тайлбар"
          textarea
          value={c.hero.text}
          onChange={(v) => update((d) => void (d.hero.text = v))}
        />
        <LocalizedInput
          label="Товчны бичвэр"
          value={c.hero.cta}
          onChange={(v) => update((d) => void (d.hero.cta = v))}
        />
      </Section>

      <Section title="Хэсгийн нэрс">
        {(
          [
            ["about", "Баннер шошго"],
            ["purpose", "Зорилго"],
            ["numbers", "Тоон үзүүлэлт"],
            ["history", "Түүх"],
            ["leadership", "Удирдлага"],
          ] as const
        ).map(([key, label]) => (
          <LocalizedInput
            key={key}
            label={label}
            value={c.sectionLabels[key]}
            onChange={(v) => update((d) => void (d.sectionLabels[key] = v))}
          />
        ))}
      </Section>

      <Section
        title="Бидний зорилго"
        action={
          <AddButton
            onClick={() =>
              update((d) =>
                d.purpose.push({ icon: "globe", title: emptyL(), text: emptyL() }),
              )
            }
          >
            + Нэмэх
          </AddButton>
        }
      >
        {c.purpose.map((p, i) => (
          <div key={i} className="rounded-lg border border-neutral-200 p-4">
            <ItemHeader
              title={`Карт #${i + 1}`}
              onRemove={() => update((d) => void d.purpose.splice(i, 1))}
              onMoveUp={i > 0 ? () => update((d) => move(d.purpose, i, i - 1)) : undefined}
              onMoveDown={
                i < c.purpose.length - 1
                  ? () => update((d) => move(d.purpose, i, i + 1))
                  : undefined
              }
            />
            <div className="space-y-3">
              <IconSelect
                label="Дүрс"
                value={p.icon}
                options={ICONS}
                onChange={(v) => update((d) => void (d.purpose[i].icon = v))}
              />
              <LocalizedInput
                label="Гарчиг"
                value={p.title}
                onChange={(v) => update((d) => void (d.purpose[i].title = v))}
              />
              <LocalizedInput
                label="Текст (заавал биш)"
                textarea
                value={p.text}
                onChange={(v) => update((d) => void (d.purpose[i].text = v))}
              />
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">
                    Жагсаалт (заавал биш)
                  </span>
                  <AddButton
                    onClick={() =>
                      update((d) => {
                        d.purpose[i].items = d.purpose[i].items ?? [];
                        d.purpose[i].items!.push(emptyL());
                      })
                    }
                  >
                    + Мөр
                  </AddButton>
                </div>
                <div className="space-y-2">
                  {(p.items ?? []).map((it, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <div className="flex-1">
                        <LocalizedInput
                          value={it}
                          onChange={(v) =>
                            update((d) => void (d.purpose[i].items![j] = v))
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          update((d) => void d.purpose[i].items!.splice(j, 1))
                        }
                        className="mt-1 text-sm font-medium text-red-600 hover:underline"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Тоон үзүүлэлт"
        action={
          <AddButton
            onClick={() =>
              update((d) =>
                d.stats.push({ icon: "users", value: "", label: emptyL() }),
              )
            }
          >
            + Нэмэх
          </AddButton>
        }
      >
        {c.stats.map((s, i) => (
          <div key={i} className="rounded-lg border border-neutral-200 p-4">
            <ItemHeader
              title={`Үзүүлэлт #${i + 1}`}
              onRemove={() => update((d) => void d.stats.splice(i, 1))}
            />
            <div className="space-y-3">
              <IconSelect
                label="Дүрс"
                value={s.icon}
                options={ICONS}
                onChange={(v) => update((d) => void (d.stats[i].icon = v))}
              />
              <PlainInput
                label="Утга (ж: 120+)"
                value={s.value}
                onChange={(v) => update((d) => void (d.stats[i].value = v))}
              />
              <LocalizedInput
                label="Шошго"
                value={s.label}
                onChange={(v) => update((d) => void (d.stats[i].label = v))}
              />
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Түүхэн замнал"
        action={
          <AddButton
            onClick={() =>
              update((d) =>
                d.timeline.push({
                  icon: "flag",
                  year: "",
                  title: emptyL(),
                  text: emptyL(),
                }),
              )
            }
          >
            + Нэмэх
          </AddButton>
        }
      >
        {c.timeline.map((m, i) => (
          <div key={i} className="rounded-lg border border-neutral-200 p-4">
            <ItemHeader
              title={`Үе шат #${i + 1}`}
              onRemove={() => update((d) => void d.timeline.splice(i, 1))}
              onMoveUp={i > 0 ? () => update((d) => move(d.timeline, i, i - 1)) : undefined}
              onMoveDown={
                i < c.timeline.length - 1
                  ? () => update((d) => move(d.timeline, i, i + 1))
                  : undefined
              }
            />
            <div className="space-y-3">
              <IconSelect
                label="Дүрс"
                value={m.icon}
                options={ICONS}
                onChange={(v) => update((d) => void (d.timeline[i].icon = v))}
              />
              <PlainInput
                label="Он"
                value={m.year}
                onChange={(v) => update((d) => void (d.timeline[i].year = v))}
              />
              <LocalizedInput
                label="Гарчиг"
                value={m.title}
                onChange={(v) => update((d) => void (d.timeline[i].title = v))}
              />
              <LocalizedInput
                label="Текст"
                textarea
                value={m.text}
                onChange={(v) => update((d) => void (d.timeline[i].text = v))}
              />
            </div>
          </div>
        ))}
      </Section>

      <Section title="Түүх (танилцуулга)">
        <LocalizedInput
          label="Танилцуулга"
          textarea
          value={c.history.intro}
          onChange={(v) => update((d) => void (d.history.intro = v))}
        />
        <LocalizedInput
          label="Товчны бичвэр"
          value={c.history.cta}
          onChange={(v) => update((d) => void (d.history.cta = v))}
        />
      </Section>

      <Section title="Удирдлагын мэндчилгээ">
        <ImageInput
          label="Зураг"
          value={c.leadership.image}
          uploadCategory="site"
          onChange={(v) => update((d) => void (d.leadership.image = v))}
        />
        <LocalizedInput
          label="Гарчиг"
          value={c.leadership.title}
          onChange={(v) => update((d) => void (d.leadership.title = v))}
        />
        <LocalizedInput
          label="Мэндчилгээний текст"
          textarea
          rows={6}
          value={c.leadership.text}
          onChange={(v) => update((d) => void (d.leadership.text = v))}
        />
        <LocalizedInput
          label="Хүндэтгэлийн мөр"
          value={c.leadership.signoff}
          onChange={(v) => update((d) => void (d.leadership.signoff = v))}
        />
        <LocalizedInput
          label="Албан тушаал (бүтэн)"
          value={c.leadership.position}
          onChange={(v) => update((d) => void (d.leadership.position = v))}
        />
        <LocalizedInput
          label="Нэр"
          value={c.leadership.name}
          onChange={(v) => update((d) => void (d.leadership.name = v))}
        />
        <LocalizedInput
          label="Албан тушаал (товч)"
          value={c.leadership.role}
          onChange={(v) => update((d) => void (d.leadership.role = v))}
        />
        <PlainInput
          label="Огноо"
          value={c.leadership.date}
          onChange={(v) => update((d) => void (d.leadership.date = v))}
        />
      </Section>
    </EditorForm>
  );
}

function move<T>(arr: T[], from: number, to: number) {
  const [item] = arr.splice(from, 1);
  arr.splice(to, 0, item);
}
