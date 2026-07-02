"use client";

import { useState } from "react";
import type { MembershipContent, L } from "@/content/defaults";
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
  "globe",
  "handshake",
  "barChart",
  "megaphone",
  "graduation",
  "star",
  "crown",
  "gem",
  "award",
  "shield",
  "user",
  "users",
  "fileText",
  "search",
  "check",
];

const emptyL = (): L => ({ mn: "", en: "", ja: "" });

function move<T>(arr: T[], from: number, to: number) {
  const [item] = arr.splice(from, 1);
  arr.splice(to, 0, item);
}

export function MembershipEditor({ initial }: { initial: MembershipContent }) {
  const [c, setC] = useState<MembershipContent>(initial);

  function update(mutator: (draft: MembershipContent) => void) {
    setC((prev) => {
      const next = structuredClone(prev);
      mutator(next);
      return next;
    });
  }

  return (
    <EditorForm contentKey="membership" value={c}>
      <Section title="Баннер">
        <ImageInput
          label="Зураг"
          value={c.hero.image}
          uploadCategory="site"
          onChange={(v) => update((d) => void (d.hero.image = v))}
        />
        <LocalizedInput
          label="Гарчиг"
          value={c.labels.title}
          onChange={(v) => update((d) => void (d.labels.title = v))}
        />
        <LocalizedInput
          label="Дэд бичвэр"
          textarea
          value={c.heroSub}
          onChange={(v) => update((d) => void (d.heroSub = v))}
        />
      </Section>

      <Section title="Хэсгийн нэрс">
        {(
          [
            ["benefits", "Давуу тал"],
            ["types", "Төрөл"],
            ["countries", "Улсууд"],
            ["how", "Гишүүн болох зам"],
          ] as const
        ).map(([key, label]) => (
          <LocalizedInput
            key={key}
            label={label}
            value={c.labels[key]}
            onChange={(v) => update((d) => void (d.labels[key] = v))}
          />
        ))}
      </Section>

      <Section title="Нийтлэг бичвэрүүд">
        <LocalizedInput
          label="Элсэх товч"
          value={c.apply}
          onChange={(v) => update((d) => void (d.apply = v))}
        />
        <LocalizedInput
          label="/ жил"
          value={c.perYear}
          onChange={(v) => update((d) => void (d.perYear = v))}
        />
        <LocalizedInput
          label="/ сар"
          value={c.perMonth}
          onChange={(v) => update((d) => void (d.perMonth = v))}
        />
      </Section>

      <Section
        title="Давуу талууд"
        action={
          <AddButton
            onClick={() =>
              update((d) =>
                d.benefits.push({ icon: "globe", title: emptyL(), text: emptyL() }),
              )
            }
          >
            + Нэмэх
          </AddButton>
        }
      >
        {c.benefits.map((b, i) => (
          <div key={i} className="rounded-lg border border-neutral-200 p-4">
            <ItemHeader
              title={`Давуу тал #${i + 1}`}
              onRemove={() => update((d) => void d.benefits.splice(i, 1))}
              onMoveUp={i > 0 ? () => update((d) => move(d.benefits, i, i - 1)) : undefined}
              onMoveDown={
                i < c.benefits.length - 1
                  ? () => update((d) => move(d.benefits, i, i + 1))
                  : undefined
              }
            />
            <div className="space-y-3">
              <IconSelect
                label="Дүрс"
                value={b.icon}
                options={ICONS}
                onChange={(v) => update((d) => void (d.benefits[i].icon = v))}
              />
              <LocalizedInput
                label="Гарчиг"
                value={b.title}
                onChange={(v) => update((d) => void (d.benefits[i].title = v))}
              />
              <LocalizedInput
                label="Текст"
                value={b.text}
                onChange={(v) => update((d) => void (d.benefits[i].text = v))}
              />
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Гишүүнчлэлийн төрлүүд"
        action={
          <AddButton
            onClick={() =>
              update((d) =>
                d.types.push({
                  icon: "user",
                  name: emptyL(),
                  price: "",
                  monthly: "",
                  features: [],
                }),
              )
            }
          >
            + Нэмэх
          </AddButton>
        }
      >
        {c.types.map((tp, i) => (
          <div key={i} className="rounded-lg border border-neutral-200 p-4">
            <ItemHeader
              title={`Төрөл #${i + 1}`}
              onRemove={() => update((d) => void d.types.splice(i, 1))}
              onMoveUp={i > 0 ? () => update((d) => move(d.types, i, i - 1)) : undefined}
              onMoveDown={
                i < c.types.length - 1
                  ? () => update((d) => move(d.types, i, i + 1))
                  : undefined
              }
            />
            <div className="space-y-3">
              <IconSelect
                label="Дүрс"
                value={tp.icon}
                options={ICONS}
                onChange={(v) => update((d) => void (d.types[i].icon = v))}
              />
              <LocalizedInput
                label="Нэр"
                value={tp.name}
                onChange={(v) => update((d) => void (d.types[i].name = v))}
              />
              <div className="grid grid-cols-2 gap-3">
                <PlainInput
                  label="Үнэ (жилийн)"
                  value={tp.price}
                  onChange={(v) => update((d) => void (d.types[i].price = v))}
                />
                <PlainInput
                  label="Сарын"
                  value={tp.monthly}
                  onChange={(v) => update((d) => void (d.types[i].monthly = v))}
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={!!tp.featured}
                  onChange={(e) =>
                    update((d) => void (d.types[i].featured = e.target.checked))
                  }
                />
                Онцолсон (төвийн карт)
              </label>
              <LocalizedInput
                label="Тэмдэг (заавал биш, ж: ЭРЭЛТТЭЙ)"
                value={tp.badge ?? emptyL()}
                onChange={(v) => update((d) => void (d.types[i].badge = v))}
              />
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">
                    Боломжуудын жагсаалт
                  </span>
                  <AddButton
                    onClick={() =>
                      update((d) => d.types[i].features.push(emptyL()))
                    }
                  >
                    + Мөр
                  </AddButton>
                </div>
                <div className="space-y-2">
                  {tp.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <div className="flex-1">
                        <LocalizedInput
                          value={f}
                          onChange={(v) =>
                            update((d) => void (d.types[i].features[j] = v))
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          update((d) => void d.types[i].features.splice(j, 1))
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
        title="Гишүүн улсууд"
        action={
          <AddButton
            onClick={() =>
              update((d) => d.countries.push({ code: "", name: emptyL() }))
            }
          >
            + Нэмэх
          </AddButton>
        }
      >
        <p className="text-xs text-neutral-500">
          Кодыг ISO 2 үсгээр (ж: jp, us, kr). Далбааг автоматаар татна.
        </p>
        {c.countries.map((ct, i) => (
          <div key={i} className="rounded-lg border border-neutral-200 p-4">
            <ItemHeader
              title={`Улс #${i + 1}`}
              onRemove={() => update((d) => void d.countries.splice(i, 1))}
              onMoveUp={i > 0 ? () => update((d) => move(d.countries, i, i - 1)) : undefined}
              onMoveDown={
                i < c.countries.length - 1
                  ? () => update((d) => move(d.countries, i, i + 1))
                  : undefined
              }
            />
            <div className="space-y-3">
              <PlainInput
                label="Код (ж: jp)"
                value={ct.code}
                onChange={(v) =>
                  update((d) => void (d.countries[i].code = v.toLowerCase().trim()))
                }
              />
              <LocalizedInput
                label="Нэр"
                value={ct.name}
                onChange={(v) => update((d) => void (d.countries[i].name = v))}
              />
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Гишүүн болох алхмууд"
        action={
          <AddButton
            onClick={() =>
              update((d) =>
                d.steps.push({
                  icon: "fileText",
                  no: "",
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
        {c.steps.map((s, i) => (
          <div key={i} className="rounded-lg border border-neutral-200 p-4">
            <ItemHeader
              title={`Алхам #${i + 1}`}
              onRemove={() => update((d) => void d.steps.splice(i, 1))}
              onMoveUp={i > 0 ? () => update((d) => move(d.steps, i, i - 1)) : undefined}
              onMoveDown={
                i < c.steps.length - 1
                  ? () => update((d) => move(d.steps, i, i + 1))
                  : undefined
              }
            />
            <div className="space-y-3">
              <IconSelect
                label="Дүрс"
                value={s.icon}
                options={ICONS}
                onChange={(v) => update((d) => void (d.steps[i].icon = v))}
              />
              <PlainInput
                label="Дугаар (ж: 01)"
                value={s.no}
                onChange={(v) => update((d) => void (d.steps[i].no = v))}
              />
              <LocalizedInput
                label="Гарчиг"
                value={s.title}
                onChange={(v) => update((d) => void (d.steps[i].title = v))}
              />
              <LocalizedInput
                label="Текст"
                value={s.text}
                onChange={(v) => update((d) => void (d.steps[i].text = v))}
              />
            </div>
          </div>
        ))}
      </Section>

      <Section title="Доод уриалга (CTA)">
        <LocalizedInput
          label="Текст"
          textarea
          value={c.cta.text}
          onChange={(v) => update((d) => void (d.cta.text = v))}
        />
        <LocalizedInput
          label="Товч"
          value={c.cta.btn}
          onChange={(v) => update((d) => void (d.cta.btn = v))}
        />
      </Section>
    </EditorForm>
  );
}
