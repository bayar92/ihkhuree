import OpenAI from "openai";
import type { Locale } from "@/i18n/routing";

const LANG_NAME: Record<Locale, string> = {
  mn: "Mongolian",
  en: "English",
  ja: "Japanese",
};

const FIELDS = ["title", "excerpt", "content"] as const;

export type NewsTranslationBundle = {
  title: string;
  excerpt: string;
  content: string;
};

export type NewsTranslationResult = {
  en: NewsTranslationBundle;
  ja: NewsTranslationBundle;
  provider: "openai" | "mymemory";
  notice?: string;
};

function parseBundle(value: unknown, label: string): NewsTranslationBundle {
  if (!value || typeof value !== "object") {
    throw new Error(`${label} орчуулгын формат буруу байна.`);
  }
  const o = value as Record<string, unknown>;
  return {
    title: String(o.title ?? ""),
    excerpt: String(o.excerpt ?? ""),
    content: String(o.content ?? ""),
  };
}

function isOpenAIQuotaError(error: unknown): boolean {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";
  const lower = message.toLowerCase();
  return (
    lower.includes("429") ||
    lower.includes("quota") ||
    lower.includes("billing") ||
    lower.includes("insufficient")
  );
}

function splitText(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];

  const chunks: string[] = [];
  let rest = text;

  while (rest.length > maxLen) {
    let cut = rest.lastIndexOf("\n\n", maxLen);
    if (cut < maxLen * 0.4) cut = rest.lastIndexOf("\n", maxLen);
    if (cut < maxLen * 0.4) cut = rest.lastIndexOf(" ", maxLen);
    if (cut < maxLen * 0.4) cut = maxLen;

    chunks.push(rest.slice(0, cut));
    rest = rest.slice(cut).trimStart();
  }

  if (rest) chunks.push(rest);
  return chunks;
}

async function translateWithMyMemory(
  text: string,
  from: Locale,
  to: Locale,
): Promise<string> {
  if (!text.trim()) return text;

  const chunks = splitText(text, 450);
  const parts: string[] = [];

  for (const chunk of chunks) {
    const params = new URLSearchParams({
      q: chunk,
      langpair: `${from}|${to}`,
    });
    const email = process.env.MYMEMORY_EMAIL?.trim();
    if (email) params.set("de", email);

    const res = await fetch(
      `https://api.mymemory.translated.net/get?${params.toString()}`,
    );
    if (!res.ok) {
      throw new Error(`MyMemory алдаа (${res.status}).`);
    }

    const data = (await res.json()) as {
      responseStatus?: number;
      responseDetails?: string;
      responseData?: { translatedText?: string };
    };

    if (data.responseStatus !== 200 || !data.responseData?.translatedText) {
      throw new Error(
        data.responseDetails ??
          "MyMemory орчуулга амжилтгүй. Түр хүлээгээд дахин оролдоно уу.",
      );
    }

    parts.push(data.responseData.translatedText);
  }

  return parts.join("\n\n");
}

async function translateBundleWithMyMemory(
  source: NewsTranslationBundle,
  from: Locale,
  to: Locale,
): Promise<NewsTranslationBundle> {
  const out = {} as NewsTranslationBundle;
  for (const field of FIELDS) {
    out[field] = await translateWithMyMemory(source[field], from, to);
  }
  return out;
}

async function translateNewsBundleOpenAI(
  source: NewsTranslationBundle,
  from: Locale,
): Promise<{ en: NewsTranslationBundle; ja: NewsTranslationBundle }> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY тохируулаагүй байна.");
  }

  const client = new OpenAI({ apiKey });
  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: [
          `Translate website news content from ${LANG_NAME[from]} into English and Japanese.`,
          "Return JSON only:",
          '{"en":{"title":"","excerpt":"","content":""},"ja":{"title":"","excerpt":"","content":""}}',
          "Preserve meaning, tone, and paragraph breaks. Do not add extra commentary.",
        ].join(" "),
      },
      {
        role: "user",
        content: JSON.stringify(source),
      },
    ],
  });

  const raw = response.choices[0]?.message?.content;
  if (!raw) throw new Error("OpenAI-аас хариу ирсэнгүй.");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Орчуулгын JSON буруу байна.");
  }

  const root = parsed as Record<string, unknown>;
  return {
    en: parseBundle(root.en, "English"),
    ja: parseBundle(root.ja, "Japanese"),
  };
}

export async function translateNewsBundle(
  source: NewsTranslationBundle,
  from: Locale = "mn",
): Promise<NewsTranslationResult> {
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY?.trim());

  if (hasOpenAI) {
    try {
      const result = await translateNewsBundleOpenAI(source, from);
      return { ...result, provider: "openai" };
    } catch (error) {
      if (!isOpenAIQuotaError(error)) {
        throw error instanceof Error
          ? error
          : new Error("OpenAI орчуулга амжилтгүй.");
      }
      console.warn("[translate] OpenAI quota exceeded, using MyMemory fallback");
    }
  }

  const [en, ja] = await Promise.all([
    translateBundleWithMyMemory(source, from, "en"),
    translateBundleWithMyMemory(source, from, "ja"),
  ]);

  return {
    en,
    ja,
    provider: "mymemory",
    notice: hasOpenAI
      ? "OpenAI quota дууссан тул MyMemory үнэгүй орчуулга ашиглалаа. Үр дүнг заавал шалгаарай."
      : "MyMemory үнэгүй орчуулга ашиглалаа. OPENAI_API_KEY тохируулбал илүү сайн чанар авна.",
  };
}
