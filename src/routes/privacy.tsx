import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ShieldCheck, Database, Scale, BarChart3, Clock, UserCheck, Mail } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { CONTACT_INFO } from "@/lib/contact";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#f0ebe7] bg-white p-5 md:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f7f3ef] text-[#b3917d]">
          {icon}
        </span>
        <h2 className="text-base font-bold text-[#1a1a1a]">{title}</h2>
      </div>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#6b5f59]">
        {children}
      </div>
    </div>
  );
}

function PrivacyPage() {
  const { t } = useTranslation();

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
            {t("privacy.title")}
          </h1>
          <p className="mx-auto max-w-xl text-base text-[#6b5f59] leading-relaxed">
            {t("privacy.intro")}
          </p>
        </section>

        <div className="space-y-3">
          <Section icon={<UserCheck className="h-4 w-4" />} title={t("privacy.controller_title")}>
            <p>{t("privacy.controller_text", { email: CONTACT_INFO.email })}</p>
          </Section>

          <Section icon={<Database className="h-4 w-4" />} title={t("privacy.collect_title")}>
            <p>{t("privacy.collect_text")}</p>
          </Section>

          <Section icon={<Scale className="h-4 w-4" />} title={t("privacy.basis_title")}>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" />
                <span>{t("privacy.basis_order")}</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" />
                <span>{t("privacy.basis_analytics")}</span>
              </li>
            </ul>
          </Section>

          <Section icon={<BarChart3 className="h-4 w-4" />} title={t("privacy.analytics_title")}>
            <p>{t("privacy.analytics_text")}</p>
          </Section>

          <Section icon={<Clock className="h-4 w-4" />} title={t("privacy.retention_title")}>
            <p>{t("privacy.retention_text")}</p>
          </Section>

          <Section icon={<ShieldCheck className="h-4 w-4" />} title={t("privacy.rights_title")}>
            <p>{t("privacy.rights_text", { email: CONTACT_INFO.email })}</p>
          </Section>
        </div>

        <div className="rounded-[32px] bg-[#efe6df] p-8 text-center space-y-4">
          <h3 className="text-lg font-bold text-[#1a1a1a]">{t("privacy.contact_title")}</h3>
          <p className="mx-auto max-w-md text-sm text-[#6b5f59]">{t("privacy.contact_desc")}</p>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-6 py-3 text-sm font-bold text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
          >
            <Mail className="h-4 w-4" />
            {CONTACT_INFO.email}
          </a>
        </div>
      </div>
    </main>
  );
}
