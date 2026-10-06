import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ShieldCheck, Sparkles, Gem, Mail, Instagram } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { CONTACT_INFO } from "@/lib/contact";

export const Route = createFileRoute("/guarantee")({
  component: GuaranteePage,
});

function GuaranteePage() {
  const { t } = useTranslation();

  const benefits = [
    { icon: Sparkles, title: t("guarantee.clean_title"), text: t("guarantee.clean_text") },
    { icon: Gem, title: t("guarantee.rhodium_title"), text: t("guarantee.rhodium_text") },
  ];

  return (
    <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm hover:bg-gray-50 transition-colors"
          aria-label={t("common.back")}
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" />
        </Link>
        <LanguageToggle />
      </header>

      <div className="mx-auto mt-8 max-w-2xl space-y-8 pb-12">
        <section className="text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#b3917d] shadow-sm">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
            {t("guarantee.title")}
          </h1>
          <p className="mx-auto max-w-xl text-base text-[#6b5f59] leading-relaxed">
            {t("guarantee.intro")}
          </p>
        </section>

        <div className="space-y-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <section
              key={title}
              className="rounded-[32px] bg-white p-6 md:p-8 shadow-sm border border-[#f0ebe7]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f3ef] text-[#b3917d]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-[#1a1a1a]">{title}</h2>
              </div>
              <p className="text-[#6b5f59] leading-relaxed">{text}</p>
            </section>
          ))}
        </div>

        <section className="rounded-[32px] bg-white p-6 md:p-8 shadow-sm border border-[#f0ebe7]">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">{t("guarantee.terms_title")}</h2>
          <ul className="space-y-3 text-[#6b5f59] leading-relaxed list-disc pl-5 marker:text-[#b3917d]">
            {(["period", "cost", "shipping", "scope", "exclusions", "paid"] as const).map((key) => (
              <li key={key}>{t(`guarantee.terms_${key}`)}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-[32px] bg-white p-6 md:p-8 shadow-sm border border-[#f0ebe7]">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">{t("guarantee.how_title")}</h2>
          <p className="text-[#6b5f59] leading-relaxed mb-6">{t("guarantee.how_text")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={CONTACT_INFO.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-[24px] bg-[#f7f3ef] p-4 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Instagram className="h-5 w-5 text-[#b3917d]" />
              <span className="text-sm font-semibold text-[#1a1a1a]">@{CONTACT_INFO.instagram.handle}</span>
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-3 rounded-[24px] bg-[#f7f3ef] p-4 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Mail className="h-5 w-5 text-[#b3917d]" />
              <span className="text-sm font-semibold text-[#1a1a1a] break-all">{CONTACT_INFO.email}</span>
            </a>
          </div>
        </section>

        <p className="text-center">
          <Link
            to="/care"
            className="text-sm font-bold text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68] transition-colors"
          >
            {t("common.jewelry_care")}
          </Link>
        </p>
      </div>
    </main>
  );
}
