import OpenAI from "openai";
import type { Locale } from "@/i18n/routing";

const LANG_NAME: Record<Locale, string> = {
  mn: "Mongolian",
  en: "English",
  ja: "Japanese",
};

const FIELDS = ["title", "excerpt", "content"] as const;
const FIELD_LABEL: Record<(typeof FIELDS)[number], string> = {
  title: "гарчиг",
  excerpt: "товч агуулга",
  content: "үндсэн агуулга",
};

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

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY тохируулаагүй байна.");
  }
  return new OpenAI({ apiKey });
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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    await sleep(250);
  }

  return parts.join("\n\n");
}

async function translateFieldOpenAI(
  text: string,
  from: Locale,
  to: Locale,
  field: (typeof FIELDS)[number],
): Promise<string> {
  if (!text.trim()) return text;

  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: [
          `Translate ${FIELD_LABEL[field]} from ${LANG_NAME[from]} to ${LANG_NAME[to]}.`,
          "Return only the translated text.",
          "Preserve paragraph breaks and formatting.",
          "Do not add quotes or commentary.",
        ].join(" "),
      },
      { role: "user", content: text },
    ],
  });

  const out = response.choices[0]?.message?.content?.trim();
  if (!out) {
    throw new Error(`${FIELD_LABEL[field]} (${LANG_NAME[to]}) орчуулагдаагүй.`);
  }
  return out;
}

async function translateBundleForLanguage(
  source: NewsTranslationBundle,
  from: Locale,
  to: Locale,
  provider: "openai" | "mymemory",
): Promise<NewsTranslationBundle> {
  const out = {} as NewsTranslationBundle;

  for (const field of FIELDS) {
    const src = source[field];
    if (!src.trim()) {
      out[field] = "";
      continue;
    }

    out[field] =
      provider === "openai"
        ? await translateFieldOpenAI(src, from, to, field)
        : await translateWithMyMemory(src, from, to);

    if (!out[field].trim()) {
      throw new Error(
        `${FIELD_LABEL[field]} (${LANG_NAME[to]}) хоосон орчуулагдлаа.`,
      );
    }
  }

  return out;
}

async function translateNewsBundleOpenAI(
  source: NewsTranslationBundle,
  from: Locale,
): Promise<{ en: NewsTranslationBundle; ja: NewsTranslationBundle }> {
  const [en, ja] = await Promise.all([
    translateBundleForLanguage(source, from, "en", "openai"),
    translateBundleForLanguage(source, from, "ja", "openai"),
  ]);
  return { en, ja };
}

async function translateNewsBundleMyMemory(
  source: NewsTranslationBundle,
  from: Locale,
): Promise<{ en: NewsTranslationBundle; ja: NewsTranslationBundle }> {
  const en = await translateBundleForLanguage(source, from, "en", "mymemory");
  const ja = await translateBundleForLanguage(source, from, "ja", "mymemory");
  return { en, ja };
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

  const result = await translateNewsBundleMyMemory(source, from);

  return {
    ...result,
    provider: "mymemory",
    notice: hasOpenAI
      ? "OpenAI quota дууссан тул MyMemory үнэгүй орчуулга ашиглалаа. Үр дүнг заавал шалгаарай."
      : "MyMemory үнэгүй орчуулга ашиглалаа. OPENAI_API_KEY тохируулбал илүү сайн чанар авна.",
  };
}
