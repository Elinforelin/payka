import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@/components/Tooltip";
import { THEME_STORAGE_KEY } from "@/lib/theme";

export function ThemeToggle() {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const label = isDark
    ? t("common.theme_light", "Switch to light mode")
    : t("common.theme_dark", "Switch to dark mode");

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // storage unavailable (private mode); the choice just won't persist
    }
    setIsDark(next);
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
        {isDark ? (
          <Sun className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" aria-hidden />
        ) : (
          <Moon className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" aria-hidden />
        )}
      </button>
    </Tooltip>
  );
}
