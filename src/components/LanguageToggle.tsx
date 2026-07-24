import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  return (
    <button
      onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'uk' : 'en')}
      className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm transition-colors hover:bg-gray-50 active:scale-95"
      title={i18n.language === 'en' ? 'ІЗмінити на Українську' : 'Switch to English'}
    >
      <div className="flex flex-col items-center">
        <span className="text-[12px] md:text-[14px] font-bold uppercase">{i18n.language}</span>
      </div>
    </button>
  );
}
