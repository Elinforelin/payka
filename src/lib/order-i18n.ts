import enTranslation from "../locales/en.json";
import ukTranslation from "../locales/uk.json";

export const ORDER_LOCALES = ["en", "uk"] as const;
export type OrderLocale = (typeof ORDER_LOCALES)[number];

const dictionaries: Record<OrderLocale, Record<string, unknown>> = {
  en: enTranslation,
  uk: ukTranslation,
};

export function normalizeOrderLocale(value: unknown): OrderLocale {
  const language = String(value ?? "")
    .trim()
    .toLowerCase()
    .split(/[-_]/)[0];
  return language === "uk" ? "uk" : "en";
}

function lookup(dictionary: Record<string, unknown>, key: string): string | undefined {
  let current: unknown = dictionary;
  for (const part of key.split(".")) {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

export function translateOrderText(
  locale: OrderLocale,
  key: string,
  vars: Record<string, string | number> = {},
): string {
  const template =
    lookup(dictionaries[locale], key) ?? lookup(dictionaries.en, key) ?? key;
  return template.replace(/\{\{(\w+)\}\}/g, (_, name: string) =>
    vars[name] == null ? `{{${name}}}` : String(vars[name]),
  );
}

export function resolveProductName(name: string, locale: OrderLocale): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return trimmed;
  }
  return translateOrderText(locale, trimmed);
}
