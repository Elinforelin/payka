import { useTranslation } from "react-i18next";

function resolveLanguage(language: string): "en" | "uk" {
  return language.toLowerCase().startsWith("uk") ? "uk" : "en";
}

const FLAGS = {
  en: "🇬🇧",
  uk: "🇺🇦",
} as const;

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = resolveLanguage(i18n.language);
  const next = current === "en" ? "uk" : "en";

  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(next)}
      className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm transition-colors hover:bg-gray-50 active:scale-95"
      title={current === "en" ? "Змінити на українську" : "Switch to English"}
      aria-label={current === "en" ? "Switch to Ukrainian" : "Switch to English"}
    >
      <span className="text-[18px] md:text-[22px] leading-none" aria-hidden>
        {FLAGS[current]}
      </span>
    </button>
  );
}
