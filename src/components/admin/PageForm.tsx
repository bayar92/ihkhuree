"use client";

import { useState } from "react";
import type { Page } from "@prisma/client";
import { savePage } from "@/app/admin/actions";
import { LocalizedField } from "./LocalizedField";
import { Card, PrimaryButton } from "./ui";

type Block = { heading?: unknown; text?: unknown };

export function PageForm({ page }: { page: Page }) {
  const initial = Array.isArray(page.body) ? (page.body as Block[]) : [];
  const [blocks, setBlocks] = useState<Block[]>(
    initial.length ? initial : [],
  );

  function addBlock() {
    setBlocks((b) => [...b, { heading: {}, text: {} }]);
  }
  function removeBlock(i: number) {
    setBlocks((b) => b.filter((_, idx) => idx !== i));
  }

  return (
    <form action={savePage} className="space-y-5">
      <input type="hidden" name="key" defaultValue={page.key} />
      <input type="hidden" name="blockCount" value={blocks.length} />

      <Card>
        <div className="space-y-5">
          <LocalizedField name="title" label="Хуудасны гарчиг" defaultValue={page.title} required />
          <LocalizedField name="intro" label="Танилцуулга" defaultValue={page.intro} textarea />
        </div>
      </Card>

      <div className="space-y-4">
        {blocks.map((b, i) => (
          <Card key={i}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-500">
                Блок #{i + 1}
              </span>
              <button
                type="button"
                onClick={() => removeBlock(i)}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Устгах
              </button>
            </div>
            <div className="space-y-4">
              <LocalizedField
                name={`block.${i}.heading`}
                label="Дэд гарчиг"
                defaultValue={b.heading}
              />
              <LocalizedField
                name={`block.${i}.text`}
                label="Текст"
                defaultValue={b.text}
                textarea
                rows={5}
              />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <PrimaryButton>Хадгалах</PrimaryButton>
        <button
          type="button"
          onClick={addBlock}
          className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
        >
          + Блок нэмэх
        </button>
      </div>
    </form>
  );
}
