import { useTranslation } from "react-i18next";
import { Tooltip } from "@/components/Tooltip";

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
  const label = current === "en" ? "Змінити на українську" : "Switch to English";

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    i18n.changeLanguage(next);
    e.currentTarget.blur();
  };

  return (
    <Tooltip content={label}>
      <button
        type="button"
        onClick={handleToggle}
        className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm transition-colors hover:bg-gray-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a]"
        aria-label={label}
      >
        <span className="text-[18px] md:text-[22px] leading-none" aria-hidden>
          {FLAGS[current]}
        </span>
      </button>
    </Tooltip>
  );
}
